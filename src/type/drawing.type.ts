type DrawingType = 'rectangle' | 'circle' | null;

interface ShapeProps {
  id: number; // 도형의 고유 ID
  type: DrawingType; // 도형의 타입 (사각형 또는 원)
  x: number; // 도형의 x 좌표
  y: number; // 도형의 y 좌표
  width: number; // 도형의 너비
  height: number; // 도형의 높이
  isSelected?: boolean; // 도형이 선택되었는지 여부
}

export type { ShapeProps, DrawingType };
