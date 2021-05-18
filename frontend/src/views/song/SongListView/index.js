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
import SongCard from './SongCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  songCard: {
    height: '100%'
  }
}));

const SongList = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(api.graphql.query.SONGS);

  const title = 'Songs';

  if (loading) return <Loading title={title} />;
  if (error) return <p>Error</p>;

  const songs = [...data.songs];
  songs.sort((a, b) => { return a.title < b.title ? -1 : 1; });

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
            {songs.map((song) => (
              <Grid
                item
                key={song.id}
                lg={4}
                md={6}
                xs={12}
              >
                <SongCard
                  className={classes.concertCard}
                  song={song}
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

export default SongList;
