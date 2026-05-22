import { Container, Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const categories = [
  {
    id: 1,
    name: "Wild Honey",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    name: "Organic Honey",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    name: "Forest Honey",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 4,
    name: "Raw Honey",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 5,
    name: "Herbal Honey",
    image: "https://via.placeholder.com/200"
  }
];

function CategorySlider() {
  return (
    <Container className="mt-5">

      <h3 className="mb-4">Shop by Category</h3>

      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 }
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

export default CategorySlider;