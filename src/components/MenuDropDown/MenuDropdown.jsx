import React, { useEffect, useRef, useState} from 'react';
import { Link, useNavigate,useParams} from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import {UserOutlined}from '@ant-design/icons';
import { Modal } from 'antd';
import Profil from "./Profil";
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
import axios from 'axios';
const MenuDropdown = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [userInfo, setUserInfo] = useState(null);

  const [open0, setOpen0] = useState(false);

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
  useEffect(() => {
    // make API request to fetch user info
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/users/${id}`); // assuming your API endpoint is /api/users/:id
        setUserInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfo();
  }, [userInfo]);

  const handleLogout = async () => {
    try {
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
      <Button className='btnuser'
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        
        {userInfo ? (
          <>
          <Avatar
          alt={'user-avatar'}
          id={userInfo.profileImage}
          src={userInfo.profileImage}
        />
          <div className="user__info">
            <span className="title">{userInfo.name}</span>
            <span className="subtitle">{userInfo.role}</span>
          </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
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
              <Button onClick={() => setOpen0(true)} className='btnP' style={{paddingLeft:20,fontWeight:500,fontSize:18,color:'#363636',textTransform:'none'}}>
                <UserOutlined />&nbsp;&nbsp; Profile &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Button>
                <Modal
                  title="Profile"
                  centered
                  open={open0}
                  onCancel={() => setOpen0(false)}
                  width={700}
                  footer={null}
                >
                  <Profil/>
                </Modal>
                  <MenuItem  component={Link} to="/login">
                    <ActionLink
                      label="Log Out"
                      style={{color:"black"}}
                      icon={<MdLogout />}
                      className="text-muted full-width"
                      url="/login"
                      onClick={() => handleLogout()}
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
