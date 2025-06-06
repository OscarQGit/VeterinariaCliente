import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Footer from "./Footer/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get("https://veterinariacliente.onrender.com/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  // Function to get the title based on the current path
  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/veterinarians":
        return "Veterinarians";
      case "/dashboard/pet-owners":
        return "Pet Owners";
      case "/dashboard/pets":
        return "Pets";
      case "/dashboard/categories":
        return "Categories";
      case "/dashboard/profile":
        return "Profile";
      default:
        return "Welcome!";
    }
  };
  
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                {getTitle()}
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/veterinarians"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Veterinarios</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/pet-owners"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-clipboard-heart ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dueños de Mascota</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/pets"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-hearts ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Mascotas</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/categories"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Categorias</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Cerrar sesion</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Sistema de Control Veterinario</h4>
          </div>
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
