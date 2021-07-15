import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import {
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  Users as UsersIcon
} from 'react-feather';
import PropTypes from 'prop-types';
import NavItem from './navitem';

const user = {
  jobTitle: 'Dükkan Sahibi',
  name: 'Etütcü Baba'
};

const adminMenu = [
  {
    href: 'dashboard',
    icon: BarChartIcon,
    title: 'Panel'
  },
  {
    href: 'teachers',
    icon: UsersIcon,
    title: 'Öğretmenler'
  },
  {
    href: 'students',
    icon: UsersIcon,
    title: 'Öğrenciler'
  },
  {
    href: 'settings',
    icon: SettingsIcon,
    title: 'Ayarlar'
  },
  {
    href: '/',
    icon: LockIcon,
    title: 'Çıkış Yap'
  }
];

const studentMenu = [
  {
    href: 'dashboard',
    icon: BarChartIcon,
    title: 'Panel'
  },
  {
    href: 'take-lessons',
    icon: UsersIcon,
    title: 'Etüt Al'
  },
  {
    href: 'account',
    icon: UsersIcon,
    title: 'Hesabım'
  },
  {
    href: 'settings',
    icon: SettingsIcon,
    title: 'Ayarlar'
  },
  {
    href: '/',
    icon: LockIcon,
    title: 'Çıkış Yap'
  }
];

const teacherMenu = [
  {
    href: 'dashboard',
    icon: BarChartIcon,
    title: 'Panel'
  },
  {
    href: 'account',
    icon: UsersIcon,
    title: 'Hesabım'
  },
  {
    href: 'lessons',
    icon: UsersIcon,
    title: 'Derslerim'
  },
  {
    href: 'settings',
    icon: SettingsIcon,
    title: 'Ayarlar'
  },
  {
    href: '/',
    icon: LockIcon,
    title: 'Çıkış Yap'
  }
];

const SideBar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  const listItems = location.pathname.includes('admin')
    ? adminMenu
    : location.pathname.includes('student')
    ? studentMenu
    : teacherMenu;

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className="p15"
      >
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box className="p20">
        <List>
          {listItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

SideBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

SideBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default SideBar;
