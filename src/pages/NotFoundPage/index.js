import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import PageContentWrapper from "../../components/PageContentWrapper";

const NotFoundPage = () => (
    <PageContentWrapper>
      <Row className="pt-4">
        <Col xs={12}>
          <h3 className="text-danger">Page not found!</h3>
          <Link to="/">Go to home page</Link>
        </Col>
      </Row>
  </PageContentWrapper>
)

export default NotFoundPage;