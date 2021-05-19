import React from 'react';
import {
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
  }
}));

const Booking = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Contact"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            Booking
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Booking;
