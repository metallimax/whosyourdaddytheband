import React from 'react';
import clsx from 'clsx';
import { useMatch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
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
  const authorsStr = authors.map((author) => author.fullname).join(', ');
  const composers = [...data.song.composers];
  const composersStr = composers.map((composer) => composer.fullname).join(', ');
  const duration = stringDurationFormat(data.song.duration);
  const recordsStr = data.song.records.map((record) => record.title).join(', ');
  const concerts = [...data.song.concerts];
  concerts.sort((a, b) => (a.date < b.date ? 1 : -1));
  const concertsStr = concerts.map((concert) => concert.title).join(', ');

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
          <Grid item md={4} xs={12}>
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
                    <React.Fragment key={key}>
                      {line}
                      <br />
                    </React.Fragment>
                  );
                })}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell variant="head">Duration</TableCell>
                    <TableCell>{duration}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Authors</TableCell>
                    <TableCell>{authorsStr}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Composers</TableCell>
                    <TableCell>{composersStr}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={4} xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell variant="head">Records</TableCell>
                    <TableCell>{recordsStr}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Concerts</TableCell>
                    <TableCell>{concertsStr}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default SongDetails;
