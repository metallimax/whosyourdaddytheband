import React from 'react';
import { useMatch, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import clsx from 'clsx';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  // AccordionActions,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  ArrowRightCircle as ArrowRightCircleIcon,
  Music as MusicIcon,
  User as UserIcon,
  Users as UsersIcon,
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
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="songs-content"
              id="songs-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>Setlist</Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>
                  Songs played during the concert
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <div className={classes.column}>
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
                            <IconButton edge="end" aria-label="song">
                              <ArrowRightCircleIcon />
                            </IconButton>
                          </RouterLink>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>

              </div>
              <div className={classes.column} />
              {/* <div className={clsx(classes.column, classes.helper)}>
                <Typography variant="caption">
                  Select your destination of choice
                  <br />
                  <a href="#secondary-heading-and-columns" className={classes.link}>
                    Learn more
                  </a>
                </Typography>
              </div> */}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="bands-content"
              id="bands-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>Bands</Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>
                  Other bands playing with us
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <div className={classes.column}>
                <List component="nav" aria-label="main mailbox folders">
                  {bands.map((band) => {
                    return (
                      <ListItem key={`band_${band}`}>
                        <ListItemIcon>
                          <UsersIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.songTitle} primary={band} />
                      </ListItem>
                    );
                  })}
                </List>

              </div>
              <div className={classes.column} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="members-content"
              id="members-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>Members</Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>
                  The band member who played this concert
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <div className={classes.column}>
                <List component="nav" aria-label="main mailbox folders">
                  {members.map((member) => {
                    const roles = member.roles.map((role) => role.name).join(', ');

                    return (
                      <ListItem key={`member_${member.pseudo}`}>
                        <ListItemIcon>
                          <UserIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.songTitle} primary={`${member.pseudo} (${roles})`} />
                      </ListItem>
                    );
                  })}
                </List>

              </div>
              <div className={classes.column} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </Page>
  );
};

export default ConcertDetails;
