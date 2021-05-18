import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
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

const MemberCard = ({ className, member, ...rest }) => {
  const classes = useStyles();

  const memberUrl = `/app/members/${member.id}`;
  const avatar = `/static/images/avatars/${member.avatar}`;

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt={member.pseudo}
            src={avatar}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {member.pseudo}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {member.fullname}
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
          />
          <Grid
            className={classes.statsItem}
            item
          >
            <RouterLink to={memberUrl}>
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

MemberCard.propTypes = {
  className: PropTypes.string,
  member: PropTypes.object.isRequired
};

export default MemberCard;
