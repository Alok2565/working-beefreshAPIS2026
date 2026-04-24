import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "../../types/swiper.d.ts";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import slider1 from "../../assets/images/slider/slider1.jpg";
import slider2 from "../../assets/images/slider/slider2.jpg";
import slider3 from "../../assets/images/slider/slider3.jpg";

const HeroBanner = () => {
  return (
    <div className="hero-slider-wrapper">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation
        className="hero-slider"
      >
        <SwiperSlide>
          <img src={slider1} alt="Slider 1" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={slider2} alt="Slider 2" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={slider3} alt="Slider 3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroBanner;