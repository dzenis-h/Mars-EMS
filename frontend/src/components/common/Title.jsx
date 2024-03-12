import React from "react";

const Title = ({ active = true, text, ...rest }) => {
  return (
    <h4
      className="portlet-title"
      {...rest}
      style={{ position: "relative", cursor: "pointer" }}
    >
      {text}
      <span
        style={{
          content: "",
          display: active ? "block" : "none",
          position: "relative",
          bottom: "-22px",
          zIndex: "100",
          width: "auto",
          height: "4px",
          padding: "0",
          background: "#48c6ef",
        }}
      ></span>
    </h4>
  );
};

export default Title;
