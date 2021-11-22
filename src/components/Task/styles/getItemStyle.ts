import { CSSProperties } from 'react';

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any,
): CSSProperties | undefined => ({
  background: isDragging ? '#3f51b5' : 'white',
  color: isDragging ? 'white' : 'black',
  borderRadius: `5px`,
  ...draggableStyle,
});
