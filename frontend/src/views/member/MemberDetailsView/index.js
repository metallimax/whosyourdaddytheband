import React from 'react';
import clsx from 'clsx';
import { useMatch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';

import Page from 'src/components/Page';

import api from 'src/common/api';
import Loading from 'src/components/Loading';
import { stringDateFormat } from 'src/common/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.primary,
  },
  avatar: {
    padding: theme.spacing(1),
  },
  avatarImg: {
    width: '100%',
    borderRadius: '10%',
  },
}));

const StyledTableCell = withStyles(() => ({
  root: {
    borderBottom: 'none',
  },
}))(TableCell);

const GEAR_TYPES_RANKS = {};
const GEAR_TYPES = [
  'Microphone',
  'Guitar',
  'Bass',
  'Guitar amplifier',
  'Effect',
  'Looper/Switcher',
  'Tuner',
  'Noise gate',
  'Power supply',
];

GEAR_TYPES.forEach((type, index) => {
  GEAR_TYPES_RANKS[type] = index;
});

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

  const concerts = [...data.member.concerts];
  concerts.sort((a, b) => (a.date < b.date ? 1 : -1));
  const records = [...data.member.records];
  records.sort((a, b) => (a.date < b.date ? 1 : -1));
  const gears = [...data.member.gears];
  const gearTypes = [...(new Set(gears.map((gear) => gear.type.name)))];
  gearTypes.sort((a, b) => (GEAR_TYPES_RANKS[a] < GEAR_TYPES_RANKS[b] ? -1 : 1));
  const avatarUrl = `/static/images/avatars/${data.member.avatar}`;
  const avatar = !avatarUrl ? null : (
    <img className={classes.avatarImg} alt="avatar" src={avatarUrl} />
  );
  const rolesStr = data.member.roles.map((role) => role.name).join(', ');

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
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Box className={classes.avatar}>
              {avatar}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Paper className={clsx(classes.paper)}>
              <Typography variant="h3">
                Bio
              </Typography>

              <Divider />

              <Box mt={3}>
                <Typography variant="body1">
                  {data.member.bio}
                </Typography>
              </Box>

              <Box mt={3}>
                <Typography variant="h4">
                  Info
                </Typography>
                <TableContainer component={Box}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <StyledTableCell variant="head">Name</StyledTableCell>
                        <StyledTableCell>{data.member.fullname}</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell variant="head">Roles</StyledTableCell>
                        <StyledTableCell>{rolesStr}</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell variant="head">Member from</StyledTableCell>
                        <StyledTableCell>
                          {stringDateFormat(data.member.member_from)}
                        </StyledTableCell>
                      </TableRow>
                      {!data.member.member_until ? null : (
                        <TableRow>
                          <StyledTableCell variant="head">Member until</StyledTableCell>
                          <StyledTableCell>
                            {stringDateFormat(data.member.member_until)}
                          </StyledTableCell>
                        </TableRow>
                      )}

                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box mt={3}>
                <Typography variant="h4">
                  Records done
                </Typography>
                <List dense>
                  {records.map((record) => {
                    return (
                      <ListItem key={`record_${record.id}`}>
                        <ListItemText
                          primary={record.title}
                          secondary={stringDateFormat(record.recorded)}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>

              <Box mt={3}>
                <Typography variant="h4">
                  Concerts done
                </Typography>
                <List dense>
                  {concerts.map((concert) => {
                    return (
                      <ListItem key={`concert_${concert.id}`}>
                        <ListItemText
                          primary={concert.title}
                          secondary={stringDateFormat(concert.date)}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={clsx(classes.paper)}>
              <Typography variant="h3">
                Gears
              </Typography>

              <Divider />

              <Box mt={3}>
                {gearTypes.map((gearType) => {
                  return (
                    <Box key={`gearType_${gearType}`}>
                      <Typography variant="h4">
                        {gearType}
                      </Typography>
                      <List dense>
                        {gears.filter((gear) => gear.type.name === gearType).map((gear) => {
                          return (
                            <ListItem key={`gear_${gear.name}`}>
                              <ListItemText
                                primary={gear.name}
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default MemberDetails;
