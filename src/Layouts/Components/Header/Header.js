import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faIdCard,
    faPenToSquare,
    faSignOut,
    faUser,
    faUserPlus,
    faUserSlash,
    faUserXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';

import Search from '../Search';
import styles from './Header.module.scss';
import config from '~/config';
import Image from '~/components/Image';
import images from '~/assets/images';
import { MenuHeader } from '~/components/Popper';
import * as AccountService from '~/Services/AccountService';
import { resetAccount } from '~/redux/slides/accountSlide';
import { ToastContext } from '~/components/ToastMessage';

const cx = className.bind(styles);

// Mảng lưu các chức năng của header
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faIdCard} />,
        title: 'Trang cá nhân',
        to: '/profile',
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Tài khoản',
        children: {
            title: 'Quản lý tài khoản',
            data: [
                {
                    title: 'Tạo tài khoản',
                    icon: <FontAwesomeIcon icon={faUserPlus} />,
                },
                {
                    title: 'Chỉnh sửa tài khoản',
                    icon: <FontAwesomeIcon icon={faPenToSquare} />,
                    to: '/admin/account/edit',
                },
                {
                    title: 'Xóa tài khoản',
                    icon: <FontAwesomeIcon icon={faUserXmark} />,
                    to: '/admin/account/delete',
                },
                {
                    title: 'Tài khoản đã xóa',
                    icon: <FontAwesomeIcon icon={faUserSlash} />,
                    to: '/admin/account/soft-deleted',
                },
            ],
        },
        separate: true,
    },
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
        separate: true,
    },
];

function Header() {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    const currentAccount = account.isLoggedIn;

    const handleMenuChange = (menuItem) => {
        // Xử lý khi logout
        if (menuItem.title === 'Đăng xuất') {
            navigate('/');
            handleLogout();

            return;
        }
    };

    const handleLogout = async () => {
        // Gửi yêu cầu logout
        await AccountService.logout();

        // Xóa access_token trong localStorage
        localStorage.removeItem('access_token');

        // Reset account trong redux
        dispatch(resetAccount());

        // Hiển thị thông báo
        toast.success('Đăng xuất thành công!');
    };

    return (
        <header className={cx('header')}>
            <Link to={config.routes.home}>
                <div className={cx('logo')}>Bin Store</div>
            </Link>

            <Search />

            <div className={cx('tools')}>
                <FontAwesomeIcon className={cx('tool-icon')} icon={faBell} />
                {currentAccount ? (
                    <MenuHeader items={MENU_ITEMS} onClickHandle={handleMenuChange}>
                        <Image src={account.avatar || images.avatar} alt="Đào Ngọc Anh" className={cx('avata-user')} />
                    </MenuHeader>
                ) : (
                    <Link to={config.routes.login}>
                        <FontAwesomeIcon className={cx('tool-icon')} icon={faUser} />
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
