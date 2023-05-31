import "./Table.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Drawer,Modal} from 'antd';
import {PlusCircleFilled} from "@ant-design/icons";
import Form from "./Form";
const Datatable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [teams, setTeams] = useState([]);
const {id}=useParams();
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
  }, [teams,data]);
  
  function getRowId(row) {
    return row._id;
  }  
  
  const userColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "profileImage",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        const { profileImage, name,lastName } = params.row;
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={profileImage} alt="avatar" />
            {name}&nbsp;{lastName}
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
        return <div>{team ? team.name : ""}</div>;
      },
    },
  ];
  
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/manager/${id}/users/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
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
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

  const showLargeDrawer = () => {
    setSize('large');
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleDelete = (selectedUser) => {
    setSelectedRowKeys([selectedUser]);
    setSelectedUser(selectedUser);
    setShowConfirmation(true);
  };
  const [showConfirmation, setShowConfirmation] = useState(false);

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:2000/users/deleteUser/${selectedUser}`)
      .then((response) => {
        setData(data.filter((user) => user._id !== selectedUser));
        setSelectedRowKeys(selectedRowKeys.filter((key) => key !== selectedUser));
        setShowConfirmation(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelDelete = () => {
    setSelectedRowKeys([]);
    setSelectedUser(null);
    setShowConfirmation(false);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Employee
        <button className="addEmp" onClick={showLargeDrawer}><PlusCircleFilled />&nbsp;&nbsp; Add Employee</button>
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
          <Drawer
        title={`Add Employee`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}

      >

        <Form/>
      </Drawer>
      <Modal
          title="Delete User"
          visible={showConfirmation}
          onOk={confirmDelete}
          onCancel={cancelDelete}
        >
          <p>Are you sure you want to delete this User?</p>
        </Modal>
    </div>
  );
};

export default Datatable;