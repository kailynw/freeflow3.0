import React, { useState } from "react";
// import { Button, ButtonLink } from "reactstrap";
import Tags from "./StackTag";
import { Checkbox } from '@material-ui/core';

function Editor(props) {
  const [error, setError] = useState("");
  const [value, setValue] = React.useState("");
  const [checkbox, setCheckbox] = React.useState({
    1: false,
  });

  const onChangeCheckbox = (value, name) => {
    setCheckbox({ ...checkbox, [name]: value });
  };

  const postObj = {
    text: value,
    helper: checkbox[1],
  };

  let techTags = [];
  const onChangeInput = (selectedTags) => {
    techTags = selectedTags;
  };

  const onCancel = () => {
    //check for empty input here
    //empty tags should also be checked here.
    setValue("");
  };

  function validatePost() {
    if (value === "") {
      setError("Post cannot be blank");
      return;
    }
    if (value !== ""){
      setError("");
      props.createPost(postObj, techTags, props.id).then(() => {
        setValue("");
      });          
    }
  }

  return (
    <div className="user-profile">
      {/* <Row>
        <Col className="avatar" breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <MDEditor className="editor" value={value}               
          onChange={setValue} />
        </Col>
      </Row>
      <Row> */}
        <div className="bottom">
          <div>
            <Tags
              className="tagging"
              suggested={props.suggestion}
              onChange={onChangeInput}
            />
          </div>
          <div className="right">
            <div className="checkbox">
              <Checkbox
                checked={checkbox[1]}
                className="checkbox-input"
                onChange={(value) => onChangeCheckbox(value, 1)}
              >
                Help Needed
              </Checkbox>
            </div>
            <div className="editor-buttons">
              <button
                fullWidth
                appearance="hero"
                className="green-button green button-transition"
                onClick={() => validatePost()}
              >
                Post
              </button>
              <button
                fullWidth
                appearance="hero"
                className="red-button red button-transition"
                onClick={() => onCancel()}
              >
                Cancel
              </button>
            </div>
            <div>
              <section className="validation">{error}</section>
            </div>
          </div>
        </div>
      {/* </Row> */}
    </div>
  );
}

export default Editor;
