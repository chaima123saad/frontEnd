import React from 'react'
import { Box, Button, styled, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import "./Header.css";
import headerImg from '../assets/3685115.png';

const Header = () => {

    const CustomBox = styled(Box) (({ theme }) => ({
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        // tamanhos
        gap: theme.spacing(2),
        paddingTop: theme.spacing(10),
        // cor de fundo
        backgroundColor: 'white',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        }
    }));

    const BoxText = styled(Box) (({ theme }) => ({
        flex: '1',
        paddingLeft: theme.spacing(8),
        [theme.breakpoints.down('md')]: {
            flex: '2',
            textAlign: 'center',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    }));


  return  (
        <CustomBox component='header'>
            {/*  Box text  */}
            <BoxText 
            component='section'
            >
                <Typography
                >
            <div className='hero__content'>
            <h2 className="hero__title">
            Effortlessly Manage  <br/><span className="title_">Your</span> Busy  <span className="title_">Workday</span>
              </h2>
                
              <p className="text1">
              Manage your work, deadlines, and team, all in one web 
              <br/>application. Set and track schedules,validate tasks,and  <br/>
                keep your project under control.
              </p>
            </div>
            <div className="login_">
              <button className="btn_">S'identifier</button>
            </div>
                </Typography>

            </BoxText>

            <Box sx={theme => ({
                [theme.breakpoints.down('md')]:{
                    flex: '1',
                    paddingTop: '10px',
                    alignSelf: 'center',
                },
                [theme.breakpoints.up('md')]:{
                    flex: '2',
                    alignSelf: 'flex-end',
                },
            })}
            >
                <img
                src={headerImg}
                alt="headerImg"
                style={{ 
                    width: "80%", 
                    marginTop: -50,
                }}
                />
            </Box>

        </CustomBox>
    )
}

export default Header