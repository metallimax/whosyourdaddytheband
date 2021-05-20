import React from 'react';
import clsx from 'clsx';
import { useMatch, Link as RouterLink } from 'react-router-dom';
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
  TableHead,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';

import api from 'src/common/api';
import Loading from 'src/components/Loading';
import { stringDurationFormat } from 'src/common/utils';

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
  boxTitle: {
    padding: theme.spacing(1),
  },
}));

const ConcertDetails = () => {
  const classes = useStyles();
  const match = useMatch('/app/concerts/:concertId');
  const { loading, error, data } = useQuery(api.graphql.query.CONCERT, {
    variables: {
      id: match === null ? 0 : match.params.concertId,
    }
  });

  if (match === null) {
    return <div>ERROR: match is null</div>;
  }

  let title = 'Concert';

  if (loading) return <Loading title={title} />;
  if (error) return <p>Error</p>;

  title = `${title}: ${data.concert.title}`;

  const songs = [...data.concert.songs];
  songs.sort((a, b) => { return a.rank < b.rank ? -1 : 1; });
  const bands = [...data.concert.bands];
  bands.sort();
  const members = [...data.concert.members];
  members.sort((a, b) => { return a.birth_date < b.birth_date ? -1 : 1; });

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
          <Grid item xs={6}>
            <Paper className={clsx(classes.paper, classes.lyrics)}>
              <Box className={classes.boxTitle}>
                <Typography variant="h4" gutterBottom>
                  Setlist
                </Typography>
              </Box>

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">#</TableCell>
                      <TableCell>Song</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {songs.map((song) => {
                      const songUrl = `/app/songs/${song.id}`;

                      return (
                        <TableRow key={`band_${song.id}`}>
                          <TableCell align="right">{song.rank}</TableCell>
                          <TableCell><RouterLink to={songUrl}>{song.title}</RouterLink></TableCell>
                          <TableCell>{stringDurationFormat(song.duration)}</TableCell>
                          <TableCell align="center">
                            {/* <ArrowRightCircleIcon /> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={clsx(classes.paper, classes.collab)}>
              <Box className={classes.boxTitle}>
                <Typography variant="h4" gutterBottom>
                  Bands
                </Typography>
              </Box>

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {bands.map((band) => {
                      return (
                        <TableRow key={`band_${band}`}>
                          <TableCell>{band}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={clsx(classes.paper, classes.collab)}>
              <Box className={classes.boxTitle}>
                <Typography variant="h4" gutterBottom>
                  Members
                </Typography>
              </Box>

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Member</TableCell>
                      <TableCell>Roles</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members.map((member) => {
                      const roles = member.roles.map((role) => role.name).join(', ');
                      const memberUrl = `/app/members/${member.id}`;

                      return (
                        <TableRow key={`band_${member.id}`}>
                          <TableCell>
                            <RouterLink to={memberUrl}>{member.pseudo}</RouterLink>
                          </TableCell>
                          <TableCell>{roles}</TableCell>
                        </TableRow>
                      );
                    })}

                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ConcertDetails;
