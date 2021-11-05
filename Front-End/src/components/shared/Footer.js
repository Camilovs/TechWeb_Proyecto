import React from 'react'
import styled from 'styled-components';

const FooterBox = styled.div`
  /* position: absolute;
  bottom: 0; */
  height: 60px;
  width: 100wh;
`;

export const Footer = () => {
  return (
      <FooterBox
        // className="bg-dark text-white-50 py-4 position-fixed bottom-0 w-100"
        className="navbar navbar-fixed-bottom text-white-50 bg-dark py-2 "
      >
      <div className="container-fluid">
        <span className="navbar-text text-center">Copyright Tecnologías Web &copy; Me Anoto</span>
      </div>
    </FooterBox>
  )
}
