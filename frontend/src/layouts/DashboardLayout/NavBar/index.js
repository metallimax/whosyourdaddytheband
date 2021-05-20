import React, { useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import {
  // Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  // Typography,
  makeStyles
} from '@material-ui/core';
import {
  Disc as DiscIcon,
  Home as HomeIcon,
  Music as MusicIcon,
  Send as SendIcon,
  Speaker as SpeakerIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/home',
    icon: HomeIcon,
    title: 'Home'
  },
  {
    href: '/app/concerts',
    icon: SpeakerIcon,
    title: 'Concerts'
  },
  {
    href: '/app/records',
    icon: DiscIcon,
    title: 'Records'
  },
  {
    href: '/app/songs',
    icon: MusicIcon,
    title: 'Songs'
  },
  {
    href: '/app/members',
    icon: UsersIcon,
    title: 'Members'
  },
  {
    href: '/app/contact',
    icon: SendIcon,
    title: 'Contact'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        display="flex"
        justifyContent="center"
        mb={2}
        mt={2}
      >
        <RouterLink to="/app/booking">
          <Button
            color="primary"
            variant="contained"
          >
            Book the band!
          </Button>
        </RouterLink>
      </Box>

      <Divider />

      <Box pl={3}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
