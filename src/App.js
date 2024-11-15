import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';

import { publicRoutes } from '~/routes';
import DefaultLayout from '~/Layouts';
import ToastMessage from '~/components/ToastMessage';
import { isJsonString } from './utils';
import { updateAccount } from '~/redux/slides/accountSlide';
import * as UserService from '~/Services/AccountService';
import * as PlayerService from '~/Services/PlayerService';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleGetDetailAccount = async (id, token) => {
            const detailUser = await UserService.getDetailAccount(id, token);
            const detailPlayer = await PlayerService.getDetailPlayer(detailUser.userId, token);

            // Gộp dữ liệu từ cả hai
            const combinedDetails = {
                fullName: detailUser.fullName,
                username: detailUser.username,
                email: detailUser.email,
                phone: detailUser.phone,
                avatar: detailPlayer.avatar,
                address: detailPlayer.address,
                dayOfBirth: detailPlayer.dob,
                gender: detailPlayer.gender,
                userId: detailUser.userId,
            };

            // Gửi dữ liệu đã gộp vào redux
            dispatch(updateAccount(combinedDetails));
        };

        let { storageData, decoded } = handleDecode();

        if (decoded?.id) {
            handleGetDetailAccount(decoded.id, storageData);
        }
    }, [dispatch]);

    const handleDecode = () => {
        let storageData = localStorage.getItem('access_token');
        let decoded = {};
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            decoded = jwtDecode(storageData);
        }

        return { storageData, decoded };
    };

    UserService.axiosJWT.interceptors.request.use(
        async (config) => {
            let currentTime = new Date();
            let { decoded } = handleDecode();
            if (decoded?.exp && decoded.exp * 1000 < currentTime.getTime()) {
                let data = await UserService.refreshToken();

                config.headers.authorization = data.accessToken;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    return (
        <ToastMessage>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </ToastMessage>
    );
}

export default App;
