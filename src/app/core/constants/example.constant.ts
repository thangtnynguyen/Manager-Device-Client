const bannerConstant = {
    places: [
        {
            value: 'Home',
            key: 'Trang chủ',
        },
    ],
    types: [
        {
            value: 'SlideShow',
            key: 'SlideShow',
        },
    ],
};

export default bannerConstant;

//Place
export const PLACE_HOME = 'Home';

//Type
export const TYPE_SLIDESHOW = 'SlideShow';

//Style
export const DEFAULT_PROPERTIES_BANNER = {
    props: {
        style: {
            '--cta-hover-color': '#6828fa',
            background: 'linear-gradient(to right, #6828fa, #ffbaa4)',
        },
    },
};
