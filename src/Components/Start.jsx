import { useNavigate } from "react-router-dom";
 import "./Start.css"

const Start = () => {
    const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded=90 w-30 border loginForm">
        <div className="text-warning"></div>
        <h2 className="text-center">Ingresar como:</h2>
        <div className="d-flex justify-content-between  mt-5 mb-2">
          
          <button type="button" className="btn btn-primary" onClick={() => {navigate("/admin-login")}}>
            Administrador
          </button>
           
          <button type="button" className="btn btn-success" onClick={() => {navigate("/veterinarian-login")}}>
            Veterinarinario
          </button>
          <button type="button" className="btn btn-dark" onClick={() => {navigate("/owner-login")}}>
            Dueño de Mascota
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
