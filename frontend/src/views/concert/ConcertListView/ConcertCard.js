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
// import AccessTimeIcon from '@material-ui/icons/AccessTime';
// import GetAppIcon from '@material-ui/icons/GetApp';
import { Link as RouterLink } from 'react-router-dom';

import { stringDateFormat } from 'src/common/utils';

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

const ConcertCard = ({ className, concert, ...rest }) => {
  const classes = useStyles();

  const concertUrl = `/app/concert/${concert.id}`;

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
            alt="Concert"
            src={concert.media}
            variant="square"
          />
        </Box> */}
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {concert.title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {stringDateFormat(concert.date)}
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
            <RouterLink to={concertUrl}>
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

ConcertCard.propTypes = {
  className: PropTypes.string,
  concert: PropTypes.object.isRequired
};

export default ConcertCard;
