import "./Table.css";
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
      axios.get('http://localhost:2000/users/'),
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
  const handleDelete = (userId) => {
    console.log(userId);
    axios.delete(`http://localhost:2000/users/deleteUser/${userId}`)
      .then(response => {
        setData(data.filter(user => user._id !== userId));
        setSelectedRowKeys(selectedRowKeys.filter(key => key !== userId));
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  
  const userColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "profileImage",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        const { profileImage, name } = params.row;
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={profileImage} alt="avatar" />
            {name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
    },
    {
      field: "team",
      headerName: "Team",
      width: 160,
      renderCell: (params) => {
        const team = teams.find((t) => t._id === params.row.team);
        return (
          <div className={`cellWithStatus ${team.name}`}>
            {team.name}
          </div>
        );
      },
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
            <Link
              to={`/users/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
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
        Employee
        <Link to="/users/new" className="link">
          Add New Employee
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={[...userColumns, ...actionColumn]}
        getRowId={getRowId}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;