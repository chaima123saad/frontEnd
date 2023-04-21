import React from 'react';
import "./userInfo.css";

const User = (props) => {
  const { user } = props;

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, lastName, email,_id,team,profileImage,genre,role,numero,adress } = user;
  return (
    <div className='all-info'>
      <div className='image'>
      <img src={profileImage} />
      </div>
      <div className='info'>
        <p className='user_name'>{name} {lastName}</p>
        <p className='user_id'>#{_id}</p>
        <div className='info-'>
        <div  className='info__'>
        <p>Email :</p>
        <p>Genre :</p>
        <p>Adress :</p>
        <p>Team :</p>
        <p>Role :</p>
        <p>Numero :</p>
        </div>
        <div>
        <p>{email}</p>
        <p>{genre}</p>
        <p>{adress}</p>
        <p>{team}</p>
        <p>{role}</p>
        <p>{numero}</p>
        </div>
        </div>
      </div>
    </div>
	
  );
};

export default User;


