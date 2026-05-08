// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "../../types/swiper.d.ts";

// // import "swiper/css";
// // import "swiper/css/pagination";
// // import "swiper/css/navigation";

// import slider1 from "../../assets/images/slider/slider1.jpg";
// import slider2 from "../../assets/images/slider/slider2.jpg";
// import slider3 from "../../assets/images/slider/slider3.jpg";

// const HeroBanner = () => {
//   return (
//     <div className="hero-slider-wrapper">
//       <Swiper
//         modules={[Autoplay, Pagination, Navigation]}
//         slidesPerView={1}
//         loop={true}
//         autoplay={{ delay: 5000 }}
//         pagination={{ clickable: true }}
//         navigation
//         className="hero-slider"
//       >
//         <SwiperSlide>
//           <img src={slider1} alt="Slider 1" />
//         </SwiperSlide>

//         <SwiperSlide>
//           <img src={slider2} alt="Slider 2" />
//         </SwiperSlide>

//         <SwiperSlide>
//           <img src={slider3} alt="Slider 3" />
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// };

// export default HeroBanner;

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { fetchHomePageBannerSlider } from "../../services/homeBannerServices";

import { BASE_URL, UPLOAD_PATHS } from "../../config/uploadPathConfig";

interface Banner {
  id: number;
  name: string;
  image: string;
  url?: string;
  description?: string;
  status: boolean;
  is_deleted: boolean;
}

const HeroBanner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH BANNERS =================
  const fetchBannerData = async () => {
    try {
      setLoading(true);

      const response = await fetchHomePageBannerSlider();

      // ✅ API DATA
      const bannerData = response?.data?.data || [];

      // ✅ FILTER ACTIVE + NOT DELETED
      const activeBanners = bannerData.filter(
        (banner: Banner) =>
          banner.status === true && banner.is_deleted === false,
      );

      setBanners(activeBanners);
    } catch (err) {
      console.error("Error fetching Home Banner:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerData();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return null;
  }

  // ================= NO BANNERS =================
  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="hero-slider-wrapper">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        className="hero-slider"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="hero-slide">
              {banner.url ? (
                <a href={banner.url} target="_blank" rel="noreferrer">
                  <img
                    src={`${BASE_URL}/${UPLOAD_PATHS.banners}/${banner.image}`}
                    alt={banner.name}
                    className="w-100"
                    style={{
                      objectFit: "cover",
                      maxHeight: "420px",
                    }}
                    aria-label="banner_slider"
                  />
                </a>
              ) : (
                <img
                  src={`${BASE_URL}/${UPLOAD_PATHS.banners}/${banner.image}`}
                  alt={banner.name}
                  className="w-100"
                  style={{
                    objectFit: "cover",
                    maxHeight: "420px",
                  }}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
