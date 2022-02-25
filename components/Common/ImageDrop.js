import React from "react";
import { Form, Segment, Header, Icon, Image } from "semantic-ui-react";

export default function ImageDrop({
  media,
  setMedia,
  mediaPreview,
  setMediaPreview,
  highlighted,
  setHighleghted,
  inputRef,
  handleChange,
}) {
  return (
    <>
      <Form.Field>
        <Segment placeholder basic secondary>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/"
            onChange={handleChange}
            name="media"
            ref={inputRef}
          />
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setHighleghted(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setHighleghted(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setHighleghted(true);
              console.log(e.dataTransfer.files);
              const dropFile = Array.from(e.dataTransfer.files);
              setMedia(dropFile[0]);
              setMediaPreview(URL.createObjectURL(dropFile[0]));
            }}
          >
            {mediaPreview === null ? (
              <>
                <Segment color={highlighted ? "green" : ""} placeholder basic>
                  <Header icon>
                    <Icon
                      name="file image outline"
                      style={{ cursor: "pointer" }}
                      onClick={() => inputRef.current.click()}
                    />
                    Drag m Drop or Click to Upload Image
                  </Header>
                </Segment>
              </>
            ) : (
              <>
                <Segment color="green" placeholder basic>
                  <Image
                    src={mediaPreview}
                    size="medium"
                    centered
                    style={{ cursor: "pointer" }}
                    onClick={() => inputRef.current.click()}
                  />
                </Segment>
              </>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
}
