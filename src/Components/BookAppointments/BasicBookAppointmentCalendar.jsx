import { useState, useEffect } from "react";
import axios from "axios";
 
import { useNavigate } from "react-router-dom";

const BasicBookAppointmentCalendar = () => {
  const navigate = useNavigate();
  const [veterinarian, setVeterinarian] = useState([]);
  const [owner, setOwner] = useState([]);
  const [pet, setPet] = useState([]);
  const [service, setService] = useState([]);
  const [appointment, setAppointment] = useState({
    appointments_created_at: "",
    appoitments_starts_at: "",
    appointments_ends_at: "",
    owner_id: "",
    veterinarian_id: "",
    pet_id: "",
    service_id: "",
  });
  useEffect(() => {
    axios
      .get("https://veterinariacliente.onrender.com/auth/veterinarians")
      .then((result) => {
        if (result.data.Status) {
          setVeterinarian(result.data.Result);
         
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://veterinariacliente.onrender.com/auth/pets")
      .then((result) => {
        if (result.data.Status) {
          setPet(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://veterinariacliente.onrender.com/auth/pet-owners")
      .then((result) => {
        if (result.data.Status) {
          setOwner(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://veterinariacliente.onrender.com/auth/services")
      .then((result) => {
        if (result.data.Status) {
         
          setService(result.data.Result.rows);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
console.log(appointment)
    axios
      .post("https://veterinariacliente.onrender.com/auth/add-appointment", appointment)
      .then((result) => {
        if (result.data.Status) {
         alert("Se agrego la cita. Se programo el envio de correos")
          navigate("/dashboard/preview-appointment");
        } else {
          console.log(result.data)
         
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <div className="text-warning"></div>
        <h2>Crear una cita</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputCreated" className="form-label">
              Fecha de Creacion
            </label>
            <input
              type="datetime-local"
              className="form-control rounded-0"
              id="inputStart4"
              placeholder="Enter Appointment Date"
              autoComplete="off"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  appointments_created_at: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputStart4" className="form-label">
              Fecha de inicio
            </label>
            <input
              type="datetime-local"
              className="form-control rounded-0"
              id="inputStart4"
              placeholder="Enter Appointment Date"
              autoComplete="off"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  appoitments_starts_at: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEndDate4" className="form-label">
              Fecha Fin
            </label>
            <input
              type="datetime-local"
              className="form-control rounded-0"
              id="inputEndDate4"
              placeholder="Enter Appointments End"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  appointments_ends_at: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="owner" className="form-label">
              Propietario
            </label>
            <select
              name="owner"
              id="owner"
              className="form-select"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  owner_id: e.target.value,
                })
              }
            >
              {owner.map((own) => {
                return (
                  <option key={own.owner_id} value={own.owner_id}>
                    {own.owner_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="vet" className="form-label">
              Veterinario
            </label>
            <select
              name="vet"
              id="vet"
              className="form-select"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  veterinarian_id: e.target.value,
                })
              }
            >
              {veterinarian.map((vet) => {
                return (
                  <option key={vet.veterinarian_id} value={vet.veterinarian_id}>
                    {vet.veterinarian_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="pet" className="form-label">
              Mascota
            </label>
            <select
              name="pet"
              id="pet"
              className="form-select"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  pet_id: e.target.value,
                })
              }
            >
              {pet.map((p) => {
                return (
                  <option key={p.pet_id} value={p.pet_id}>
                    {p.pet_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="service" className="form-label">
              Servicio
            </label>
            <select
              name="service"
              id="service"
              className="form-select"
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  service_id: e.target.value,
                })
              }
            >
               
              {service.map((serv) => {console.log(serv)
                return (
                  <option key={serv.name} value={serv.service_id}>
                    {serv.service_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <button className="btn btn-success w-100 rounded-0 mb-2 mt-3">
              Agregar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicBookAppointmentCalendar;
