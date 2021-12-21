import React, { ReactElement } from 'react';

import { Button } from '@material-ui/core';

import { ButtonFilterPropsType } from './types';

export const ButtonFilter = ({
  filter,
  onActiveClickHandler,
  onAllClickHandler,
  onCompletedClickHandler,
}: ButtonFilterPropsType): ReactElement => (
  <div style={{ paddingTop: '10px' }}>
    <Button
      variant={filter === 'all' ? 'contained' : 'text'}
      onClick={onAllClickHandler}
      color="primary"
    >
      All
    </Button>
    <Button
      variant={filter === 'active' ? 'contained' : 'text'}
      onClick={onActiveClickHandler}
      color="default"
    >
      Active
    </Button>
    <Button
      variant={filter === 'completed' ? 'contained' : 'text'}
      onClick={onCompletedClickHandler}
      color="secondary"
    >
      Completed
    </Button>
  </div>
);
