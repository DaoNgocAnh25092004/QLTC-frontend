import classNames from 'classnames/bind';
import SimpleSlider from './SimpleSlider';

import Styles from './Home.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import ListProduct, { Product } from './ListProduct';

const cx = classNames.bind(Styles);

function Home() {
    return (
        <>
            {/* Slider */}
            <SimpleSlider />

            {/* Slogon */}
            <div className={cx('slogon')}>
                <h1 className={cx('slogon-title')}>
                    Khám Phá Thế Giới Game Hấp Dẫn
                </h1>
                <p className={cx('slogon-content')}>
                    Tại Bin Game Store, chúng tôi không chỉ cung cấp trò chơi,
                    mà còn mang đến một trải nghiệm tuyệt vời cho cộng đồng game
                    thủ. Đây là nơi bạn có thể tự do khám phá, thử thách bản
                    thân và tham gia vào một thế giới giải trí phong phú. Hãy để
                    Bin Game Store là người đồng hành của bạn trong hành trình
                    chinh phục các thử thách, khám phá những tựa game mới và tạo
                    nên những khoảnh khắc đáng nhớ!
                </p>
            </div>

            {/* Products */}

            <div className={cx('product-best-seller')}>
                <div className={cx('product-title')}>
                    <h2>Sản phẩm bán chạy</h2>
                    <Image
                        src={images.line}
                        alt="Đường line"
                        className={cx('line')}
                    />
                </div>
            </div>

            {/* List product */}

            <ListProduct>
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </ListProduct>
        </>
    );
}

export default Home;
