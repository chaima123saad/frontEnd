import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import img from './hellofinal.png';
import logo from './tasksp.png';
import "./hm.css";
import Footer from "./components/Footer/Footer";
function Home() {
  const [navbarBg, setNavbarBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const showBg = window.scrollY > 0;
      setNavbarBg(showBg);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div className={navbarBg ? 'navbar navbar-blue' : 'navbar'}>
        <div className="logo">
          <img src={logo} alt="Logo" style={{ width: "10rem" }} />
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
      <img src={img} alt="Background" style={{ height: '115vh', width: '100%' }} />
      <div style={{ position: 'absolute', top: '40%', left: '30%', transform: 'translate(-50%, -50%)' }}>
        <h1 style={{ color: 'white', fontSize: '3rem' }}>
          Effortlessly Manage <br />
          <span className="title_">Your</span> Busy <span className="title_">Workday</span>
        </h1>
        <p style={{ color: 'white', fontSize: '1.2rem', paddingTop: "1rem" }}>
          Manage your work, deadlines, and team, all in one <br/>web application.
          Set and track schedules, validate tasks,<br/> and keep your project under control.
        </p>
        <div>
          <Link to={`/login`} style={{ textDecoration: "none" }}>
            <button className='logBtn'>Log In</button>
          </Link>
        </div>
      </div>
    
      <Footer/>
    </div>
  );
}

export default Home;
