import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import "./Archive.css";
import { useParams, Link } from 'react-router-dom';
import { LeftCircleOutlined,SearchOutlined } from "@ant-design/icons";
const VISIBLE_FIELDS = ['_id', 'name', 'lastName', 'email', 'speciality', 'deletedAt', 'birthDate', 'numero', 'genre', 'adress'];

export default function DisableActionButtonsDataGridPro() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:2000/archives/6477197548c3cdc619664cbc')
      .then(response => {
        setData(response.data.deletedUsers);
        setFilteredData(response.data.deletedUsers);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    filterData();
  }, [searchValue]);

  function getRowId(row) {
    return row._id;
  }

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  function filterData() {
    const filtered = data.filter(item =>
      VISIBLE_FIELDS.some(field =>
        item[field] && item[field].toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }

  return (
    <div style={{ height: 550, width: '100%' }} className='datatable'>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <div className="Archive_title" style={{ display: "flex", gap: "1rem" }}>
        <Link to={`/manager/${id}/archive`} className="link" >
          <LeftCircleOutlined className="returnBtn" />
        </Link>
        <p>Employee Archive</p>
        </div>
        <div className="search-container">
          <div style={{display:"flex"}}>
        <SearchOutlined className='searchicon' />
        <input className='zonesearch' style={{marginTop:"10px",width:"20rem",borderRadius:"10px",height:"2.2rem",paddingLeft:"25px"}} type="text" value={searchValue} onChange={handleSearchChange} placeholder="Search..." />
        </div>
        </div>
        </div>
      
      <DataGridPro
        rows={filteredData}
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
