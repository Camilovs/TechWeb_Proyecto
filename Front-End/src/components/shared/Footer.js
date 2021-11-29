import React from "react";
import styled from "styled-components";

const FooterBox = styled.div`
  /* position: absolute;
  bottom: 0; */
  height: 60px;
  width: 100wh;
`;

export const Footer = () => {
  return (
    <FooterBox
      style={{
        position: "unset",
        left: "0px",
        bottom: "0px",
        height: "50px",
        width: "100%",
        background: "#999",
      }}
      className="navbar navbar-fixed-bottom text-white-50 bg-dark py-2 "
    >
      <div className="container-fluid" style={{ justifyContent: "center" }}>
        <span className="navbar-text text-center">
          Copyright Tecnologías Web &copy; Me Anoto
        </span>
      </div>
    </FooterBox>
  );
};
