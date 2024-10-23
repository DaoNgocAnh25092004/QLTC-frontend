import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classNames from 'classnames/bind';

import images from '~/assets/images';
import Styles from './SimpleSlider.module.scss';
import SliderWrapper from './SliderWrapper';

const cx = classNames.bind(Styles);

function NextArrow({ className, style, onClick }) {
    return (
        <div
            className={`${className} ${cx('next-arrow')}`}
            style={{ ...style, display: 'block', background: 'white' }}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faArrowRight} />
        </div>
    );
}

function PrevArrow({ className, style, onClick }) {
    return (
        <div
            className={`${className} ${cx('prev-arrow')}`}
            style={{ ...style, display: 'block', background: 'white' }}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faArrowLeft} />
        </div>
    );
}

function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        adaptiveHeight: true,
        appendDots: (dots) => <ul>{dots}</ul>,
        customPaging: (i) => (
            <div className="ft-slick__dots--custom">
                <div className="loading" />
            </div>
        ),
    };

    return (
        <div className={cx('slider-container')}>
            <SliderWrapper>
                <Slider {...settings}>
                    <div className={cx('slide')}>
                        <img src={images.slider1} alt="Slide 1" />
                    </div>
                    <div className={cx('slide')}>
                        <img src={images.slider2} alt="Slide 2" />
                    </div>
                    <div className={cx('slide')}>
                        <img src={images.slider3} alt="Slide 3" />
                    </div>
                    <div className={cx('slide')}>
                        <img src={images.slider4} alt="Slide 4" />
                    </div>
                    <div className={cx('slide')}>
                        <img src={images.slider5} alt="Slide 5" />
                    </div>
                </Slider>
            </SliderWrapper>
        </div>
    );
}

export default SimpleSlider;
