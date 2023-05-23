import "./Desp_e.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./TeamForm";
import { Drawer, Modal } from 'antd';
import { PlusCircleFilled } from "@ant-design/icons";

const Datatable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [teamId, setTeamId] = useState(null);
const {id} =useParams();
  useEffect(() => {
    axios.get('http://localhost:2000/teams/')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (teamId) => {
    setSelectedRowKeys([teamId]);
    setShowConfirmation(true);
    setTeamId(teamId);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:2000/teams/deleteTeam/${teamId}`)
      .then((response) => {
        setData(data.filter(team => team._id !== teamId));
        setSelectedRowKeys(selectedRowKeys.filter(key => key !== teamId));
        setShowConfirmation(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelDelete = () => {
    setSelectedRowKeys([]);
    setShowConfirmation(false);
    setTeamId(null);
  };

  const userColumns = [
    {
      field: "_id",
      headerName: "ID",
      width: 260
    },
    {
      field: "name",
      headerName: "Team",
      width: 160
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 250
    }
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/manager/${id}/nav5/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="membersButton">Members</div>
            </Link>
            <Link
              to={`/manager/${id}/nav5/edit/${params.row._id}`}
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
      }
    }
  ];

  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

  const showLargeDrawer = () => {
    setSize('default');
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Team
        <button className="addEmp" onClick={showLargeDrawer}><PlusCircleFilled />&nbsp;&nbsp; Add Team</button>

      </div>
      {data && data.length > 0 ? (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={[...userColumns, ...actionColumn]}
          getRowId={(row) => row._id}
          pageSize={7}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
        
      ) : (
        <p>No data available</p>
      )}
       <Modal
          title="Delete Team"
          visible={showConfirmation}
          onOk={confirmDelete}
          onCancel={cancelDelete}
        >
          <p>Are you sure you want to delete this team?</p>
        </Modal>
       <Drawer
        title={`Add Team`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}

      >

        <Form/>
      </Drawer>
    </div>
  );
};

export default Datatable;
