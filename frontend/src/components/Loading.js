import React, { forwardRef } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

const Loading = forwardRef(({
  title,
  ...rest
}, ref) => {
  const classes = useStyles();

  return (
    <div
      ref={ref}
      {...rest}
    >
      <Page
        className={classes.root}
        title={title}
      >
        <Container maxWidth={false}>
          <Box mt={3}>
            <Grid
              container
              spacing={3}
            >
              <Skeleton variant="text" />
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="rect" width={210} height={118} />
            </Grid>
          </Box>
        </Container>
      </Page>
    </div>
  );
});

Loading.propTypes = {
  title: PropTypes.string
};

export default Loading;
