import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
  Input
} from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import logoDark from "../assets/images/logo-dark.png";
import authBg from "../assets/images/building/this.avif";

const otpRequiredUsers = ["22a91a61a2", "22a91a61d2", "22a91a61j1", "22p31a4409", "22mh1a4220","22a91a61g8"];
const emailAddress = {
  "22a91a61a2" : "vinaykishore2512@gmail.com",
  "22a91a61d2" : "harshaakasam29@gmail.com",
  "22a91a61j1":"suryateja4999@gmail.com",
  "22p31a4409":"kushalkommireddy@gmail.com",
  "22mh1a4220":"praveenreddygoli8@gmail.com",
  "22a91a61g8":"jayakrishna1057@gmail.com",
}

const AuthSignin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp,setGeneratedOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const userData = {
      userName: username,
      password: password,
    };

    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL + "/getLoginDetails", userData);
      const user = res.data;

      if (user) {
        console.log(`Logged in as: ${user.userName}, Role: ${user.role}`);

        if (otpRequiredUsers.includes(user.userName)) {
          // Show OTP input field instead of logging in directly
          const res = await axios.post(process.env.REACT_APP_BACKEND_URL + "/sendEmail", { email : emailAddress[user.userName]});
          setGeneratedOtp(res.data.otp);
          setShowOtpField(true);
        } else {
          finalizeLogin(user);
        }
      } else {
        setError('Wrong username or password');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to login. Please try again.');
    }
  };

  const handleOtpVerification = async () => {
    try {
      
      if (generatedOtp == otp) {
        finalizeLogin({ userName: username, role: "admin" }); 
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("OTP verification failed.");
    }
  };

  const finalizeLogin = (user) => {
    localStorage.setItem('user', JSON.stringify({ username: user.userName, role: user.role }));

    if (user.userName === 'admin' || otpRequiredUsers.includes(user.userName)) {
      history.push('/indepthpage');
    } else {
      history.push(`/indepthpage/${user.buildingId}`);
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
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>

                  {showOtpField && (
                    <>
                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <span className="input-group-text">
                            <i className="feather icon-shield" />
                          </span>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </InputGroup>
                      <Button color="primary" onClick={handleOtpVerification} className="mb-4">
                        Verify OTP
                      </Button>
                    </>
                  )}

                  {!showOtpField && (
                    <Button color="primary" type="submit" className="mb-4">
                      Login
                    </Button>
                  )}

                  {error && <p style={{ color: 'red' }}>{error}</p>}
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
