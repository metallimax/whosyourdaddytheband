import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';

import banner from './wyd_banner.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    textAlign: 'center',
  },

  banner: {
    width: '100%',
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Who's Your Daddy?"
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
        >
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <img src={banner} alt="Banner" className={classes.banner} />
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default Home;
