import { useShapeStore } from '@/zustand/shapeStore';

export const useShapesHook = () => {
  const { setShapes, setSelectedShapeId } = useShapeStore();
  const clearShapes = () => {
    setShapes([]);
    setSelectedShapeId(null);
  };

  return { clearShapes };
};

export default useShapesHook;
