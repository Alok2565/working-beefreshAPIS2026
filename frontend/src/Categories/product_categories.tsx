import { Container, Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import lychi from "../assets/images/category/Lychee-Honey.jpg";
import Eucalyputs from "../assets/images/category/Eucalyputs-honey.jpg";
import Mustard from "../assets/images/category/Mustard-Honey.jpg";
import Sahjan from "../assets/images/category/Sahjan-Honey.jpg";
import cranch from "../assets/images/category/cranch-honey.jpg";
import forest from "../assets/images/category/forest-Honey.jpg";
import jamun from "../assets/images/category/jamun-Honey.jpg";
import sunflower from "../assets/images/category/sunflower-honey.jpg";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const categories = [
  { id: 1, name: "Lychee", image: lychi },
  { id: 2, name: "Eucalyputs", image: Eucalyputs },
  { id: 3, name: "Mustard", image: Mustard },
  { id: 4, name: "Sahjan", image: Sahjan},
  { id: 5, name: "cranch", image: cranch },
  { id: 6, name: "forest", image: forest},
  { id: 7, name: "jamun", image: jamun},
  { id: 8, name: "sunflower", image: sunflower}
];

export default function ProductCategories() {
  return (
    <Container fluid className="mt-5">
      <h3 className="mb-4">Shop by Category</h3>

      <Swiper
        className="mySwiper"
        modules={[Navigation, Pagination, Autoplay]}   // ✅ ADD THIS
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 6 }
        }}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <Card className="text-center p-3 shadow-sm">
              <img
                src={cat.image}
                alt={cat.name}
                className="img-fluid mb-2"
              />
              <h6>{cat.name}</h6>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}