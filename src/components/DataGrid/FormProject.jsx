import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./FormProject.css"
import axios from "axios";
import { useEffect,useState } from "react";
import {CheckCircleOutlined }from "@ant-design/icons";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'Name must not contain numbers')
    .required('Name is required'),
    budge: Yup.number().positive("Budget must be a positive number").required("Budget is required"),
    priority: Yup.string().oneOf(["low", "medium", "high"], "Invalid option").required("Required"),
    clientName: Yup.string().required("Required"),
  team: Yup.string().required("Please select a team"),
  description:Yup.string().required("Please describe the project"),

});

const Form = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      name: "",
      budge: "",
      clientName: "",
      priority: "",
      team: "",
      description:"",
    },
    validationSchema: validationSchema,
   
    onSubmit: (values, { resetForm }) => {
      const newProject = {
        name: values.name,
        budge: values.budge,
        clientName:values.clientName,
        priority: values.priority,
        team: values.team,
        description:values.description,
      };
      axios
      .post("http://localhost:2000/projects/addProject", newProject)
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2000/teams/')
      .then((Response) => {
        setData(Response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [data]);

  

  return (
    <form onSubmit={formik.handleSubmit}>
    <table>
  
  <tbody>
    <tr>
      <td>
      <div> 
        <label htmlFor="name">Name:</label>
        <input placeholder="Project Name" className="inputEmp" type="text" id="name" {...formik.getFieldProps("name")} />
      </div>
      </td>
      <td>
      <div>
        <label htmlFor="lastName">Budget:</label>
        <input placeholder="Project Budget" className="inputEmp" type="text" id="budge" {...formik.getFieldProps("budge")} />
      </div>
      </td>
    </tr>
    <tr>
      <td>
      {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </td>
      <td>
      {formik.touched.budge && formik.errors.budge ? (
          <div className="error">{formik.errors.budge}</div>
        ) : null}
      </td>
    </tr>
    <tr>
      <td>
      <div>
        <label htmlFor="clientName">Client Name :</label>
        <input className="inputEmp" placeholder="Client Name" type="text" id="clientName" {...formik.getFieldProps("clientName")} />
        
      </div>
      </td>
      <td>
      <div>
        <label htmlFor="priority">Priority:</label>
        <select className="inputEmp" id="priority" {...formik.getFieldProps("priority")}>
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      </td>
    </tr>
    <tr>
      <td>
      {formik.touched.clientName && formik.errors.clientName ? (
          <div className="error">{formik.errors.clientName}</div>
        ) : null}
      </td>
      <td>
      {formik.touched.priority && formik.errors.priority ? (
          <div className="error">{formik.errors.priority}</div>
        ) : null}
      </td>
    </tr>
    <tr>
      <td>
      <div>
        <label htmlFor="role">Team:</label>
        <select className="inputEmp" id="team" {...formik.getFieldProps("team")}>
  <option value="">Select Team</option>
  {data.map((team) => (
    <option key={team._id} value={team._id}>{team.name}</option>
  ))}
</select>
        
      </div>
      </td>
        <td>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea placeholder="Describe the project ..." className="inputEmp" id="description" {...formik.getFieldProps("description")} />
      </div>
      </td>
    </tr>
    
    <tr>
        <td>
        {formik.touched.team && formik.errors.team ? (
          <div className="error">{formik.errors.team}</div>
        ) : null}
        </td>
      <td>
      {formik.touched.description && formik.errors.description ? (
          <div className="error">{formik.errors.description}</div>
        ) : null}
      </td>
    </tr>
  </tbody>
</table>  
      <button className="addProject" type="submit">Submit</button>
      {updateSuccess && (
        <div className="pop">
          <CheckCircleOutlined className="valideIcon"/>&nbsp;&nbsp;
          <span className="popupText">Project Added Successfuly</span>
        </div>
      )}
    </form>
  );
};

export default Form;