import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './login.module.scss';
import Button from '~/components/Button';
import { Facebook, Google } from '~/components/Icons';

const cx = classNames.bind(styles);

function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handleSignupClick = () => {
        setIsAnimating(true);
        setIsSignup((prev) => !prev);

        setTimeout(() => {
            setShowContent((prev) => !prev);
        }, 500);
    };

    return (
        <div className={cx('container')}>
            <div
                className={cx('box-content', {
                    'animation-left-to-right-login': isAnimating && isSignup,
                    'animation-right-to-left-signup': isAnimating && !isSignup,
                })}
            >
                <h1 className={cx('title')}>Xin chào bạn!</h1>
                <p className={cx('detail')}>
                    Hãy khám phá ngay những mẫu mới nhất, độc đáo và những ưu
                    đãi hấp dẫn đang chờ đón bạn.
                </p>
                <Button
                    outline
                    large
                    className={cx('btn-signup')}
                    onClick={handleSignupClick}
                >
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
                                className={cx('input')}
                                placeholder="Nhập email của bạn"
                            />
                        </div>
                        <div className={cx('box-input', 'input-password')}>
                            <input
                                className={cx('input')}
                                placeholder="Nhập mật khẩu của bạn"
                            />
                        </div>
                        <div className={cx('box-remember')}>
                            <div>
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Nhớ tài khoản</label>
                            </div>
                            <Link to="">Quên mật khẩu?</Link>
                        </div>
                        <Button primary className={cx('form-btn-login')}>
                            Đăng nhập
                        </Button>
                        <div className={cx('box-form-title')}>
                            Đăng nhập bằng tài khoản xã hội
                        </div>
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
                                className={cx('input')}
                                placeholder="Nhập họ tên của bạn"
                            />
                        </div>

                        <div className={cx('box-input', 'input-email')}>
                            <input
                                className={cx('input')}
                                placeholder="Nhập email của bạn"
                            />
                        </div>

                        <div className={cx('box-input', 'input-password')}>
                            <input
                                className={cx('input')}
                                placeholder="Nhập mật khẩu của bạn"
                            />
                        </div>

                        <div className={cx('box-input', 'input-phone')}>
                            <input
                                className={cx('input')}
                                placeholder="Nhập số điện thoại của bạn"
                            />
                        </div>

                        <Button primary className={cx('form-btn-signup')}>
                            Đăng ký
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;
