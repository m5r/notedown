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

const ListItemTitle = styled.div`
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem;
`;

const ListItemCard = styled.div`
    min-height: 110px;
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    overflow: hidden;
    position: relative;
    border-radius: 8px;
    box-sizing: border-box;
	word-break: break-word;
`;

const S = {
	StartingPageContainer,
	StartingPageContent,
	List,
	ListItem,
	ListItemContent,
	ListItemTitle,
	ListItemCard,
};

export default S;
