import { Container } from "react-bootstrap";
import Breadcrumbs from "../components/Breadcrumbs";
import usePageTitle from "../hooks/usePageTitle";

function About() {
  usePageTitle("About Us");
  return (
    <Container className="mt-3">
      <Breadcrumbs />
      <h2>About Us</h2>
    </Container>
  );
}

export default About;