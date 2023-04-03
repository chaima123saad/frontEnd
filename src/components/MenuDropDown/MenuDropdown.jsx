import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { MdLogout } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
// import { avatarByGender } from '../../utils/methods';
import ActionLink from '../ActionLink/ActionLink';
import "./menuDropdown.css";
import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
const MenuDropdown = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  // const { user } = useSelector((state) => state.auth);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (
    event
  ) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = async () => {
    try {
      // dispatch({ type: 'LOGOUT' });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {open && (
        <button
          className="overlay__userinfo"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === 'Space') {
              setOpen(false);
            }
          }}
        ></button>
      )}
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar
          alt={'user-avatar'}
          // src={avatarByGender({ avatar: null, gender: 'male' })}
          id="img-preview"
        />
        <div className="user__info">
          <span className="title">Welcome</span>
          <span className="subtitle">saadseif304@gmail.com</span>
        </div>
        <div className="icon-holder">
          <KeyboardArrowDown />
        </div>
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              marginTop: '12px',
            }}
          >
            <Paper style={{ marginRight: '0.2rem' }}>
              <ClickAwayListener onClickAway={() => handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose} component={Link} to="/profile">
                    <ActionLink
                      label="Mon profil"
                      icon={<CgProfile fontSize="1.2rem" />}
                      className="text-muted full-width"
                      url="/profile"
                    />
                  </MenuItem>
                  <MenuItem onClick={() => handleLogout()} component={Link} to="/login">
                    <ActionLink
                      label="Déconnecter"
                      icon={<MdLogout />}
                      className="text-muted full-width"
                      url="/login"
                    />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};


export default MenuDropdown;
