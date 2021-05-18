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
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const RecordCard = ({ className, record, ...rest }) => {
  const classes = useStyles();

  const recordUrl = `/app/records/${record.id}`;
  const artwork = `/static/images/artworks/${record.artwork}`;

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
            alt={record.title}
            className={classes.large}
            src={artwork}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {`${record.title} [${record.type}]`}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {stringDateFormat(record.released)}
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
            <RouterLink to={recordUrl}>
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

RecordCard.propTypes = {
  className: PropTypes.string,
  record: PropTypes.object.isRequired
};

export default RecordCard;
