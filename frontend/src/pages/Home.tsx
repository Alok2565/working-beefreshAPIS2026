import HeroBanner from "../components/banners/HeroBanner";
//import CategorySlider from "../components/CategorySlider";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import ProductCategories from "../Categories/product_categories";
import BlogSlider from "../components/BlogSlider";
import usePageTitle from "../hooks/usePageTitle";

function Home() {
  usePageTitle("Home");
  return (
    <>
      <HeroBanner />
      {/* Category Slider */}
      {/* <CategorySlider /> */}
      <ProductCategories />
      <Container fluid className="mt-4">
        <h2 className="text-start mb-4">Latest Product</h2>
        <Row>
          <Col md={2}>
            <ProductCard />
          </Col>

          <Col md={2}>
            <ProductCard />
          </Col>

          <Col md={2}>
            <ProductCard />
          </Col>

          <Col md={2}>
            <ProductCard />
          </Col>
          <Col md={2}>
            <ProductCard />
          </Col>

          <Col md={2}>
            <ProductCard />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <BlogSlider />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
