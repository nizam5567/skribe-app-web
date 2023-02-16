import { AppBar, Box, CssBaseline, CSSObject, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';
import MuiDrawer from '@mui/material/Drawer';
import * as process from 'process';
import PartyMenuIcon from './svg-components/PartyMenuIcon';
import ParticipantIcon from './svg-components/ParticipantIcon';
import { TeamMenuIcon } from './TeamMenuIcon';
import LeftArrowIcon from './svg-components/LeftArrowIcon';
import { SecurityMenuIcon } from './SecurityMenuIcon';
import BillingMenuIcon from './svg-components/BillingMenuicon';
import firebaseApp from '../lib/firebaseApp';
import LogOutIcon from './svg-components/LogOutIcon';
import PersonalInformation from './UserProfile/PersonalInformation';
import SkribeFabicon from './svg-components/SkribeFabicon';
import { UserAuthService } from '../services/userAuth.service';
import { useAuthContext } from '../contexts/AuthContext';

const drawerWidth = 240;
const auth = getAuth(firebaseApp);
const openedMixin = (theme: Theme): CSSObject => ({
  'width': 84,
  'transition': theme.transitions.create('width', {
    'easing': theme.transitions.easing.sharp,
    'duration': theme.transitions.duration.enteringScreen
  }),
  'overflowX': 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  'transition': theme.transitions.create('width', {
    'easing': theme.transitions.easing.sharp,
    'duration': theme.transitions.duration.leavingScreen
  }),
  'overflowX': 'hidden',
  'width': `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    'width': `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'padding': theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

export default function SettingsNavBar (props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUserPhoto, setCurrentUserPhoto] = useState('');
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { authUser } = useAuthContext();
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // useEffect(() => {
  //   auth.onAuthStateChanged((user: any) => {
  //     setCurrentUserPhoto(user?.photoURL);
  //   });
  // }, []);

  useEffect(() => {
    setCurrentUserPhoto(authUser?.photoURL);
  }, [authUser]);

  const signOut = async () => {
    try {
      await new UserAuthService().signOut();
      console.log('Successfully logged out.');
      document.location.href = '/signin';
    } catch (error: any) {
      console.log(error);
    }

    return false;
  };

  const onLogoutClick = async () => {
    await signOut();
  };
  const menuItem = [
    {
      'text': 'My Account',
      'icon': <Image src={currentUserPhoto || `${process.env.BASE_URL}images/user-default-photo.png`} alt="User photo" width={20} height={20} />,
      'path': '/users/my-account'
    },
    {
      'text': 'Security',
      'icon': <SecurityMenuIcon />,
      'path': '/users/security'
    },
    {
      'text': 'Billing',
      'icon': <BillingMenuIcon />,
      'path': '/'
    }
  ];
  const menuOrg = [
    {
      'text': 'General',
      'icon': <PartyMenuIcon />,
      'path': '/users/organization-general'
    },
    {
      'text': 'Team',
      'icon': <TeamMenuIcon />,
      'path': '/users/team'
    }
  ];
  const theme = useTheme();
  const isMatch = useMediaQuery('lg');
  const drawer = (
    <Box
      sx={{
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'space-between',
        'height': '100%'
      }}
    >
      <Box>
        <Toolbar>
          <Grid container columns={12}>
            <Grid
              item
              xs={2}
              onClick={() => {
                router.push('/home');
              }}
              sx={{ 'cursor': 'pointer' }}
              mt={0.75}
            >
              <LeftArrowIcon />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h2">Settings</Typography>
            </Grid>
          </Grid>
        </Toolbar>
        <Typography variant="subtitle2" mb={2} mt={2} px={2.5} color="#B5B9BD">
          Personal
        </Typography>
        <Divider variant="middle" />
        <List
          sx={{
            'margin': '10px 20px'
          }}
        >
          {menuItem.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                router.push(item.path);
              }}
              sx={{
                ...(item.path === router.pathname && {
                  'backgroundColor': '#EBEBEA'
                }),
                'borderRadius': '0.25rem',
                'margin': '10px 0px',
                'height': '36px'
              }}
            >
              <ListItemIcon sx={{ 'minWidth': '30px' }}>{item.icon}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ 'fontSize': '0.875rem' }} primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle2" mb={2} mt={4} px={2.5} color="#B5B9BD">
          Organization
        </Typography>
        <Divider variant="middle" />
        <List
          sx={{
            'margin': '10px 20px'
          }}
        >
          {menuOrg.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                router.push(item.path);
              }}
              sx={{
                'borderRadius': '0.25rem',
                'margin': '10px 0px',
                'height': '36px',
                ...(item.path === router.pathname && {
                  'backgroundColor': '#EBEBEA'
                })
              }}
            >
              <ListItemIcon sx={{ 'minWidth': '30px' }}>{item.icon}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ 'fontSize': '0.875rem' }} primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <List>
          {['Logout'].map((text, index) => (
            <ListItem
              button
              key={text}
              sx={{
                'borderRadius': '0.25rem',
                'margin': '10px 20px',
                'height': '36px',
                'width': 'auto',
                ' & :hover': {
                  'color': 'red'
                }
              }}
              onClick={onLogoutClick}
            >
              <ListItemIcon sx={{ 'minWidth': '30px' }}>{index === 0 ? <LogOutIcon /> : ''}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ 'fontSize': '0.875rem' }} primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
  const DrawerMini = styled(MuiDrawer, {
    'shouldForwardProp': (prop) => prop !== 'open'
  })(({ theme, open }) => ({
    'width': 84,
    'flexShrink': 0,
    'margin': 'auto',
    'whiteSpace': 'nowrap',
    'boxSizing': 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  }));
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ 'display': 'flex' }}>
      {!isMatch ? (
        <Box
          component="nav"
          // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          sx={{
            'width': { 'sm': `calc(100% - ${drawerWidth}px)` },
            'ml': { 'sm': `${drawerWidth}px` }
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                'boxSizing': 'border-box',
                'width': drawerWidth
              },
              'position': 'fixed'
            }}
            open={mobileOpen}
          >
            {drawer}
          </Drawer>
        </Box>
      ) : (
        <DrawerMini variant="permanent" open={mobileOpen}>
          <DrawerHeader>
            <IconButton onClick={async () => await router.push('/events')}>
              <LeftArrowIcon />
            </IconButton>
          </DrawerHeader>
          <Divider variant="middle" />
          <List>
            {menuItem.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={async () => await router.push(item.path)}
                disablePadding
                sx={{
                  ...(item.path === router.pathname && {
                    'backgroundColor': '#EBEBEA'
                  }),
                  'display': 'block',
                  'minHeight': 38,
                  'px': 3,
                  'py': 1
                }}
              >
                <ListItemIcon
                  sx={{
                    'minWidth': 0,
                    'mr': mobileOpen ? 1 : 'auto',
                    'justifyContent': 'center'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ 'opacity': mobileOpen ? 1 : 0 }} />
              </ListItem>
            ))}
          </List>
          <Divider variant="middle" />
          <List>
            {menuOrg.map((item) => (
              <ListItem
                button
                key={item.text}
                disablePadding
                onClick={async () => await router.push(item.path)}
                sx={{
                  ...(item.path === router.pathname && {
                    'backgroundColor': '#EBEBEA'
                  }),
                  'display': 'block',
                  'minHeight': 48,
                  'px': 2.5,
                  'py': 1
                }}
              >
                <ListItemIcon
                  sx={{
                    'minWidth': 0,
                    'mr': mobileOpen ? 1 : 'auto',
                    'justifyContent': 'center'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ 'opacity': mobileOpen ? 1 : 0 }} />
              </ListItem>
            ))}
          </List>
          <List sx={{ 'position': 'absolute', 'bottom': '20px' }}>
            {['Logout'].map((text, index) => (
              <ListItem button key={text} disablePadding sx={{ 'display': 'block', 'minHeight': 48, 'px': 1 }} onClick={onLogoutClick}>
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      'minWidth': 0,
                      'mr': mobileOpen ? 1 : 'auto',
                      'justifyContent': 'center'
                    }}
                  >
                    {index === 0 ? <LogOutIcon /> : ''}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ 'opacity': mobileOpen ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DrawerMini>
      )}
    </Box>
  );
}
