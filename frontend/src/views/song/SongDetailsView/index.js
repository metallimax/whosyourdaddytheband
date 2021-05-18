import React from 'react';
import clsx from 'clsx';
import { useMatch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';

import api from 'src/common/api';
import { stringDurationFormat } from 'src/common/utils';
import Loading from 'src/components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  lyrics: {
    textAlign: 'left',
  },
  collab: {
    textAlign: 'left',
  },
}));

const SongDetails = () => {
  const classes = useStyles();
  const match = useMatch('/app/songs/:songId');
  const { loading, error, data } = useQuery(api.graphql.query.SONG, {
    variables: {
      id: match === null ? 0 : match.params.songId,
    }
  });

  if (match === null) {
    return <div>ERROR: match is null</div>;
  }

  let title = 'Song';

  if (loading) return <Loading title={title} />;
  if (error) return <p>Error</p>;

  title = `${title}: ${data.song.title}`;

  const authors = [...data.song.authors];
  const composers = [...data.song.composers];
  const duration = stringDurationFormat(data.song.duration);

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
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={clsx(classes.paper, classes.lyrics)}>
              <Typography variant="body1">
                {!data.song.lyrics ? (<span><i>No lyrics</i></span>) : data.song.lyrics.split(/\r?\n/g).map((line, index) => {
                  const key = `line_${index}`;

                  if (line === '') {
                    line = <span>&nbsp;</span>;
                  } else if (line.match(/^\[.+\]$/)) {
                    line = <b>{line}</b>;
                  }

                  return (
                    <p key={key}>{line}</p>
                  );
                })}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={clsx(classes.paper, classes.collab)}>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={(
                  <ListSubheader component="div" id="nested-list-subheader">
                    Duration
                  </ListSubheader>
                )}
              >
                <ListItem>
                  <ListItemText primary={duration} />
                </ListItem>
              </List>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={(
                  <ListSubheader component="div" id="nested-list-subheader">
                    Authors
                  </ListSubheader>
                )}
              >
                {authors.map((author) => {
                  return (
                    <ListItem key={`authors_${author.id}`}>
                      <ListItemText primary={author.fullname} />
                    </ListItem>
                  );
                })}
              </List>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={(
                  <ListSubheader component="div" id="nested-list-subheader">
                    Composers
                  </ListSubheader>
                )}
              >
                {composers.map((composer) => {
                  return (
                    <ListItem key={`composers_${composer.id}`}>
                      <ListItemText primary={composer.fullname} />
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default SongDetails;
