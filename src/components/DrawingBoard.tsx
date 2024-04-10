import React, { useEffect } from 'react';
import useMouseHandler from '@/hooks/useMouseHandler';
import { useShapeStore } from '@/zustand/shapeStore';
import useShapeHook from '@/hooks/useShapeHook';

const DrawingBoard: React.FC = () => {
  const {
    shapes,
    setShapes,
    selectedShapeId,
    setSelectedShapeId,
    setDrawingType,
  } = useShapeStore();
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useMouseHandler();
  const { clearShapes } = useShapeHook();

  useEffect(() => {
    const loadedShapes = JSON.parse(localStorage.getItem('shapes') || '[]');
    setShapes(loadedShapes);
  }, []);

  useEffect(() => {
    if (shapes.length > 0) {
      localStorage.setItem('shapes', JSON.stringify(shapes));
    }
  }, [shapes]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        width: '100%',
        height: '50vh',
        position: 'relative',
        backgroundColor: 'white',
        border: '1px solid black',
      }}
    >
      <div
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}
      >
        <button onClick={() => setDrawingType('rectangle')}>Rectangle</button>
        <button onClick={() => setDrawingType('circle')}>Circle</button>
        <button onClick={clearShapes}>Clear</button>
      </div>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            left: `${shape.x}px`,
            top: `${shape.y}px`,
            width: `${Math.abs(shape.width)}px`,
            height: `${Math.abs(shape.height)}px`,
            backgroundColor: shape.isSelected
              ? 'rgba(255, 0, 0, 0.5)'
              : 'rgba(0, 0, 255, 0.5)',
            borderRadius: shape.type === 'circle' ? '50%' : '0',
            border: shape.id === selectedShapeId ? '2px dashed black' : 'none',
          }}
          onMouseDown={e => {
            e.stopPropagation(); // Prevent triggering mousedown on the drawing area
            setSelectedShapeId(shape.id);
          }}
        />
      ))}
    </div>
  );
};

export default DrawingBoard;
