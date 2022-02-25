import React, { useState, useRef, useEffect } from "react";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/Common/WelcomeMessage";
import {
  Form,
  Button,
  Message,
  Segment,
  TextArea,
  Divider,
} from "semantic-ui-react";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormloading] = useState(false);
 
  const [usernameAvailable, setUsernmaeAvailable] = useState(false);
 
  const [submitDisabled, setSubmitDisabled] = useState(false);
  
 
  const handleSubmit = (e) => e.preventDefault();
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

   
    setUser((values) => ({
      ...values,
      [name]: value,
    }));
  };

  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
      >
        <Segment>
        <Form.Input
            required
            label="Email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            fluid
            icon={"envelope"}
            iconPosition="left"
            type="email"
          />
          <Form.Input
            required
            label="Password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: "eye",
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition="left"
            type={showPassword ? "text" : "password"}
          />
          <Button
            content="signin"
            type="submit"
            color="orange"
            disabled={submitDisabled || !usernameAvailable}
          />
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
}
