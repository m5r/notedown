import styled from 'styled-components';

const BottomFade = styled.div`
	background-image: linear-gradient(transparent 0%, white 100%);
    position: fixed;
    bottom: 50px;
    width: 100%;
    height: 50px;
    pointer-events: none;
`;

export default BottomFade;
