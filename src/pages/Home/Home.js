import classNames from 'classnames/bind';
import SimpleSlider from './SimpleSlider';

import Styles from './Home.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(Styles);

function Home() {
    return (
        <>
            {/* Slider */}
            <SimpleSlider />

            {/* Slogon */}
            <div className={cx('slogon')}>
                <h1 className={cx('slogon-title')}>Khám Phá Thế Giới Mới!</h1>
                <p className={cx('slogon-content')}>
                    Tại Bin Store, chúng tôi không chỉ bán sản phẩm, mà còn tạo
                    ra những trải nghiệm tuyệt vời dành cho thế hệ trẻ. Đó là
                    nơi mà bạn có thể thỏa sức khám phá, sáng tạo và khẳng định
                    phong cách riêng của mình. Hãy để Bin Store trở thành người
                    bạn đồng hành trong hành trình tìm kiếm niềm vui và sự tự
                    tin, mang đến cho bạn những khoảnh khắc đáng nhớ trong cuộc
                    sống!
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
        </>
    );
}

export default Home;
