import classNames from 'classnames';

import Header from '~/Layouts/Components/Header';
import Sidebar from '~/Layouts/Components/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <div className={cx('container--box', 'width-pc')}>
                    <Sidebar />
                    <div>{children}</div>
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;