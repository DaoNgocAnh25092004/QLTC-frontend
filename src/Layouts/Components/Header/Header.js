import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faCartShopping,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Search from '../Search';
import styles from './Header.module.scss';
import config from '~/config';

const cx = className.bind(styles);

function Header() {
    return (
        <header className={cx('header')}>
            <Link to={config.routes.home}>
                <div className={cx('logo')}>Bin Store</div>
            </Link>

            <Search />

            <div className={cx('tools')}>
                <FontAwesomeIcon className={cx('tool-icon')} icon={faBell} />
                <Link to={config.routes.login}>
                    <FontAwesomeIcon
                        className={cx('tool-icon')}
                        icon={faUser}
                    />
                </Link>
                <FontAwesomeIcon
                    className={cx('tool-icon')}
                    icon={faCartShopping}
                />
            </div>
        </header>
    );
}

export default Header;
