import styled from '@emotion/styled';

const SliderWrapper = styled('div')`
    .slick-list {
        overflow: ${(props) => (props.overflow ? 'visible' : 'hidden')};
    }
    /* Dots */
    .slick-dotted.slick-slider {
        margin-bottom: 30px;
    }

    .slick-dots {
        position: absolute;
        bottom: -30px;

        display: block;

        width: 100%;
        padding: 0;
        margin: 0;

        list-style: none;

        text-align: center;
    }
    .slick-dots li {
        position: relative;
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 0 5px;
        padding: 0;
        cursor: pointer;
        transition: width 0.3s ease-in-out;
    }
    .slick-dots li button {
        font-size: 0;
        line-height: 0;

        display: block;

        width: 50px;
        height: 10px;
        padding: 5px;

        cursor: pointer;

        color: transparent;
        border: 0;
        outline: none;
        background: transparent;
    }
    .slick-dots li button:hover,
    .slick-dots li button:focus {
        outline: none;
    }
    .slick-dots li button:hover:before,
    .slick-dots li button:focus:before {
        opacity: 1;
    }
    .slick-dots li button:before {
        font-family: 'slick';
        font-size: 6px;
        line-height: 20px;

        position: absolute;
        top: 0;
        left: 0;

        width: 50px;
        height: 10px;

        content: '•';
        text-align: center;

        opacity: 0.25;
        color: black;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .slick-dots li.slick-active button:before {
        opacity: 0.75;
        color: black;
    }

    /* Custom Slick Dots */

    @keyframes loading {
        from {
            width: 0%;
        }

        to {
            width: 100%;
        }
    }

    .ft-slick__dots--custom {
        height: 8px;
        width: 50px;
        background-color: #e5e7e9;
        border-radius: 4px;
        position: relative;
    }

    .slick-dots li {
        width: 50px;
        margin: 0 2px;
        transition: width 0.3s ease-in-out;
    }

    .slick-dots .slick-active {
        width: 130px;
        transition: width 0.3s ease-in-out;
    }

    .slick-dots .slick-active .ft-slick__dots--custom {
        width: 130px;
        top: -2px;
        overflow: hidden;

        .loading {
            height: 8px;
            animation: loading 5s ease-in;
            background-image: linear-gradient(270deg, #292929, #161616);
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 4px;
        }
    }
`;

export default SliderWrapper;
