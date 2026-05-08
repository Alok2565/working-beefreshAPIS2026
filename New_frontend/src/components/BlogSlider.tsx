// // src/components/BlogSlider.tsx

// import type { FC } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import { blogData } from "../blogs/blogData";

// const BlogSlider: FC = () => {
//   return (
//     <div className="blog-slider-container">
//       <h2 className="text-center mb-4">Latest Blogs</h2>

//       <Swiper
//         modules={[Navigation, Pagination]}
//         spaceBetween={20}
//         slidesPerView={3}
//         navigation
//         pagination={{ clickable: true }}
//         breakpoints={{
//           0: { slidesPerView: 1 },
//           576: { slidesPerView: 1 },
//           768: { slidesPerView: 2 },
//           992: { slidesPerView: 3 },
//         }}
//       >
//         {blogData.map((blog) => (
//           <SwiperSlide key={blog.id}>
//             <div className="blog-card">
//               <img src={blog.image} alt={blog.title} />
//               <div className="blog-content">
//                 <h5>{blog.title}</h5>
//                 <p>{blog.description}</p>
//                 <button className="btn btn-warning">Read More</button>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default BlogSlider;

// src/components/BlogSlider.tsx
// src/components/BlogSlider.tsx

import { Card, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { blogData } from "../blogs/blogData";
import { useNavigate } from "react-router-dom";

const BlogSlider = () => {
  const navigate = useNavigate();
  return (
    <div className="blog-slider-container">
      <h2 className="text-start mb-4">Latest Blogs</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          576: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 5 },
        }}
      >
        {blogData.map((blog) => (
          <SwiperSlide key={blog.id}>
            <Card className="h-100 shadow-sm border-0 blog-card">
              
              <Card.Img
                variant="top"
                src={blog.image}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <Card.Body className="d-flex flex-column">
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text className="text-muted small">
                  {blog.description}
                </Card.Text>
                <Button variant="dark"
                      className="btn btn-dark mt-auto"
                      onClick={() => navigate(`/blog/${blog.slug}`)}
                    >
                      Read More
                    </Button>
              </Card.Body>

            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSlider;