import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faCartShopping,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import Search from '../Search';
import styles from './Header.module.scss';

const cx = className.bind(styles);

function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('logo')}>Bin Store</div>

            <Search />

            <div className={cx('tools')}>
                <FontAwesomeIcon className={cx('tool-icon')} icon={faBell} />
                <FontAwesomeIcon className={cx('tool-icon')} icon={faUser} />
                <FontAwesomeIcon
                    className={cx('tool-icon')}
                    icon={faCartShopping}
                />
            </div>
        </header>
    );
}

export default Header;
