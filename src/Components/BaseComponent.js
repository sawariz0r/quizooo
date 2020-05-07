import React from 'react';
import Styled from "styled-components";
import Notifications from './Notifications';
import { Label } from './Inputs';
import { Text } from './Text';

const C = Styled.div`
  font-family: Barlow;
  
  background: #7474BF;  /* fallback for old browsers */
  background: linear-gradient(32.57deg, #2A6994 5.61%, #4A3791 84.21%);
  position: relative;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  overflow-x: hidden;
  box-sizing: border-box;

  @media screen and (min-width: 641px) {
    padding: 0 30%;
  }
`;

const Title = Styled.h1`
  max-width: 90vw;
  margin-top: 10px;
  font-family: Barlow;
  font-style: normal;
  font-weight: bold;
  line-height: 58px;
  text-align: center;
  color: #F3F3F3;
  text-shadow: 1px 3px 1px rgba(243, 243, 243, 0.3);
  ${props => !props.mainTitle && `
  margin-bottom: 10px;
  `}
  font-size: ${props => props.mainTitle === true ? "3.5rem" : "3rem"};;
  letter-spacing: ${props => props.mainTitle === true ? "0.1em" : "3px"};;
`;

const Content = Styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 1;
`;

const Footer = Styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  opacity: 0.7;
  padding: 1rem 2rem 1rem 2rem;
  font-size: 1rem;
`;

const BG = Styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  user-select: none;
`;

const DesktopBlock = Styled.div`
  @media screen and (min-width: 900px) {
    position: fixed;
    width: 100vw;
    height: 200%;
    z-index: 10000;
    background: #f3f3f3;
    background: linear-gradient(32.57deg, #2A6994 5.61%, #4A3791 84.21%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  @media screen and (max-width: 899px) {
    display: none;
  }
`;

const Component = ({ children, title }) => {
  return (
    <C>
      <DesktopBlock><Title>quiz.ooo</Title><Text style={{ maxWidth: "50%", textAlign: "center"}}>This website is made for Mobile only, for now. <br />Please visit on a mobile device. :)</Text></DesktopBlock>
      <BG width="995" height="705" viewBox="0 0 995 705" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
          <circle opacity="0.1" cx="497.832" cy="28.8322" r="54" stroke="#F3F3F3" stroke-width="30" />
          <circle opacity="0.1" cx="497.832" cy="28.8322" r="114" stroke="#F3F3F3" stroke-width="30" />
          <circle opacity="0.1" cx="497.832" cy="28.8322" r="187" stroke="#F3F3F3" stroke-width="30" />
          <circle opacity="0.1" cx="497.832" cy="28.8321" r="282" stroke="#F3F3F3" stroke-width="30" />
          <circle opacity="0.1" cx="497.832" cy="28.8321" r="376" stroke="#F3F3F3" stroke-width="30" />
          <circle opacity="0.1" cx="497.832" cy="28.8322" r="498.322" transform="rotate(-0.0405845 497.832 28.8322)" stroke="#F3F3F3" stroke-width="30" />
          <circle opacity="0.1" cx="497.832" cy="28.8322" r="660.375" transform="rotate(-0.0405845 497.832 28.8322)" stroke="#F3F3F3" stroke-width="30" />
        </g>
      </BG>


      <Title mainTitle={title === "quizooo"}>{title}</Title>
      <Content>{children}</Content>
      <Footer><a href="https://osuka.dev" style={{ textDecoration: "none" }}>This Quiz app is made by Osuka.dev</a></Footer>
      <Notifications />
    </C>
  );
}

export default Component;
