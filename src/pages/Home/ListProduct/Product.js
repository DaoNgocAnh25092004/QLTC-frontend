import classNames from 'classnames/bind';

import Styles from './ListProduct.module.scss';
import Image from '~/assets/images';

const cx = classNames.bind(Styles);

function Product({ children }) {
    return (
        <div className={cx('product')}>
            <div className={cx('percent-discount')}>98%</div>
            <div className={cx('product-image')}>
                <img src={Image.product1} alt="Product" />
            </div>
            <div className={cx('product-content')}>
                <p className={cx('product-title')}>
                    Black Myth: Wukong - Thuê game (1 ngày)
                </p>
                <div className={cx('box-price')}>
                    <p className={cx('product-price')}>25.000đ</p>
                    <p className={cx('product-sell')}>1.299.000đ</p>
                </div>
            </div>
        </div>
    );
}

export default Product;
