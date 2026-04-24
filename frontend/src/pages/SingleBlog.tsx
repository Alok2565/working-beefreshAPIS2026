import { useParams, Link } from "react-router-dom";
import { blogData } from "../blogs/blogData";
import { Container, Row, Col, Card } from "react-bootstrap";
import RelatedPosts from "../components/RelatedPosts";
import CommentSection from "../components/CommentSection";
import { FaUser } from "react-icons/fa";
import Rating from "../blogs/Rating";
import usePageTitle from "../hooks/usePageTitle";
import BreadcrumbBlogs from "../blogs/BreadcrumbBlogs";

const SingleBlog = () => {

  // const { id } = useParams();
  // const blog = blogData.find(
  //   (item) => item.id === Number(id)
  // );
  const { slug } = useParams();

const blog = blogData.find(
  (item) => item.slug === slug
);

   usePageTitle(blog ? blog.title : "Blog Details");
  if (!blog) {
    return <h2 className="text-center mt-5">Blog Not Found</h2>;
  }

  return (
    <div className="single_post py-4">
      <Container>
        <BreadcrumbBlogs/>
        <Row>
          {/* ================= MAIN CONTENT ================= */}
          <Col md={8}>
            <Card className="border-0 shadow-sm mb-4">
              {/* Blog Image */}
              <Card.Img src={blog.image} />

              <Card.Body>
                <h2>{blog.title}</h2>
                {/* Meta Info */}
                <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">

                <div className="text-muted small">
                    <FaUser/> By <strong>{blog.author || "Admin"}</strong> | 📅 {blog.date || "N/A"}
                </div>
                <Rating value={blog.rating} />
                </div>
                    <p className="text-muted">{blog.description}</p>
                {/* HTML Content */}
                <div className="blog-content-html mt-3" dangerouslySetInnerHTML={{ __html: blog.content }}/>
              </Card.Body>
            </Card>
            {/* ================= RELATED POSTS ================= */}
            <RelatedPosts currentId={blog.id} />
            {/* ================= COMMENTS ================= */}
            <CommentSection />
          </Col>
          {/* ================= SIDEBAR ================= */}
          <Col md={4}>
            <h5 className="mb-3">Recent Posts</h5>
            {blogData
              .filter((b) => b.slug !== blog.slug) // exclude current
              .slice(0, 5) // limit
              .map((item) => (
                <Link
                  key={item.slug}
                  to={`/blog/${item.slug}`}
                  className="text-decoration-none text-dark"
                >
                  <Card className="mb-3 shadow-sm border-0 recent-card">
                    
                    <Row className="g-0 align-items-center">

                      {/* Image */}
                      <Col xs={4}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded-start"
                          style={{
                            height: "80px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </Col>

                      {/* Content */}
                      <Col xs={8}>
                        <Card.Body className="py-2">
                          <h6 className="mb-1">{item.title}</h6>
                          <p className="small text-muted mb-0">
                            {item.description.slice(0, 40)}...
                          </p>
                        </Card.Body>
                      </Col>

                    </Row>

                  </Card>
                </Link>
              ))}
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default SingleBlog;