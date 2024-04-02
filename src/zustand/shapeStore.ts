import create from 'zustand';
import { ShapeProps } from '@/type/drawing.type';

interface ShapeState {
  shapes: ShapeProps[];
  setShapes: (shapes: ShapeProps[]) => void;
  selectedShapeId: number | null;
  setSelectedShapeId: (id: number | null) => void;
  drawingType: 'rectangle' | 'circle';
  setDrawingType: (type: 'rectangle' | 'circle') => void;
}

export const useShapeStore = create<ShapeState>(set => ({
  shapes: [],
  setShapes: (shapes: ShapeProps[]) => set(() => ({ shapes })),
  selectedShapeId: null,
  setSelectedShapeId: id => set(() => ({ selectedShapeId: id })),
  drawingType: 'rectangle',
  setDrawingType: type => set(() => ({ drawingType: type })),
}));
