// libs
import React, { FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect, useDispatch } from 'react-redux';

// components
import {
  Container, List, ListItem, ListItemText,
} from '@material-ui/core';

import { compose } from 'redux';
import { crudGetOne, registerResource } from '../../../lib/redux-resource';
import { ApplicationState } from '../../store/makeStore';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 16,
  },
}));

type Position = {
  id: number;
  fen: string;
}

interface PositionsShowContainerProps {
  id: number;
  position: Position | null;
}

const propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fen: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  position: null,
};

const PositionsShow: FC<PositionsShowContainerProps> = (props: PositionsShowContainerProps) => {
  const { id, position } = props;
  const classes = useStyles({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      registerResource({
        name: 'positions',
        options: {},
      }),
    );
    dispatch(
      crudGetOne('positions', id, '/positions'),
    );
  }, []);

  if (position === null) {
    return null;
  }

  return (
    <Container component="section" classes={classes}>
      <List>
        <ListItem key={position.id}>
          <ListItemText primary={position.id} secondary={position.fen} />
        </ListItem>
      </List>
    </Container>
  );
};

PositionsShow.propTypes = propTypes;
PositionsShow.defaultProps = defaultProps;

const selectResource = (
  state: ApplicationState,
  name: string,
  id: number,
) => state.resources[name]?.data[id];

const mapStateToProps = (state: ApplicationState, ownProps: { id: number }) => ({
  position: selectResource(state, 'positions', ownProps.id),
});

const enhance = compose(
  connect(mapStateToProps),
);

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default enhance(PositionsShow);
