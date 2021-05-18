import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
// import { Pagination } from '@material-ui/lab';
import Loading from 'src/components/Loading';
import Page from 'src/components/Page';

import api from 'src/common/api';

import Toolbar from './Toolbar';
import RecordCard from './RecordCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  recordCard: {
    height: '100%'
  }
}));

const RecordList = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(api.graphql.query.RECORDS);

  const title = 'Records';

  if (loading) return <Loading title={title} />;
  if (error) return <p>Error</p>;

  const records = [...data.records];
  records.sort((a, b) => { return a.released > b.released ? -1 : 1; });

  return (
    <Page
      className={classes.root}
      title={title}
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {records.map((record) => (
              <Grid
                item
                key={record.id}
                lg={4}
                md={6}
                xs={12}
              >
                <RecordCard
                  className={classes.recordCard}
                  record={record}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box> */}
      </Container>
    </Page>
  );
};

export default RecordList;
