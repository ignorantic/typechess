// libs
import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

// components
import { GridList, Container } from '@material-ui/core';
import { ListResponse } from '../../../data-provider/types';

// helpers
import dataProvider from '../../../data-provider';

// resources
import { GET_LIST } from '../../../lib/typecore/dataFetchActions';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 16,
  },
}));

interface PositionsListContainerProps {
  someProp?: string | undefined;
}

const propTypes = {
  //
};

const defaultProps = {
  //
};

const PositionsList: FC<PositionsListContainerProps> = () => {
  const classes = useStyles();

  useEffect(() => {
    const fetchData: Promise<ListResponse> = dataProvider(GET_LIST, 'positions', {
      sort: { field: 'promo_code', order: 'ASC' },
      pagination: { page: 1, perPage: 10 },
    });
    fetchData.then((data) => console.log(data));
    }, []
  );

  return (
    <Container component="section" classes={classes}>
      <GridList />
    </Container>
  );
};

PositionsList.propTypes = propTypes;
PositionsList.defaultProps = defaultProps;

export default PositionsList;
