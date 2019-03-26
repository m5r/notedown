import styled from 'styled-components';

const StartingPageContainer = styled.div`
  background-image: url('/img/landing-background.jpg');
  background-size: cover;
  background-position: -100px 0;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: end;
`;

export default StartingPageContainer;
