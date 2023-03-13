
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper";
// import { IoImageSharp } from "react-icons/io5";
const CustomSliderbypinkcitywala: React.FunctionComponent<{ images: any, hideController: any }> = ({ images,hideController }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                // spaceBetween={10}
                // modules={[Navigation, Autoplay, Pagination, Scrollbar]}
                modules={[Navigation, Autoplay]}
                autoplay={true}
                pagination={true}
                navigation={true}
                className="CustomSliderbypinkcitywala"
            >
                {images.map((images: any, index: number) => (
                    <SwiperSlide>
                        <img src={images?.image_big} key={`images-${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
            {hideController ?
                <></>
                :
                <Swiper
                    onSwiper={setThumbsSwiper}
                    // spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="CustomSliderSlidebypinkcitywala"
                >
                    {images.map((images: any, index: number) => (
                        <SwiperSlide>
                            <img src={images?.image_small} key={`images-${index}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
        </>
    )
}

export default CustomSliderbypinkcitywala

// -----------------------------------------------------------------------------------------------------

