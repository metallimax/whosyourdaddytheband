import React from 'react';
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  makeStyles
} from '@material-ui/core';

// import EmailIcon from '@material-ui/icons/Email';

import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Mail as MailIcon,
} from 'react-feather';

import Page from 'src/components/Page';
// import FacebookIcon from 'src/icons/Facebook';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Contact = () => {
  const classes = useStyles();

  const contacts = [
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      href: 'https://www.facebook.com/whosyourdaddytheband/',
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon />,
      href: 'https://www.instagram.com/whosyourdaddytheband/',
    },
    {
      name: 'E-mail',
      icon: <MailIcon />,
      href: 'mailto:whosyourdaddytheband@gmail.com',
    },
  ];

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
            <Typography sx={{ mt: 4, mb: 2 }} variant="h1" component="div">
              Contact
            </Typography>
            <Typography sx={{ mt: 4, mb: 2 }} variant="body" component="div">
              Please chose a way to contact us for booking or any purpose.
            </Typography>
            <List>
              {contacts.map((contact, index) => {
                const key = `contact_${index}`;

                return (
                  <ListItem
                    disableGutters
                    key={key}
                  >
                    <Button
                      activeClassName={classes.active}
                      className={classes.button}
                      startIcon={contact.icon}
                      target="_blank"
                      href={contact.href}
                    >
                      <span>
                        {contact.name}
                      </span>
                    </Button>
                  </ListItem>
                );
              })}

            </List>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Contact;
