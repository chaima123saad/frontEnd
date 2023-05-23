import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { CheckCircleOutlined } from "@ant-design/icons";
import { AutoComplete, Select } from "antd";
import "./memberForm.css";
import { useParams } from "react-router-dom";

const { Option } = Select;

const FormMember = () => {
  const { teamId } = useParams();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [teamData, setTeamData] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      role: "",
    },
    onSubmit: (values, { resetForm }) => {
    const selectedUser = data.find(user => user.name + " " + user.lastName === values.name);
      const newMember = {
        userId: selectedUser._id,
        role: values.role,
      };
      axios
        .put(`http://localhost:2000/teams/${teamId}/addMemberToTeam`, newMember)
        .then((response) => {
          setUpdateSuccess(true);
          setTimeout(() => {
            setUpdateSuccess(false);
          }, 2000);
          resetForm();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:2000/users/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [data]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="label">Member Name</p>
      <AutoComplete
        style={{
          width: 300,
        }}
        options={data.map((user) => ({
          value: user.name + " " + user.lastName,
        }))}
        placeholder="Type an employee"
        size="large"
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={(value) => formik.setFieldValue("name", value)}
        value={formik.values.name}
      />
      <p className="label" style={{ paddingTop: 20 }}>
        Role
      </p>
      <Select
        placeholder="Select a role"
        style={{
          width: 300,
        }}
        onChange={(value) => formik.setFieldValue("role", value)}
        size="large"
        allowClear
        value={formik.values.role}
      >
        <Option value="employee">Employee</Option>
        <Option value="owner">Owner</Option>
      </Select>

      <button className="addMember" type="submit">
        Submit
      </button>
      {updateSuccess && (
        <div className="pop">
          <CheckCircleOutlined className="valideIcon" />
          &nbsp;&nbsp;
          <span className="popupText">Member Added Successfully</span>
        </div>
      )}
    </form>
  );
};

export default FormMember;
