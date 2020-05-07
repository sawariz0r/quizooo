import Styled from "styled-components";

export const Text = Styled.p`
  font-size: 1.6rem;
  max-width: 85vw;
  
  ${props => props.noMargin === true && `
    margin: 0.5rem 0;
  `};

  ${props => props.marginBottom === true && `
    margin: 0 0 2rem 0;
  `};

  ${props => props.infoText === true && `
    font-size: 1.2rem;
    font-weight: 400;
    margin: 0 0 1rem 0;
    padding: 5px;
  `};

${props => props.title === true && `  
    margin: 10px 0;
    font-family: Barlow;
    font-style: normal;
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 22px;
    color: #F3F3F3;
    text-shadow: 1px 3px 1px rgba(243, 243, 243, 0.3);
    ${props.size && `
    font-size: ${props.size};;
    `}
  `};

${props => props.centered === true && `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
  `};
`;

export const CenterText = Styled(Text)`

font-family: Barlow;
font-style: normal;
font-weight: bold;
font-size: 24px;
line-height: 29px;
/* identical to box height */

text-align: center;

color: #F3F3F3;

/* Small White drop */

text-shadow: 1px 2px 1px rgba(243, 243, 243, 0.3);
`;