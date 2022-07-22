import axios from "axios";
import { BASE_URL } from "../../consts";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContentWrapper from "../../components/PageContentWrapper";
import LoadingSpinner from "../../components/LoadingSpinner";

const UsersPage = () => {
  const [usersData, setUsersData] = useState(null);
  const [usersError, setusersError] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/users`)
      .then((res) => {
        console.log(res);
        setUsersData(res.data);
        setusersError("");
      })
      .catch(() => {
        setusersError("Failed to load the list of the users :(");
        setUsersData(null);
      });
  }, []);

  return (
    <PageContentWrapper>
      <Row className="pt-4">
        <Col xs={12}>
          <h4 className="text-primary">Users</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ListGroup>
            {usersData?.map((user, index) => (
              <ListGroupItem key={user.id}>
                <Link className="link-success" to={`/users/${user.id}/posts`}>
                  {index + 1}. {user.name} ({user.username})
                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>
          {Boolean(usersError) && <p className="text-danger">{usersError}</p>}
        </Col>
      </Row>
      {!Boolean(usersData) && !Boolean(usersError) && <LoadingSpinner />}
    </PageContentWrapper>
  );
};

export default UsersPage;
