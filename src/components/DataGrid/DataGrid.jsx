import "./DataGrid.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Datatable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:2000/projects/'),
      axios.get('http://localhost:2000/teams')
    ])
    .then(([usersResponse, teamsResponse]) => {
      setData(usersResponse.data);
      setTeams(teamsResponse.data);
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });
  }, []);
  
  function getRowId(row) {
    return row._id;
  }
  const handleDelete = (projectId) => {
    axios.delete(`http://localhost:2000/projects/deleteProject/${projectId}`)
      .then(response => {
        setData(data.filter(project => project._id !== projectId));
        setSelectedRowKeys(selectedRowKeys.filter(key => key !== projectId));
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  
  const userColumns = [
    { field: "_id",
     headerName: "ID",
     width: 100 },
    {
      field: "name",
      headerName: "Project",
      width: 130,
    },
    {
      field: "team",
      headerName: "Team",
      width: 130,
      renderCell: (params) => {
        const team = teams.find((t) => t._id === params.row.team);
        return (
          <div className={`cellWithStatus ${team.name}`}>
            {team.name}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "clientName",
      headerName: "Client",
      width: 150,
    },
    {
      field: "budge",
      headerName: "Budge",
      width: 150,
    },
  ];
  
  const actionColumn = [
    // your existing columns
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            
              <div className="viewButton">View</div>
            
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Project
        <Link to="/projects/new" className="link">
          Add New Project
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={[...userColumns,...actionColumn]}
        getRowId={getRowId}
        pageSize={7}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;