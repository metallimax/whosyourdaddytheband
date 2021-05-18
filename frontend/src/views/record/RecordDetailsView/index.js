import React from 'react';
import clsx from 'clsx';
import { useMatch, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  // ListSubheader,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  ArrowRightCircle as ArrowRightCircleIcon,
  Music as MusicIcon,
} from 'react-feather';

import Page from 'src/components/Page';

import api from 'src/common/api';
import Loading from 'src/components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  concertCard: {
    height: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const RecordDetails = () => {
  const classes = useStyles();
  const match = useMatch('/app/records/:recordId');
  const { loading, error, data } = useQuery(api.graphql.query.RECORD, {
    variables: {
      id: match === null ? 0 : match.params.recordId,
    }
  });

  if (match === null) {
    return <div>ERROR: match is null</div>;
  }

  let title = 'Record';

  if (loading) return <Loading title={title} />;
  if (error) return <p>Error</p>;

  title = `${title}: ${data.record.title} [${data.record.type}]`;

  const songs = [...data.record.songs];
  songs.sort((a, b) => { return a.rank < b.rank ? -1 : 1; });

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
              <List component="nav" aria-label="main mailbox folders">
                {songs.map((song) => {
                  const songUrl = `/app/songs/${song.id}`;

                  return (
                    <ListItem key={`song_${song.id}`}>
                      <ListItemIcon>
                        <MusicIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.songRank} primary={song.rank} />
                      <ListItemText className={classes.songTitle} primary={song.title} />
                      <ListItemSecondaryAction>
                        <RouterLink to={songUrl}>
                          <IconButton edge="end" aria-label="delete">
                            <ArrowRightCircleIcon />
                          </IconButton>
                        </RouterLink>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            {/* <Paper className={clsx(classes.paper, classes.collab)}>
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
            </Paper> */}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default RecordDetails;
