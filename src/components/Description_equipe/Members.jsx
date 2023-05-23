import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircleFilled, LeftCircleOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { Avatar, List,Modal } from "antd";
import "./Members.css";
import { Drawer } from "antd";
import Form from "./Form";
import { Select } from "antd";

const Team = () => {
  const { teamId } = useParams();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {id}=useParams();
  useEffect(() => {
    if (teamId) {
      axios
        .get(`http://localhost:2000/teams/${teamId}/members`)
        .then((response) => {
          setTeam(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      console.log("Team not found");
    }
  }, [team]);

  const showLargeDrawer = () => {
    setSize("default");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleChange = (memberId, selectedRole) => {
    axios
      .put(`http://localhost:2000/teams/${teamId}/members/${memberId}`, {
        role: selectedRole,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [memberToDelete, setMemberToDelete] = useState(null);

  const handleDelete = (memberId) => {
    setMemberToDelete(memberId);
    setShowConfirmation(true);

  };
  
  const confirmDelete = () => {
    // Call API to delete the member with memberToDelete ID
    console.log(memberToDelete);
    axios.delete(`http://localhost:2000/teams/${teamId}/members/${memberToDelete}`)
      .then((response) => {
        // Remove deleted member from team.members state
        const updatedMembers = team.members.filter((item) => item._id !== memberToDelete);
        setTeam({ ...team, members: updatedMembers });
        setShowConfirmation(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const cancelDelete = () => {
    setMemberToDelete(null);
    setShowConfirmation(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div>
      <List className="list01"
        header={
          <div className="TeamMembers">
            <div>
              <Link to={`/manager/${id}/nav5/`} className="link">
                <LeftCircleOutlined className="returnBtn" />
              </Link>
              &nbsp; Team Members
            </div>
            <button className="addEmp" onClick={showLargeDrawer}>
              <PlusCircleFilled />
              &nbsp;&nbsp; Add Member
            </button>
          </div>
        }
        itemLayout="horizontal"
        dataSource={team.members.filter((item) => item._id !== selectedMemberId)}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Select
                labelInValue
                defaultValue={{
                  value: item.role,
                  label: item.role,
                }}
                style={{
                  width: 120,      
                }}
                onChange={(value) =>
                  handleChange(item._id, value.value)
                }
                options={[
                  {
                    value: "employee",
                    label: "Employee",
                  },
                  {
                    value: "owner",
                    label: "Owner",
                  },
                ]}

              />,
              <button className="Button2" onClick={() => handleDelete(item._id)}>Delete</button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.profileImage} />}
              title={<h1>{item.name}</h1>}
              description={item.email}
            />
          </List.Item>
        )}
      />
     <Modal
  title="Delete Member"
  visible={showConfirmation}
  onOk={confirmDelete}
  onCancel={cancelDelete}
>
  <p>Are you sure you want to delete this member?</p>
</Modal>
      <Drawer
        title="Add Member"
        placement="right"
        size={size}
        onClose={onClose}
        visible={open}
      >
        <Form />
      </Drawer>
    </div>
  );
};

export default Team;
