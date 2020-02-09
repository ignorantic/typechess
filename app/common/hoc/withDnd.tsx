// import libs
import React, { ComponentType, FC } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

// import components
import DragLayer from '../components/DragLayer';

const displayName = 'WithDndComponent';

const withDnd = <P extends object>(Component: ComponentType<P>) => {
  const WithDnd: FC<P> = (props: P) => (
    <DndProvider backend={Backend}>
      <Component {...props} />
      <DragLayer />
    </DndProvider>
  );

  WithDnd.displayName = displayName;

  return WithDnd;
};

export default withDnd;
