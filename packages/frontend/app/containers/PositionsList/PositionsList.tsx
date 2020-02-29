// libs
import React, { FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect, useDispatch } from 'react-redux';
import { values } from 'ramda';

// components
import {
  Container, List, ListItem, ListItemText,
} from '@material-ui/core';

import { compose } from 'redux';
import { crudGetList } from '../../../lib/redux-resource/actions/dataActions';
import { registerResource } from '../../../lib/redux-resource/actions';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 16,
  },
}));

type Position = {
  id: number;
  fen: string;
}

interface PositionsListContainerProps {
  positions: Position[];
}

const propTypes = {
  positions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};

const defaultProps = {
  positions: [],
};

const PositionsList: FC<PositionsListContainerProps> = (props) => {
  const { positions } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      registerResource({
        name: 'positions',
        options: {},
        hasList: true,
        hasEdit: false,
        hasShow: false,
        hasCreate: false,
      }),
    );
    dispatch(
      crudGetList(
        'positions',
        { page: 0, perPage: 10 },
        { field: 'id', order: 'ASC' },
      ),
    );
  }, []);

  return (
    <Container component="section" classes={classes}>
      <List>
        {
          positions.map((position) => (
            <ListItem key={position.id}>
              <ListItemText primary={position.id} secondary={position.fen} />
            </ListItem>
          ))
        }
      </List>
    </Container>
  );
};

// @ts-ignore
PositionsList.propTypes = propTypes;
PositionsList.defaultProps = defaultProps;

// @ts-ignore
const selectResource = (state, name) => values(state?.resources[name]?.data);

// @ts-ignore
const mapStateToProps = (state) => ({
  positions: selectResource(state, 'positions'),
});

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(PositionsList);
