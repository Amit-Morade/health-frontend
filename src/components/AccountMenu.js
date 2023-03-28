import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router';
import { Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { loggedInUserSelector } from '../features/loggedInUserSlice';

export default function AccountMenu({logoutUser}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const [checked, setChecked] = React.useState(false);
  const loggedInUser = useSelector(loggedInUserSelector)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose()
    logoutUser();
  }
  const handleAvailabilityChange = () => {
    if(checked===false) {
        setChecked(true);
    }else {
        setChecked(false);
    }
    
  }
  const navigateToProfile = () =>{
    handleClose()
    navigate('/about/profile')
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(1,1,1,1))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className="w-56">
            <MenuItem onClick={navigateToProfile}>
            <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
            <Avatar /> Logout
            </MenuItem>
            { (loggedInUser && loggedInUser.role==='doctor') && <MenuItem>
                    <Switch
                        checked={checked}
                        onChange={handleAvailabilityChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <small className={checked ? 'text-green-600' : 'text-stone-500'}>{checked ? 'Available' : 'Not Available'}</small>
                </MenuItem>
            }
            
        </div>
        
      </Menu>
    </React.Fragment>
  );
}