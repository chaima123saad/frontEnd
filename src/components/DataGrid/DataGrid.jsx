import "./DataGrid.css";
import { DataGrid } from "@mui/x-data-grid";
import { Drawer, Modal } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import FormProject from "./FormProject";
import { useParams,Link } from "react-router-dom";

const Datatable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {id}=useParams();
  useEffect(() => {
    Promise.all([axios.get("http://localhost:2000/projects/"), axios.get("http://localhost:2000/teams")])
      .then(([usersResponse, teamsResponse]) => {
        setData(usersResponse.data);
        setTeams(teamsResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  function getRowId(row) {
    return row._id;
  }

  const handleDelete = (projectId) => {
    setSelectedRowKeys([projectId]);
    setProjectId(projectId);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:2000/projects/deleteProject/${projectId}`)
      .then((response) => {
        setData(data.filter((project) => project._id !== projectId));
        setSelectedRowKeys(selectedRowKeys.filter((key) => key !== projectId));
        setShowConfirmation(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelDelete = () => {
    setSelectedRowKeys([]);
    setProjectId(null);
    setShowConfirmation(false);
  };

  const userColumns = [
    { field: "_id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Project", width: 130 },
    {
      field: "team",
      headerName: "Team",
      width: 130,
      renderCell: (params) => {
        const team = teams.find((t) => t._id === params.row.team);
        return <div>{team ? team.name : ""}</div>;
      },
    },
    { field: "status", headerName: "Status", width: 150 },
    { field: "clientName", headerName: "Client", width: 150 },
    { field: "budge", headerName: "Budge", width: 150 },
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
              to={`/manager/${id}/projects/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

  const showDefaultDrawer = () => {
    setSize("default");
    setOpen(true);
  };

  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Project
        <button className="addEmp" onClick={showLargeDrawer}> Add Project</button>
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
      <Modal
          title="Delete Project"
          visible={showConfirmation}
          onOk={confirmDelete}
          onCancel={cancelDelete}
        >
          <p>Are you sure you want to delete this project?</p>
        </Modal>
      <Drawer
        title={`Add Project`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}

      >
        <FormProject/>
      </Drawer>
    </div>
  );
};

export default Datatable;