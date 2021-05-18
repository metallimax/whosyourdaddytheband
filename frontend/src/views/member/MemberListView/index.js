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
import ConcertCard from './ConcertCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  concertCard: {
    height: '100%'
  }
}));

const ConcertList = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(api.graphql.query.CONCERTS);

  const title = 'Concerts';

  if (loading) return <Loading title={title} />;
  if (error) return <p>Error</p>;

  const concerts = [...data.concerts];
  concerts.sort((a, b) => { return a.date > b.date ? -1 : 1; });

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
            {concerts.map((concert) => (
              <Grid
                item
                key={concert.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ConcertCard
                  className={classes.concertCard}
                  concert={concert}
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

export default ConcertList;
