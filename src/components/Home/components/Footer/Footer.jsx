import React from 'react'
import img from "../../tasksp.png";

import {RightCircleOutlined,PhoneOutlined,EnvironmentOutlined,GoogleOutlined,CopyrightOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';
const Footer = () => {

 
  return (
    
   <div style={{display:"flex",gap:"12rem",backgroundColor:"#2c1de0",paddingLeft:"7rem",paddingTop:"3rem",paddingBottom:"3rem",marginTop:"-10px"}} >
    <div>
<img src={img} style={{width:120,paddingBottom:10}}/>
<p style={{color:"#bdd5f4"}}><CopyrightOutlined />&nbsp;2023 Task Wave. All rights reserved</p>
    </div>
    <div>
<p style={{color:"#bdd5f4",fontWeight:700,paddingBottom:10}}>Links</p>
<Link to={`/`} style={{color:"#bdd5f4",paddingBottom:5,textDecoration:"none",display:"flex"}}>
<RightCircleOutlined /> &nbsp;&nbsp;<p>Home</p>
           </Link>
           <Link to={`/login`} style={{color:"#bdd5f4",paddingBottom:5,textDecoration:"none",display:"flex"}}>
<RightCircleOutlined /> &nbsp;&nbsp;<p>Log in</p>
           </Link>    </div>
    <div>
<p style={{color:"#bdd5f4",fontWeight:700,paddingBottom:10}}>About Us </p>
<p style={{color:"#bdd5f4",paddingBottom:5}}><PhoneOutlined />&nbsp;&nbsp;+216 22 359 166</p>
<p style={{color:"#bdd5f4",paddingBottom:5}}><EnvironmentOutlined />&nbsp;&nbsp;Tunisie, Sousse, Sahloul</p>
<p style={{color:"#bdd5f4"}}><GoogleOutlined />&nbsp;&nbsp;chaima.saad.2202@gmail.com</p>
    </div>

   </div>
  )
}

export default Footer