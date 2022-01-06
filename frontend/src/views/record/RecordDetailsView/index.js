import React from 'react';
// import clsx from 'clsx';
import { useMatch, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
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
import BandcampIcon from 'src/icons/Bandcamp';

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
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  artwork: {
    padding: theme.spacing(1),
  },
  artworkImg: {
    width: '100%',
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
  const artworkUrl = `/static/images/artworks/${data.record.artwork}`;
  const artwork = !artworkUrl ? null : (
    <img className={classes.artworkImg} alt="artwork" src={artworkUrl} />
  );

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
          <Grid item xs={3}>
            <Box className={classes.artwork}>
              {artwork}
            </Box>
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Listen on
            </Typography>
            <List>
              {data.record.links.map((link) => {
                let icon = null;
                let title = null;

                // TODO switch the right icon here
                icon = <BandcampIcon color="primary" />
                title = 'Bandcamp';


                return (
                  <ListItem
                    disableGutters
                    key={link}
                  >
                    <Button
                      activeClassName={classes.active}
                      className={classes.button}
                      startIcon={icon}
                      target="_blank"
                      href={link}
                    >
                      <span>
                        {title}
                      </span>
                    </Button>
                  </ListItem>
                );
              })}

            </List>

          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default RecordDetails;
