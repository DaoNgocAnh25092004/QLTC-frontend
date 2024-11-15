import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';

import styles from './login.module.scss';
import Button from '~/components/Button';
import { Facebook, Google } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faPhone, faSignature } from '@fortawesome/free-solid-svg-icons';

import * as AccountService from '~/Services/AccountService';
import { useLoginMutation, useSignUpMutation } from '~/hooks/userMutationHook';
import Spinner from '~/components/Spinner';
import { ToastContext } from '~/components/ToastMessage';
import { updateAccount } from '~/redux/slides/accountSlide';
import * as PlayerService from '~/Services/PlayerService';

const cx = classNames.bind(styles);

function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        username: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateForm = () => {
        const newErrors = {};

        if (!formValues.email) {
            newErrors.email = 'Email không được để trống.';
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            newErrors.email = 'Email không hợp lệ.';
        }

        if (!formValues.password) {
            newErrors.password = 'Mật khẩu không được để trống.';
        } else if (formValues.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
        }

        if (isSignup && !formValues.username) {
            newErrors.username = 'Tên đăng nhập không được để trống.';
        }

        if (isSignup && !formValues.phone) {
            newErrors.phone = 'Số điện thoại không được để trống.';
        } else if (isSignup && !/^[0-9]{10,11}$/.test(formValues.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignupClick = () => {
        setIsAnimating(true);
        setIsSignup((prev) => !prev);

        setTimeout(() => {
            setShowContent((prev) => !prev);
            setFormValues({
                email: '',
                password: '',
                username: '',
                phone: '',
            });
            setErrors({});
            setSubmitted(false);
        }, 450);
    };

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        // Reset error for the field being edited
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const mutationLogin = useLoginMutation((data) => AccountService.loginAccount(data));
    const mutationSignup = useSignUpMutation((data) => AccountService.signAccount(data));

    const handleGetDetailAccount = async (id, access_token) => {
        const detailUser = await AccountService.getDetailAccount(id, access_token);
        const detailPlayer = await PlayerService.getDetailPlayer(detailUser.userId, access_token);

        // Gộp dữ liệu từ cả hai
        const combinedDetails = {
            fullName: detailPlayer.fullName,
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

    const handleSubmit = () => {
        setSubmitted(true);

        if (validateForm()) {
            let loadingTimeout;

            loadingTimeout = setTimeout(() => {
                setIsLoading(true);
            }, 1000);

            const clearLoadingTimeout = () => {
                clearTimeout(loadingTimeout);
                setIsLoading(false);
            };

            if (isSignup) {
                mutationSignup.mutate(
                    {
                        email: formValues.email,
                        password: formValues.password,
                        username: formValues.username,
                        phone: formValues.phone,
                    },
                    {
                        onSettled: clearLoadingTimeout,
                        onSuccess: () => {
                            toast.success('Đăng ký thành công!');
                            setIsSignup((prev) => !prev);
                            setTimeout(() => {
                                setShowContent((prev) => !prev);
                                setFormValues({
                                    email: '',
                                    password: '',
                                    username: '',
                                    phone: '',
                                });
                                setErrors({});
                            }, 450);
                        },
                        onError: (error) => {
                            if (error.response && error.response.status === 400 && error.response.data.error === 'Username already in use') {
                                toast.error('Tên đăng nhập đã tồn tại!');
                            } else if (
                                error.response &&
                                error.response.status === 400 &&
                                error.response.data.error === 'Email already in use'
                            ) {
                                toast.error('Email đã tồn tại!');
                            } else {
                                toast.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
                            }
                        },
                    },
                );
            } else {
                mutationLogin.mutate(
                    {
                        email: formValues.email,
                        password: formValues.password,
                    },
                    {
                        onSettled: clearLoadingTimeout,
                        onSuccess: (data) => {
                            navigate('/');

                            localStorage.setItem('access_token', JSON.stringify(data?.accessToken));

                            if (data?.accessToken) {
                                const decoded = jwtDecode(data?.accessToken);

                                handleGetDetailAccount(decoded.id, data?.accessToken);
                            }
                        },
                        onError: (error) => {
                            if (
                                error.response &&
                                error.response.status === 400 &&
                                error.response.data.error === 'Invalid email or password'
                            ) {
                                toast.error('Email hoặc mật khẩu không hợp lệ!');
                            } else {
                                toast.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
                            }
                        },
                    },
                );
            }
        }
    };

    return (
        <div className={cx('container')}>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div
                        className={cx('box-content', {
                            'animation-left-to-right-login': isAnimating && isSignup,
                            'animation-right-to-left-signup': isAnimating && !isSignup,
                        })}
                    >
                        <h1 className={cx('title')}>Xin chào bạn!</h1>
                        <p className={cx('detail')}>
                            Hãy khám phá ngay những mẫu mới nhất, độc đáo và những ưu đãi hấp dẫn đang chờ đón bạn.
                        </p>
                        <Button outline large className={cx('btn-signup')} onClick={handleSignupClick}>
                            {isSignup ? 'Đăng nhập' : 'Đăng ký'}
                        </Button>
                    </div>
                    <div
                        className={cx('box-form', {
                            'animation-right-to-left-login': isAnimating && isSignup,
                            'animation-left-to-right-signup': isAnimating && !isSignup,
                        })}
                    >
                        {!showContent ? (
                            <>
                                <div className={cx('box-input', 'input-email')}>
                                    <input
                                        className={cx('input', {
                                            'input-error': submitted && errors.email,
                                        })}
                                        placeholder="Nhập email của bạn"
                                        name="email"
                                        value={formValues.email}
                                        onChange={handleChange}
                                    />
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    {errors.email && <p className={cx('error')}>{errors.email}</p>}
                                </div>
                                <div className={cx('box-input', 'input-password')}>
                                    <input
                                        className={cx('input', {
                                            'input-error': submitted && errors.password,
                                        })}
                                        placeholder="Nhập mật khẩu của bạn"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formValues.password}
                                        onChange={handleChange}
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
                                        onClick={handleShowPassword}
                                        className={cx('password-icon')}
                                    />
                                    {errors.password && <p className={cx('error')}>{errors.password}</p>}
                                </div>
                                <div className={cx('box-remember')}>
                                    <div>
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">Nhớ tài khoản</label>
                                    </div>
                                    <Link to="">Quên mật khẩu?</Link>
                                </div>
                                <Button primary className={cx('form-btn-login')} onClick={handleSubmit}>
                                    Đăng nhập
                                </Button>
                                <div className={cx('box-form-title')}>Đăng nhập bằng tài khoản xã hội</div>
                                <div className={cx('social')}>
                                    <div>
                                        <Google />
                                        <p>Google</p>
                                    </div>
                                    <div>
                                        <Facebook className={cx('icon-facebook')} />
                                        <p>Facebook</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={cx('box-input', 'input-name')}>
                                    <input
                                        className={cx('input', {
                                            'input-error': submitted && errors.username,
                                        })}
                                        placeholder="Nhập username của bạn"
                                        name="username"
                                        value={formValues.username}
                                        onChange={handleChange}
                                    />
                                    <FontAwesomeIcon icon={faSignature} />
                                    {errors.username && <p className={cx('error')}>{errors.username}</p>}
                                </div>
                                <div className={cx('box-input', 'input-email')}>
                                    <input
                                        className={cx('input', {
                                            'input-error': submitted && errors.email,
                                        })}
                                        placeholder="Nhập email của bạn"
                                        name="email"
                                        value={formValues.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                    />
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    {errors.email && <p className={cx('error')}>{errors.email}</p>}
                                </div>
                                <div className={cx('box-input', 'input-password')}>
                                    <input
                                        className={cx('input', {
                                            'input-error': submitted && errors.password,
                                        })}
                                        placeholder="Nhập mật khẩu của bạn"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formValues.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
                                        onClick={handleShowPassword}
                                        className={cx('password-icon')}
                                    />
                                    {errors.password && <p className={cx('error')}>{errors.password}</p>}
                                </div>
                                <div className={cx('box-input', 'input-phone')}>
                                    <input
                                        className={cx('input', {
                                            'input-error': submitted && errors.phone,
                                        })}
                                        placeholder="Nhập số điện thoại của bạn"
                                        name="phone"
                                        value={formValues.phone}
                                        onChange={handleChange}
                                    />
                                    <FontAwesomeIcon icon={faPhone} />
                                    {errors.phone && <p className={cx('error')}>{errors.phone}</p>}
                                </div>
                                <Button primary className={cx('form-btn-signup')} onClick={handleSubmit}>
                                    Đăng ký
                                </Button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Login;
