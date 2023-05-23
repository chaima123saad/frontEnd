import React, { useState,useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./TeamForm.css";
import axios from "axios";
import { CheckCircleOutlined } from "@ant-design/icons";
import { AutoComplete, Button, List, Typography } from "antd";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required"),
});

const Form = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
const [userIds, setUserIds] = useState([]);
const [userNames, setUserNames] = useState([]);
const [empOptions, setEmpOptions] = useState([]);
  
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values, { resetForm }) => {
      const newTeam = {
        name: values.name,
        members: userIds, 
      };
      axios
        .post("http://localhost:2000/teams/addTeam", newTeam)
        .then((response) => {
          console.log(response.data);
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



  const handleAddUser = () => {
    if (userInput.trim() !== "") {
      const selectedUser = empOptions.find((user) => user.value === userInput);
      if (selectedUser) {
        setUserIds([...userIds, selectedUser.id]);
        setUserNames([...userNames, userInput]);
        setEmpOptions(empOptions.filter((user) => user.value !== userInput));
        setUserInput("");
      }
    }
  };
  
  const handleRemoveUser = (index) => {
    const updatedUserIds = [...userIds];
    const updatedUserNames = [...userNames];
    const removedUserId = updatedUserIds[index];
    const removedUserName = updatedUserNames[index];
    updatedUserIds.splice(index, 1);
    updatedUserNames.splice(index, 1);
    setUserIds(updatedUserIds);
    setUserNames(updatedUserNames);
    setEmpOptions([...empOptions, { value: removedUserName, id: removedUserId }]);
  };
  
 


  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:2000/users/")
      .then((response) => {
        setEmpOptions(
          response.data.map((user) => ({
            value: user.name + " " + user.lastName,
            id: user._id,
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <div>
                <label htmlFor="name">Team Name</label>
                <input
                  className="inputTeam"
                  type="text"
                  id="name"
                  {...formik.getFieldProps("name")}
                />
              </div>
            </td>
            </tr>
          <tr>
            <td>
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <div>
          <label htmlFor="name">Members</label>
          <div className="inputMember">
            <AutoComplete
             style={{
              width: 300,
            }}
              options={empOptions}
              placeholder="Type an employee"
              size="large"
              filterOption={(inputValue, option) =>
                option.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
              onChange={(value) => setUserInput(value)}
              value={userInput}
              
            />
            <Button size="large" type="primary" onClick={handleAddUser}>
              Add
            </Button>
          </div>
        </div>
        <List
          dataSource={userNames}
          renderItem={(user, index) => (
            <List.Item
              actions={[
                <Button onClick={() => handleRemoveUser(index)}>Cancel</Button>,
              ]}
            >
              <Typography.Text>{user}</Typography.Text>
            </List.Item>
          )}
        />
      </div>

      <button className="addUser" type="submit">
        Submit
      </button>
      {updateSuccess && (
        <div className="pop">
          <CheckCircleOutlined className="valideIcon" />
          &nbsp;&nbsp;
          <span className="popupText">Team Added Successfully</span>
        </div>
      )}
    </form>
  );
};

export default Form;
