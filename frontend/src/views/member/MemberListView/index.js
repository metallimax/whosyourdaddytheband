import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
// import { Pagination } from '@material-ui/lab';
import Loading from 'src/components/Loading';
import Page from 'src/components/Page';

import api from 'src/common/api';

import MemberCard from './MemberCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  memberCard: {
    height: '100%'
  }
}));

const MemberList = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(api.graphql.query.MEMBERS);

  const title = 'Members';

  if (loading) return <Loading title={title} />;
  if (error) return <p>Error</p>;

  const members = [...data.members].filter((member) => {
    const today = new Date();
    const strToday = today.toISOString().substr(0, 10);

    return member.member_until === null || member.member_until >= strToday;
  });
  members.sort((a, b) => { return a.birth_date < b.birth_date ? -1 : 1; });

  return (
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
            {members.map((member) => (
              <Grid
                item
                key={member.id}
                lg={3}
                md={6}
                xs={12}
              >
                <MemberCard
                  className={classes.memberCard}
                  member={member}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box> */}
      </Container>
    </Page>
  );
};

export default MemberList;
