import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Form.css"
import axios from "axios";
import { useEffect,useState } from "react";
import {CheckCircleOutlined }from "@ant-design/icons";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'Name must not contain numbers')
    .required('Name is required'),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  numero: Yup.number().max(99999999, "please enter a rigth phone number").required("Required"),
  genre: Yup.string().oneOf(["Homme", "Femme"], "Invalid option").required("Required"),
  role: Yup.string().oneOf(["manager", "employee", "owner"], "Invalid option").required("Required"),
  birthDate: Yup.date().required("Required"),
  adress:Yup.string().required("Adress required"),
  speciality: Yup.string().required("Required"),
  team: Yup.string().required("Please select a team"),
});

const Form = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      numero: "",
      birthDate: "",
      speciality: "",
      adress:"",
      genre: "",
      role: "",
      team:"",
    },
    validationSchema: validationSchema,
   
    onSubmit: (values, { resetForm }) => {
      const newUser = {
        name: values.name,
        lastName: values.lastName,
        email: values.email,
        numero: values.numero,
        birthDate: values.birthDate,
        speciality: values.speciality,
        genre: values.genre,
        adress: values.adress,
        role: values.role,
        team: values.team
      };
      axios.post("http://localhost:2000/users/addUser", newUser)
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
  }, []);

  

  return (
    <form onSubmit={formik.handleSubmit}>
    <table>
  
  <tbody>
    <tr>
      <td>
      <div> 
        <label htmlFor="name">Name:</label>
        <input className="inputEmp" type="text" id="name" {...formik.getFieldProps("name")} />
       
      </div>
      </td>
      <td>
      <div className="phone">
        <label htmlFor="lastName">Last Name:</label>
        <input className="inputEmp" type="text" id="lastName" {...formik.getFieldProps("lastName")} />
       
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
      {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error">{formik.errors.lastName}</div>
        ) : null}
      </td>
    </tr>
    <tr>
      <td>
      <div>
        <label htmlFor="speciality">Speciality:</label>
        <input className="inputEmp" type="text" id="speciality" {...formik.getFieldProps("speciality")} />
        
      </div>
      </td>
      <td>
      <div >
        <label htmlFor="email">Email:</label>
        <input className="inputEmp" type="text" id="email" {...formik.getFieldProps("email")} />
        
      </div>
      </td>
    </tr>
    <tr>
      <td>
      {formik.touched.speciality && formik.errors.speciality ? (
          <div className="error">{formik.errors.speciality}</div>
        ) : null}
      </td>
      <td>
      {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </td>
    </tr>
    <tr>
      <td>
      <div className="phone">
        <label htmlFor="numero">Phone Number:</label>
        <input className="inputEmp" type="number" id="numero" {...formik.getFieldProps("numero")} />
        
      </div>
      </td>
      <td>
      <div>
        <label htmlFor="role">Role:</label>
        <select className="inputEmp" id="role" {...formik.getFieldProps("role")}>
          <option value="">Select an option</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
          <option value="owner">Owner</option>
        </select>
       
      </div>
      </td>
    </tr>
    <tr>
      <td>
      {formik.touched.numero && formik.errors.numero ? (
          <div className="error">{formik.errors.numero}</div>
        ) : null}
      </td>
      <td>
      {formik.touched.role && formik.errors.role ? (
          <div className="error">{formik.errors.role}</div>
        ) : null}
      </td>
    </tr>
    <tr>
      <td>
      <div>
        <label htmlFor="genre">Genre:</label>
        <select className="inputEmp" id="genre" {...formik.getFieldProps("genre")}>
          <option value="">Select an option</option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
        </select>
      </div>
      </td>
      <td>
      <div>
        <label htmlFor="birthDate">Birth Date:</label>
        <input className="inputEmp" type="date" id="birthDate" {...formik.getFieldProps("birthDate")} />
        
      </div>
      </td>
    </tr>
    <tr>
      <td>
      {formik.touched.role && formik.errors.role ? (
          <div className="error">{formik.errors.role}</div>
        ) : null}
      </td>
      <td>
      {formik.touched.birthDate && formik.errors.birthDate ? (
          <div className="error">{formik.errors.birthDate}</div>
        ) : null}
      </td>
    </tr>
    <tr>
      <td>
      <div>
        <label htmlFor="role">Team:</label>
        <select className="inputEmp" id="team" {...formik.getFieldProps("team")}>
          <option value="">Select an option</option>
          {data.map((team) => (
            <option key={team._id} value={team._id}>{team.name}</option>
          ))}
        </select>
        
      </div>
      </td>
      <td>
      <div>
        <label htmlFor="speciality">Adress:</label>
        <input className="inputEmp" type="text" id="adress" {...formik.getFieldProps("adress")} />
       
      </div>
      </td>
    </tr>
    <tr>
      <td>
      {formik.touched.role && formik.errors.role ? (
          <div className="error">{formik.errors.role}</div>
        ) : null}
      </td>
      <td>
      {formik.touched.speciality && formik.errors.adress ? (
          <div className="error">{formik.errors.adress}</div>
        ) : null}
      </td>
    </tr>
  </tbody>
</table>  
      <button className="addEmpl" type="submit">Submit</button>
      {updateSuccess && (
        <div className="pop">
          <CheckCircleOutlined className="valideIcon"/>&nbsp;&nbsp;
          <span className="popupText">User Successfully Added</span>
        </div>
      )}
    </form>
  );
};

export default Form;

