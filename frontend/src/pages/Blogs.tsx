import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { blogData } from "../blogs/blogData";
import Rating from "../blogs/Rating";
import Breadcrumbs from "../components/Breadcrumbs";
import usePageTitle from "../hooks/usePageTitle";

const Blogs = () => {
  usePageTitle("Blogs");
  return (
    <div className="blogs_page py-2">
      <Container>
        <Breadcrumbs />
        <Row>
          {blogData.map((blog) => (
            <Col lg={3} md={4} sm={6} xs={12} key={blog.id} className="mb-4">
              <Link
                to={`/blog/${blog.slug}`}
                className="text-decoration-none text-dark"
              >
                <Card className="blog-card h-100 shadow-sm border-0">
                  {/* Image */}
                  <Card.Img
                    variant="top"
                    src={blog.image}
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <Card.Body className="d-flex flex-column">
                    {/* Title */}
                    <Card.Title>{blog.title}</Card.Title>

                    {/* Meta */}
                    <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
                      <span>👤 {blog.author}</span>
                      <span>📅 {new Date(blog.date).toLocaleDateString()}</span>
                    </div>

                    {/* Rating */}
                    <Rating value={blog.rating} />

                    {/* Description */}
                    <Card.Text className="mt-2 text-muted small">
                      {blog.description.slice(0, 80)}...
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Blogs;
