import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { faHome, faShirt } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

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
                    title="Áo"
                    to={config.routes.shirt}
                    icon={<FontAwesomeIcon icon={faShirt} />}
                />
                <MenuItem
                    title="Quần"
                    to={config.routes.pant}
                    iconImg={images.pant}
                    iconImgActive={images.pantActive}
                />
            </Menu>
        </div>
    );
}

export default Sidebar;
