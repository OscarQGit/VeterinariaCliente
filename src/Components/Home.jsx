import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCircle } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import moment from "moment";
import DatePicker from "react-datepicker";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "react-datepicker/dist/react-datepicker.css";

let administradores=[]
const Home = () => {

  const [adminTotal, setAdminTotal] = useState();
  const [veterinariansTotal, setVeterinariansTotal] = useState();
  const [petOwnersTotal, setPetOwnersTotal] = useState();
  const [petsTotal, setPetsTotal] = useState();
  const [admins, setAdmins] = useState([]);
  const [events, setEvents] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [role, setRole] = useState(""); // State to store user role
  let ignore = false;
   

  useEffect(() => {
          // Fetch user role from token
          if(!ignore){
              const token = getCookie("token");
              if (token) {
                const decodedToken = decodeJWT(token);
                setRole(decodedToken.role);
              }
              adminCount();
              veterinariansCount();
              AdminRecords();
              petOwnersCount();
              petsCount();
              fetchAppointments();
        }
        return () => { ignore = true; }  
  }, []);

  // Function to get cookie value by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // Function to decode JWT token manually
  const decodeJWT = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  const AdminRecords = () => {
    axios.get("http://localhost:3000/auth/admin-records").then((result) => {
     
      if (result.data.Status) { 
        if(administradores.length===0)
            administradores=result.data.Result.rows;
        setAdmins(result.data.Result.rows[0]);
        
      }
    });
  };

  const adminCount = () => {
    axios.get("http://localhost:3000/auth/admin-count").then((result) => {   
      if (result.data.Status) {
        setAdminTotal(result.data.Result.rows[0].admin);
      }
    });
  };

  const veterinariansCount = () => {
    axios
      .get("http://localhost:3000/auth/veterinarians-count")
      .then((result) => {
         
        if (result.data.Status) {
          setVeterinariansTotal(result.data.Result.rows[0].veterinarian);
        }
      });
  };

  const petsCount = () => {
    axios.get("http://localhost:3000/auth/pets-count").then((result) => {
      if (result.data.Status) {
        setPetsTotal(result.data.Result.rows[0].pets);
      }
    });
  };

  const petOwnersCount = () => {
    axios.get("http://localhost:3000/auth/pet-owners-count").then((result) => {
      if (result.data.Status) {
        setPetOwnersTotal(result.data.Result.rows[0].petowners);
      }
    });
  };

  const handleDeleteAdmin = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete-admin/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  const fetchAppointments = () => {
    axios
      .get("http://localhost:3000/auth/appointments-combined")
      .then((result) => {
        if (result.data.status) {
          setEvents(result.data.result);
        } else {
          alert(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
              if (!ignore) { 
              // Calculate total cost when events or selected dates change
              const filteredAppointments = events.length>0?( events.filter((event) =>
                moment(event.appoitments_starts_at).isBetween(
                  moment(startDate).startOf("day"),
                  moment(endDate).endOf("day"),
                  undefined,
                  "[]"
                )
              )):"";
          

              const cost = filteredAppointments.length>0 ? filteredAppointments.reduce(
                (acc, event) => acc + event.service_price,
                0
              ):"";
              setTotalCost(cost);
            }
            return () => { ignore = true; }  
  
  }, [events, startDate, endDate]);

   
  const filteredAppointments =(events.length>0 ? events.filter((event) =>
    moment(event.appoitments_starts_at).isBetween(
      moment(startDate).startOf("day"),
      moment(endDate).endOf("day"),
      undefined,
      "[]"
    )
  ):"")

 

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
     
        <div className="mx-4 px-3 pt-2 pb-3 border shadow-sm w-25">
        
          <div className="text-center pb-1">
            <h4>Administradores</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal ? adminTotal : 0}</h5>
          </div>
        </div>
        <div className="px-3 mx-4 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Veterinarios</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{veterinariansTotal ? veterinariansTotal : 0}</h5>
          </div>
        </div>
        <div className="px-3 mx-4 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Dueños de mascotas</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{petOwnersTotal ? petOwnersTotal : 0}</h5>
          </div>
        </div>
        <div className="px-3 mx-4 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Mascotas</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{petsTotal ? petsTotal : 0}</h5>
          </div>
        </div>
      </div>
      <hr className="mx-4" />
      <div>
        <div className="mt-4 px-5 pt-3 d-flex align-items-center justify-content-between">
          <h3>Citas</h3>
          <div className="d-flex align-items-center">
            <div className="p-3 d-flex justify-content-around mt-3">
              <label>Desde</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd-MM-yyyy"
                style={{ width: "100px" }}
              />
              <label>Hasta</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd-MM-yyyy"
                className="mx-3"
                style={{ width: "100px" }}
              />
            </div>
            <Link to="/dashboard/preview-appointment" className="btn btn-light">
              Calendar
            </Link>
            <Link
              to="/dashboard/add-appointment"
              className="btn btn-success m-3"
            >
              Registrar una cita
            </Link>
          </div>
        </div>
        <div className="px-5">
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora Inicio</th>
                <th>Hora Final</th>
                <th>Servicio</th>
                <th>Mascota</th>
                <th>Veterinario</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              {console.log(filteredAppointments)}
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((event) => (
                  <tr key={event.appointments_id}>
                    <td>
                      {moment(event.appoitments_starts_at).format("DD-MM-YYYY")}
                    </td>
                    <td>{moment(event.appoitments_starts_at).format("LT")}</td>
                    <td>{moment(event.appointments_ends_at).format("LT")}</td>
                    <td>{event.service_name}</td>
                    <td>{event.pet_name}</td>
                    <td>MVZ. {event.veterinarian_name}</td>
                    <td>$ {event.service_price} </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <FaCalendarAlt /> Sin citas en el rango de fechas seleccionado
                  </td>
                  <td></td>
                </tr>
              )}
              <tr>
                <td>Total:</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>${totalCost}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-4 px-5 pt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h3>Administradores activos</h3>
                  {role === "admin" && (
                    <Link to="/dashboard/add-admin" className="btn btn-success m-3">
                      Nuevo Administrador
                    </Link>
                  )}
                </div>
   
           
           <table className="table">
                            <thead>
                                  <tr>
                                    <th>Email</th>
                                    <th>Disponibilidad</th>
                                    {role === "admin" && <th>Action</th>}
                                  </tr>
                            </thead>

                            <tbody>  
                           
                           
                                  {  administradores.map((admin,i) =>   <tr key={i} > 
                                                                                <td>{admin.admin_email}</td>
                                                                                <td>
                                                                                  <FaCircle color="green" /> Disponible
                                                                                </td>
                                                                                {role === "admin" && (
                                                                                  <td>
                                                                                    <Link
                                                                                      to={`/dashboard/edit-admin/` + admin.admin_id}
                                                                                      className="btn btn-success btn-sm me-2"
                                                                                    >
                                                                                      Editar
                                                                                    </Link>
                                                                                    <button
                                                                                      className="btn btn-danger btn-sm"
                                                                                      onClick={() => handleDeleteAdmin(admin.admin_id)}
                                                                                    >
                                                                                      Borrar
                                                                                    </button>
                                                                                  </td>
                                                                                )}
                                                                        </tr>
                                                                   )
                                    }
                                                           
                                 
                                                                                                      
                             </tbody>         
               </table>         
             
     
        </div>
      
      
      </div>
     
  );
};

export default Home;
