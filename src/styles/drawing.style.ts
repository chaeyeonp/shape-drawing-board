import styled from 'styled-components';

const BoardContainer = styled.div`
  width: 100%;
  height: 50vh;
  position: relative;
  background-color: white;
  border: 1px solid black;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;

const Button = styled.button`
  margin-right: 10px;
`;

const ShapeContainer = styled.div<{
  type: 'rectangle' | 'circle';
  isSelected: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}>`
  cursor: pointer;
  position: absolute;
  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y}px`};
  width: ${({ width }) => `${Math.abs(width)}px`};
  height: ${({ height }) => `${Math.abs(height)}px`};
  background-color: ${({ isSelected }) =>
    isSelected ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 255, 0.5)'};
  border-radius: ${({ type }) => (type === 'circle' ? '50%' : '0')};
  border: ${({ isSelected }) => (isSelected ? '2px dashed black' : 'none')};
`;

export { BoardContainer, ButtonContainer, Button, ShapeContainer };
