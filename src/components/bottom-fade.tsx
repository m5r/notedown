import styled from 'styled-components';

const BottomFade = styled.div`
	background-image: linear-gradient(transparent 0%, white 100%);
    position: fixed;
    left: 0;
    bottom: 50px;
    width: 100%;
    height: 30px;
    pointer-events: none;
`;

export default BottomFade;
