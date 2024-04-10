import React, { useRef, useState } from 'react';
import { ShapeProps } from '@/type/drawing.type';
import { useShapeStore } from '@/zustand/shapeStore';
import { produce } from 'immer';

interface UseMouseHandlerReturn {
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: () => void;
}

const useMouseHandler = (): UseMouseHandlerReturn => {
  const {
    shapes,
    setShapes,
    setSelectedShapeId,
    drawingType,
    selectedShapeId,
  } = useShapeStore();
  const startPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    startPosition.current = { x, y };

    const hitShape = shapes.find(
      shape =>
        x >= shape.x &&
        x <= shape.x + shape.width &&
        y >= shape.y &&
        y <= shape.y + shape.height
    );

    if (hitShape) {
      setIsMoving(true);
      setSelectedShapeId(hitShape.id);
    } else {
      setIsDrawing(true);
      const newShape: ShapeProps = {
        id: Date.now(),
        type: drawingType,
        x,
        y,
        width: 0,
        height: 0,
        isSelected: true,
      };
      setShapes([...shapes, newShape]);

      setSelectedShapeId(newShape.id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDrawing && !isMoving) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newState = produce(shapes, draft => {
      const shape = draft.find(shape => shape.id === selectedShapeId);
      if (shape) {
        const dx = x - startPosition.current.x;
        const dy = y - startPosition.current.y;

        if (isDrawing) {
          shape.width += dx;
          shape.height += dy;
        } else if (isMoving) {
          shape.x += dx;
          shape.y += dy;
        }
        startPosition.current = { x, y };
      }
    });
    setShapes(newState);
  };
  const handleMouseUp = (): void => {
    setIsDrawing(false);
    setIsMoving(false);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

export default useMouseHandler;
