import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Button,
  Message,
  Segment,
  TextArea,
  Divider,
} from "semantic-ui-react";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/Common/WelcomeMessage";
import CommonInput from "../components/Common/CommonInputs";
import ImageDrop from "../components/Common/ImageDrop";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { registerUser } from "../api/api/auth";
import uplaodPic from "../api/api/uploadPicToCloudinary";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    facebook: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const { name, email, password, bio } = user;
  const [showSocialLink, setShowSocialLinks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormloading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernmaeAvailable] = useState(false);
  const [username, setUsername] = useState("");
  const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighleghted] = useState(false);
  const inputRef = useRef();
  let cancel;
  const handleSubmit = async (e) => {
    e.preventDefault();
    let profilePicUrl;
    // profilePicUrl = await uplaodPic();

    // if (media !== null && !profilePicUrl) {
    //   setFormloading(false);
    //   return setErrorMsg("Error Uploading Image");
    // }
    user.username = username;
    await registerUser(user, profilePicUrl, setErrorMsg, setFormloading);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    if (name == "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }
    setUser((values) => ({
      ...values,
      [name]: value,
    }));
  };

  useEffect(() => {
    const isUser = Object.values({ name, email, password, bio }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const checkUsername = async () => {
    setUsernameLoading(true);
    try {
      // cancel && cancel();
      // const CancelToken = axios.CancelToken();

      // cancelToken: new CancelToken((canceler) => (cancel = canceler)),

      const res = await axios.get(`${baseUrl}/api/${username}`);
      console.log(res);
      if (res.data === "Available") {
        setUsernmaeAvailable(true);
        setUser((prev) => ({ ...prev, username }));
      }
    } catch (err) {
      setErrorMsg("Username Not Available");
    }

    setUsernameLoading(false);
  };
  useEffect(() => {
    username === "" ? setUsernmaeAvailable(false) : checkUsername();
  }, [username]);
  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismis={() => setErrorMsg(null)}
        />
        <Segment>
          <ImageDrop
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
            inputRef={inputRef}
            highlighted={highlighted}
            setHighleghted={setHighleghted}
            handleChange={handleChange}
          />
          <Form.Input
            required
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            fluid
            icon={"user"}
            iconPosition="left"
          />
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
          <Form.Input
            required
            loading={usernameLoading}
            error={!usernameAvailable}
            label="Username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              console.log(e.target.value);
              if (regexUserName.test(e.target.value)) {
                setUsernmaeAvailable(true);
                setErrorMsg(false)
              } else {
                setUsernmaeAvailable(false);
              }
            }}
            fluid
            icon={usernameAvailable ? "check" : "close"}
            iconPosition="left"
          />
          <CommonInput
            user={user}
            showSocialLink={showSocialLink}
            setShowSocialLinks={setShowSocialLinks}
            handleChange={handleChange}
          />
          <Divider hidden />
          <Button
            content="signup"
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
