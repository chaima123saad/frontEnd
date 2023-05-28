import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import "./Archive.css";
import img1 from "./folder.png";
import { useParams ,Link} from 'react-router-dom';


const VISIBLE_FIELDS = ['_id','name', 'clientName', 'budge', 'createdAt','updatedAt'];

export default function DisableActionButtonsDataGridPro() {
  const [data, setData] = useState([]);
const {id} = useParams();
  useEffect(() => {
    axios.get('http://localhost:2000/projects/projects/completed')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  function getRowId(row) {
    return row._id;
  }
  return (
    <div style={{ height: 400, width: '100%' }} className='datatable'>
      <div className="Archive_title">
        Explore Archive
      </div>
      <div style={{paddingTop:20}}>
        <div style={{display:"flex",gap:"1rem"}}>

        <Link to={`/manager/${id}/archive/projects`} className='box' style={{display:"flex",gap:"7rem",paddingLeft:20}}> 
          <img src={img1} style={{width:"60px",height:"60px",borderRadius:"10px"}}/>
          <p >Projects Archive</p>
        </Link>

        <Link to={`/manager/${id}/archive/employee`} className='box' style={{display:"flex",gap:"7rem",paddingLeft:20}}> 
        <img src={img1} style={{width:"60px",height:"60px",borderRadius:"10px"}}/>
          <p>Employee Archive</p>
        </Link>
        
        </div>
        <br/>
        <div style={{display:"flex",gap:"1rem"}}>

        <Link to={`/manager/${id}/archive/team`} className='box' style={{display:"flex",gap:"7rem",paddingLeft:20}}> 
        <img src={img1} style={{width:"60px",height:"60px",borderRadius:"10px"}}/>
        <p>Team Archive</p>
        </Link>

        <Link to={`/manager/${id}/archive/chat`} className='box' style={{display:"flex",gap:"7rem",paddingLeft:20}}> 
        <img src={img1} style={{width:"60px",height:"60px",borderRadius:"10px"}}/>
        <p>Chat Archive</p>  
        </Link>

        </div>
      </div>
      
    </div>
  );
}

