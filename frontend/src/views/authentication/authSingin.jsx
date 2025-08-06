import React, { Component } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import logoDark from "../../assets/images/logo-dark.png";
import authBg from "../../assets/images/auth-bg.jpg";

const AuthSignin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const history = useHistory();

  const users = [
    { username: 'admin', password: '1' },
    { username: 'b1', password: '1' },
    { username: 'b2', password: '1' },
    { username: 'b3', password: '1' },
    { username: 'b4', password: '1' },
    { username: 'b5', password: '1' },
    { username: 'b6', password: '1' },
    { username: 'b7', password: '1' },
    { username: 'b8', password: '1' },
    { username: 'b9', password: '1' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(u => u.username === email && u.password === password);
    console.log(user);      
    if (user) {
      setError('');
      history.push('/indepthpage');
    } else {
      setError('Wrong username or password');
    }
  };

  return (
    <div className="auth-wrapper" style={{ background: "#eff3f6" }}>
      <div className="auth-content container">
        <Card>
          <Form onSubmit={handleLogin}>
            <Row className="align-items-center">
              <Col md={6}>
                <CardBody>
                  <img src={logoDark} alt="" className="img-fluid mb-4" />
                  <h4 className="mb-3 f-w-400">Login into your account</h4>
                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">
                        <i className="feather icon-mail" />
                      </span>
                    </InputGroupAddon>
                    <Input
                      type="text" 
                      name="email"
                      placeholder="Username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">
                        <i className="feather icon-lock" />
                      </span>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <Button color="primary" type="submit" className="mb-4">
                    Login
                  </Button>
                  <p className="mb-2 text-muted">
                    Forgot password?
                    <Link to="/maint/reset" className="f-w-400">
                      Reset
                    </Link>
                  </p>
                  <p className="mb-0 text-muted">
                    Don’t have an account?
                    <Link to="/maint/signup" className="f-w-400">
                      Signup
                    </Link>
                  </p>
                </CardBody>
              </Col>
              <Col md={6}>
                <img src={authBg} alt="" className="img-fluid" />
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AuthSignin;