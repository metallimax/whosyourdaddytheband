import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  // Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const SongCard = ({ className, song, ...rest }) => {
  const classes = useStyles();

  const songUrl = `/app/songs/${song.id}`;

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        {/* <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt="Song"
            src={Song.media}
            variant="square"
          />
        </Box> */}
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {song.title}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            {/* <AccessTimeIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              Updated 2hr ago
            </Typography> */}
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <RouterLink to={songUrl}>
              <Button
                color="primary"
                variant="contained"
              >
                Details
              </Button>
            </RouterLink>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

SongCard.propTypes = {
  className: PropTypes.string,
  song: PropTypes.object.isRequired
};

export default SongCard;
