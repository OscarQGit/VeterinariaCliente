import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPetOwners = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [role, setRole] = useState([]);
  const [owner, setOwner] = useState({
    owner_name: "",
    owner_emso: "",
    owner_birthdate: "",
    owner_email: "",
    owner_password: "",
    owner_phone: "",
    owner_address: "",
    category_id: "",
    role_id: "",
  });

  useEffect(() => {
    axios
      .get("https://veterinariacliente.onrender.com/auth/role-types")
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data)
          setRole(result.data.Result.rows);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://veterinariacliente.onrender.com/auth/categories")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result.rows);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://veterinariacliente.onrender.com/auth/add-pet-owners", owner)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/pet-owners");
        } else {
          alert(result.data.Error);
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <div className="p-3 rounded w-50 border">
        <div className="text-warning"></div>
        <h2>Agregar Propietario</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
            <label htmlFor="inputName4" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName4"
              placeholder="Nombre"
              autoComplete="off"
              onChange={(e) => setOwner({ ...owner, owner_name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEMSO4" className="form-label">
              CURP
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputEMSO4"
              placeholder="CURP"
              autoComplete="off"
              onChange={(e) => setOwner({ ...owner, owner_emso: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputDate4" className="form-label">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDate4"
              placeholder="Fecha de nacimiento"
              autoComplete="off"
              onChange={(e) => setOwner({ ...owner, owner_birthdate: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Correo
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Email"
              autoComplete="off"
              onChange={(e) => setOwner({ ...owner, owner_email: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Password"
              onChange={(e) => setOwner({ ...owner, owner_password: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPhone4" className="form-label">
              Telefono
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPhone4"
              placeholder="Telefono"
              autoComplete="off"
              onChange={(e) => setOwner({ ...owner, owner_phone: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress4" className="form-label">
              Direccion
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress4"
              placeholder="Direccion"
              autoComplete="off"
              onChange={(e) => setOwner({ ...owner, owner_address: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Categoria
            </label>
            <select
              name="Category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setOwner({
                  ...owner,
                  category_id: e.target.value,
                })
              }
            >
              {category.map((cat) => {
                return (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.category_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="form-select"
              onChange={(e) =>
                setOwner({
                  ...owner,
                  role_id: e.target.value,
                })
              }
            >
              {role.map((rol) => {
                return (
                  <option key={rol.role_id} value={rol.role_id}>
                    {rol.role_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <button className="btn btn-success w-100 rounded-0 mb-2 my-3">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetOwners;
