import { Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { blogData } from "../blogs/blogData";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

const RelatedPosts = ({ currentId }: { currentId: number }) => {
  const related = blogData.filter((b) => b.id !== currentId);

  return (
    <div className="mt-5">
      <h4 className="mb-3">Related Posts</h4>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
      >
        {related.map((blog) => (
          <SwiperSlide key={blog.id}>

            {/* ✅ Full card clickable */}
            <Link
              to={`/blog/${blog.id}`}
              className="text-decoration-none text-dark"
            >
              <Card className="shadow-sm related-card border-0 h-100">

                {/* Image */}
                <Card.Img
                  src={blog.image}
                  style={{ height: "180px", objectFit: "cover" }}
                />

                {/* Title */}
                <Card.Body>
                  <h6 className="mb-0">{blog.title}</h6>
                </Card.Body>

              </Card>
            </Link>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedPosts;