import React from 'react'
import GetInTouch from '../components/GetInTouch';
import Center from '../components/Center';
import GetStarted from '../components/GetStarted';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
const Home = () => {
  return (
    <div className='allHome'>
    <Navbar />
    <Header />
    <Center/>
    <GetStarted />
    <GetInTouch />
    <Footer />
    </div>
  )
}

export default Home