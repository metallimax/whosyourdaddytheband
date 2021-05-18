import React from 'react';
import { useMatch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import clsx from 'clsx';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';

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

const MemberDetails = () => {
  const classes = useStyles();
  const match = useMatch('/app/members/:memberId');
  const { loading, error, data } = useQuery(api.graphql.query.MEMBER, {
    variables: {
      id: match === null ? 0 : match.params.memberId,
    }
  });

  if (match === null) {
    return <div>ERROR: match is null</div>;
  }

  let title = 'Member';

  if (loading) return <Loading title={title} />;
  if (error) return <p>Error</p>;

  title = `${title}: ${data.member.pseudo}`;

  // const songs = [...data.concert.songs];
  // songs.sort((a, b) => { return a.rank < b.rank ? -1 : 1; });
  // const bands = [...data.concert.bands];
  // bands.sort();
  // const members = [...data.concert.members];
  // members.sort((a, b) => { return a.birth_date < b.birth_date ? -1 : 1; });

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
      </Container>
    </Page>
  );
};

export default MemberDetails;
