import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Styles from './ListProduct.module.scss';

const cx = classNames.bind(Styles);

function ListProduct({ children }) {
    return <div className={cx('list-product')}>{children}</div>;
}

ListProduct.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ListProduct;
