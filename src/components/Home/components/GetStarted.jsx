import React from 'react';
import {
  Box,
  Grid,
  styled,
  Typography
} from '@mui/material';
import imgDetail from '../assets/5385938.png';
import imgDetail2 from '../assets/image123.png';
import "./GetStarted.css";

const GetStarted = () => {

  const CustomGridItem = styled(Grid) ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  });
  


  return (
    <Grid 
      container 
      spacing={{ xs: 4, sm: 4, md: 0 }}   
      sx={{
        px: 10,
        py:10
      }}
    >
      <Grid item xs={12} sm={4} md={6}>
        <img 
          src={imgDetail2} 
          alt=""
          style={{
            width: '80%',
          }}
        />
      </Grid>
      <CustomGridItem 
        item xs={12} sm={8} md={6}
        sx={{
          order: {xs: 2, sm: 2, md: 1}
        }}
    
      >
        <Box 
          component='article' 
          style={{ 
            width: "80%",
          }}
        >
          <div className="choose__content">
            <div className="bar_"></div>
            <p className='connecter'>Se connecter avec</p>
            <h2 style={{fontSize:40,fontFamily:"sans-serif"}}> L'équipe</h2>
            <p>
              Les membres de l'équipe peuvent communiquer rapidement pour résoudre les problèmes de code,
              discuter des fonctionnalités et des améliorations à apporter, et partager des idées.
              Cela permet d'éviter les retards dans le projet et de garantir que tout le monde travaille dans la même direction
            </p>
          </div> 
        </Box>
      </CustomGridItem>
      <CustomGridItem 
        item xs={12} sm={8} md={6}
        sx={{
          order: {xs: 1, sm: 1, md: 2}
        }}
        style={{
            paddingTop:100
          }}
      >
        <Box 
          component='article'
          sx={{
            px: 4,
          }}
          style={{ 
            width: "80%",
          }}
        >
          <div className="about__content">
              <div className="bar_"></div>
              <p className='connecter'>Des projets qui </p>
              <h2>Fonctionnent</h2>
              <p>
              Que vous gériez votre prochain grand projet ou que vous numérisiez la gestion des tâches pour les activités quotidiennes de vos équipes,
               vous devez savoir qui fait quoi et quand. Notre application Web vous aide à gérer les tâches dans un bel environnement 
               personnalisable qui s'adapte parfaitement à vos besoins.
              </p>
              </div>
        </Box>
      </CustomGridItem>
      <Grid item xs={12} sm={12} md={6}
        sx={{
          order: {xs: 3, sm: 3, md: 3}
        }}
        style={{
            paddingTop:100
          }}
      >
        <img 
          src={imgDetail} 
          alt=""
          style={{
            width: '80%',
          }}
        />
      </Grid>
      </Grid>
  )}
  export default GetStarted;
