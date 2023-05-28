import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import "./Archive.css";
import { useParams ,Link} from 'react-router-dom';
import {LeftCircleOutlined} from "@ant-design/icons";
const VISIBLE_FIELDS = ['_id','name', 'clientName', 'budge', 'createdAt','updatedAt'];

export default function DisableActionButtonsDataGridPro() {
  const [data, setData] = useState([]);
 const {id}=useParams();
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
      <div className="Archive_title" style={{display:"flex",gap:"1rem"}}>
      <Link to={`/manager/${id}/archive`} className="link" >
          <LeftCircleOutlined className="returnBtn"/>
    </Link> 
    <p>Chat Archive</p>
    </div>
      <DataGridPro
        rows={data}
        columns={VISIBLE_FIELDS.map(field => ({ field, headerName: field.toUpperCase(), width: 150 }))}
        components={{ Toolbar: GridToolbar }}
        getRowId={getRowId}
        componentsProps={{
          filterPanel: {
            disableAddFilterButton: true,
            disableRemoveAllButton: true,
          },
        }}
      />
    </div>
  );
}
