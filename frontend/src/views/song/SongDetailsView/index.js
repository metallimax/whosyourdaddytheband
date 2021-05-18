import React from 'react';
import { useMatch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';

import api from 'src/common/api';
import Loading from 'src/components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SongDetails = () => {
  const classes = useStyles();
  const match = useMatch('/app/songs/:songId');
  const { loading, error, data } = useQuery(api.graphql.query.SONG, {
    variables: {
      id: match.params.songId,
    }
  });

  let title = 'Song';

  if (loading) return <Loading title={title} />;
  if (error) return <p>Error</p>;

  title = `${title}: ${data.song.title}`;

  return (
    <Page
      className={classes.root}
      title={title}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Typography variant="h2" gutterBottom>
            {title}
          </Typography>
        </Box>
      </Container>
    </Page>
  );
};

export default SongDetails;
