import React from 'react';
import { useMatch } from "react-router-dom";
import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import api from 'src/common/api';

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

const ConcertDetails = () => {
  const classes = useStyles();
  const match = useMatch('/app/concert/:concertId');
  const { loading, error, data } = useQuery(api.graphql.query.CONCERT, {
    variables: {
      id: match.params.concertId,
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  // const concerts = [...data.concerts];
  // concerts.sort((a, b) => { return a.date > b.date ? -1 : 1; });

  console.log(data);

  return (
    <Page
      className={classes.root}
      title="Concerts"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            TOTO
            {/* {concerts.map((concert) => (
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
            ))} */}
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default ConcertDetails;
