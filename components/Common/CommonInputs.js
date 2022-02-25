import React from "react";
import {
  Form,
  Button,
  Message,
  Segment,
  TextArea,
  Divider,
} from "semantic-ui-react";

export default function CommonInput({
  user: { bio, facebook, instagram, twitter, youtube },
  handleChange,
  showSocialLink,
  setShowSocialLinks,
}) {
  return (
    <>
      <Form.Field
        required
        control={TextArea}
        name="bio"
        value={bio}
        onChange={handleChange}
        placeholder="bio"
      ></Form.Field>
      <Button
        content="Add Social Link"
        color="red"
        icon="at"
        type="button"
        onClick={() => {
          setShowSocialLinks(!showSocialLink);
        }}
      />

      {showSocialLink && (
        <>
          {" "}
          <Divider />
          <Form.Input
            icon={"facebook f"}
            iconPosition="left"
            name="facebook"
            value={facebook}
            onChange={handleChange}
          />
          <Form.Input
            icon={"twitter"}
            iconPosition="left"
            name="twitter"
            value={twitter}
            onChange={handleChange}
          />
          <Form.Input
            icon={"instagram"}
            iconPosition="left"
            name="instagram"
            value={instagram}
            onChange={handleChange}
          />
          <Form.Input
            icon={"youtube"}
            iconPosition="left"
            name="youtube"
            value={youtube}
            onChange={handleChange}
          />
          <Message
            icon={"attention"}
            info
            size="small"
            header="Social media optional"
          />
        </>
      )}
    </>
  );
}
