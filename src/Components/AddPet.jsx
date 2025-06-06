import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const navigate = useNavigate();
  const [owner, setOWner] = useState([]);
  const [veterinarian, setVeterinarian] = useState([]);
  const [vaccination, setVaccination] = useState([]);
  const [pet, setPet] = useState({
    pet_name: "",
    pet_chip_number: "",
    pet_type: "",
    pet_breed: "",
    pet_gender: "",
    pet_birthdate: "",
    pet_height: "",
    pet_weight: "",
    owner_id: "",
    vaccination_id: "",
    pet_vaccination_date: "",
    veterinarian_id: "",
  });
  useEffect(() => {
    axios
      .get("https://veterinariacliente.onrender.com/auth/pet-owners")
      .then((result) => {
        if (result.data.Status) {
          setOWner(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
      .get("https://veterinariacliente.onrender.com/auth/vaccinations")
      .then((result) => {
        if (result.data.Status) {
          setVaccination(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://veterinariacliente.onrender.com/auth/add-pet", pet)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/pets");
        } else {
          alert(result.data.Error);
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };


  return(
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
      <div className="text-warning"></div>
      <h2>Agregar Mascota</h2>
      <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputName"
            placeholder="Nombre"
            onChange={(e) =>
              setPet({ ...pet, pet_name: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputChipNumber4" className="form-label">
            Chip  
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputChipNumber4"
            placeholder="Numero de Chip"
            autoComplete="off"
            onChange={(e) =>
              setPet({ ...pet, pet_chip_number: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputType4" className="form-label">
            Tipo de Mascota
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputType4"
            placeholder="Tipo de Mascota (perro, gato,etc)"
            onChange={(e) =>
              setPet({ ...pet, pet_type: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputBreed" className="form-label">
            Raza
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputBreed"
            placeholder="Raza (si aplica)"
            autoComplete="off"
            onChange={(e) =>
              setPet({ ...pet, pet_breed: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputGender" className="form-label">
            Genero(M/H)
          </label>
          <input
            type="char"
            className="form-control rounded-0"
            id="inputGender"
            placeholder="Sexo (M o H)"
            autoComplete="off"
            onChange={(e) =>
              setPet({ ...pet, pet_gender: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputBirthDate" className="form-label">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            className="form-control rounded-0"
            id="inputBirthDate"
            placeholder="Fecha de nacimiento"
            autoComplete="off"
            onChange={(e) =>
              setPet({ ...pet, pet_birthdate: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputHeight" className="form-label">
            Tamaño
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputHeight"
            placeholder="En cm"
            autoComplete="off"
            onChange={(e) =>
              setPet({ ...pet, pet_height: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputWeight" className="form-label">
            Peso
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputWeight"
            placeholder="Peso en kg"
            autoComplete="off"
            onChange={(e) =>
              setPet({ ...pet, pet_weight: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="owner" className="form-label">
            Dueño
          </label>
          <select
            name="Owner"
            id="owner"
            className="form-select"
            onChange={(e) =>
              setPet({
                ...pet,
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
          <label htmlFor="vaccination" className="form-label">
            Vacunas
          </label>
          <select
            name="Vaccination"
            id="vaccination"
            className="form-select"
            onChange={(e) =>
              setPet({
                ...pet,
                vaccination_id: e.target.value,
              })
            }
          >
            {vaccination.map((vacc) => {
              return (
                <option key={vacc.vaccination_id} value={vacc.vaccination_id}>
                  {vacc.vaccination_name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="inputDateVaccination" className="form-label">
            Fecha de Vacunacion
          </label>
          <input
            type="date"
            className="form-control rounded-0"
            id="inputDateVaccination"
            placeholder="Fecha de nacimiento"
            autoComplete="off"
            onChange={(e) =>
              setPet({ ...pet, pet_vaccination_date: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="mainVet" className="form-label">
            Veterinario
          </label>
          <select
            name="mainvet"
            id="mainVet"
            className="form-select"
            onChange={(e) =>
              setPet({
                ...pet,
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
          <button className="btn btn-success w-100 rounded-0 mb-2 mt-3">
            Agregar
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default AddPet;
