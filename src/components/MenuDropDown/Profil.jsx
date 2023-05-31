import React, { useState } from 'react';
import axios from 'axios';
import "./Profil.css";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
function ProfilePage() {
  const [state, setState] = useState({
    name: '',
    lastName: '',
    speciality: '',
    profilePic: 'https://via.placeholder.com/150',
    adress:'',
    numero:'',
  });

  const [image, setImage] = useState('https://via.placeholder.com/150');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [speciality, setSpecialite] = useState('');
  const [adress, setAdress] = useState('');
  const [numero, setNumero] = useState('');
  const {id}=useParams();
  useEffect(() => {
    axios.get(`http://localhost:2000/users/${id}`)
      .then((response) => {
        const userData = response.data;
        setState(userData);
        setName(userData.name);
        setLastName(userData.lastName);
        setSpecialite(userData.speciality);
        setAdress(userData.adress);
        setNumero(userData.numero);
        // Update the profile picture if available
        if (userData.profileImage) {
          setImage(userData.profileImage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);
    console.log("image data :",formData);

    axios.put(`http://localhost:2000/users/${id}`, formData)
      .then((response) => {
        setImage(response.data.profileImage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageDelete = () => {
    setImage('https://via.placeholder.com/150');
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSpecialiteChange = (event) => {
    setSpecialite(event.target.value);
  };

  const handleAdressChange = (event) => {
    setAdress(event.target.value);
  };
  const handleNumeroChange = (event) => {
    setNumero(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      name: name,
      lastName: lastName,
      speciality: speciality,
      adress:adress,
      numero:numero
    };

    axios.put(`http://localhost:2000/users/updateUser/${id}`, userData)
      .then((response) => {
        setState({
          ...state,
          name: name, 
          lastName: lastName,
          speciality: speciality,
          adress:adress,
          numero:numero
        });
        console.log('User updated successfully');

      })
      .catch((error) => {
        console.log(error);
      });

    setName('');
    setLastName('');
    setSpecialite('');
    setAdress('');
    setNumero('');

  };

  return (
    <div className='allProfil'>
      <div className='imgprofil'>
        <div className='containerAll'>
        <p className='th1'>Your profile picture</p>
          <div className="image-container">
            {image ? (
             
              <img src={image} alt="Profile" className="profile-pic" />
              
            ) : (
              <img src='https://via.placeholder.com/150' alt="Profile" className="profile-pic" />
            )}
            <div className="buttons_container">
              <div className="file-upload">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="file-input"
                />
                <span className="bt1">Change Picture</span>
              </div>
              {image && (
                <button className="b2" onClick={handleImageDelete}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <p className='tp1'>Add your photo. The recommended size is 256x256px.</p>
        </div>
        <form onSubmit={handleSubmit} className='form1'>
          <label>
            First Name:
            <input
              type="text"
              className='profilInput'
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              className='profilInput'
              value={lastName}
              onChange={handleLastNameChange}
            />
          </label>
          <label>
            Speciality:
            <input
              type="text"
              className='profilInput'
              value={
                speciality
                }
              onChange={handleSpecialiteChange}
            />
          </label>
          <label>
            Adress:
            <input
              type="text"
              className='profilInput'
              value={adress}
              onChange={handleAdressChange}
            />
          </label>
          <label>
            Phone number:
            <input
              type="text"
              className='profilInput'
              value={numero}
              onChange={handleNumeroChange}
            />
          </label>
          <button type="submit" className='bouttt'>Modify</button>
        </form>
      </div>
      </div>
    );
  }
  export default ProfilePage;
  