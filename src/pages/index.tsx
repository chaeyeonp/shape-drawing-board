import styled from 'styled-components';
import DrawingBoard from '@/components/DrawingBoard';

const Container = styled.div`
  background-color: white;
  color: black;
`;

const Header = styled.h1`
  text-align: center;
  margin: 0;
  padding: 20px;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
`;

export default function Home() {
  return (
    <Container>
      <Header>Drawing Board</Header>
      <Content>
        <DrawingBoard />
      </Content>
    </Container>
  );
}
