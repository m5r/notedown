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

const StartingPageContent = styled.div`
  text-align: center;
  width: 100%;
  
  &:last-child {
    align-self: center;
  }
`;

const List = styled.ul`
	font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.5rem;
    list-style: none;
	padding: 0;
	margin-bottom: 0;
	
	color: #202124;
    padding: 0 16px 16px;
    outline: none;
`;

const ListItem = styled.li`
    display: flex;
	align-items: center;
`;

const ListItemContent = styled.span`
	display: flex;
    width: 100%;
	height: 100%;
	margin-left: 8px;
    align-items: center;
`;

const S = {
	StartingPageContainer,
	StartingPageContent,
	List,
	ListItem,
	ListItemContent,
};

export default S;
