import {
  Nav,
  Navbar,
  NavItem,
  Container,
  Row,
  Col
} from "reactstrap";

import { NavLink } from "react-router-dom";

const AppHeader = () => (
  <Navbar className="py-3" color="dark" dark expand="md">
    <Container>
      <Row>
        <Col xs={12} className="d-flex align-items-center">
          <NavLink activeclassname="active" to="/" className="nav-link link-light">Reactstrap</NavLink>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink activeclassname="active" to="/users" className="nav-link">Users</NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </Container>
  </Navbar>
);

export default AppHeader;
