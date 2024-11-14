import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { faBook, faHome, faStore } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('sidebar')}>
            <Menu>
                <MenuItem
                    title="Trang chủ"
                    to={config.routes.home}
                    icon={<FontAwesomeIcon icon={faHome} />}
                />
                <MenuItem
                    title="Của hàng"
                    to={config.routes.store}
                    icon={<FontAwesomeIcon icon={faStore} />}
                />
                <MenuItem
                    title="Thư viện"
                    to={config.routes.library}
                    icon={<FontAwesomeIcon icon={faBook} />}
                />
            </Menu>
        </div>
    );
}

export default Sidebar;
