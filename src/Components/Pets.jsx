import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { MdPets } from "react-icons/md";

const Pets = () => {
  const navigate = useNavigate();
  const [pet, setPet] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/pets")
      .then((result) => {
        if (result.data.Status) {
          setPet(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete-pet/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddPet = () => {
    navigate('/dashboard/add-pet');
};
  const handleAddPetOwner = () => {
    navigate('/dashboard/add-pet-owners');
  };

  return (
    <div className="px-5 my-4 mx-2">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Lista de Mascotas</h3>
        <>
          <Button variant="success" onClick={handleShow}>
            Agregar Mascota
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Mascota</Modal.Title>
            </Modal.Header>
            <Modal.Footer className="display-flex align-items-center justify-content-between">
              <Button variant="success" onClick={handleAddPet}>
                Dueño Registrador
              </Button>
              <Button variant="primary" onClick={handleAddPetOwner}>
                Nuevo Dueño
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
      <div className="mt-3">
        {pet.length === 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><MdPets /> No hay mascotas</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Chip</th>
                <th>Tipo</th>
                <th>Raza</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {pet.map((pets) => (
                <tr
                  key={pets.pet_id}
                  onClick={() => navigate(`/dashboard/pet/${pets.pet_id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{pets.pet_name}</td>
                  <td>{pets.pet_chip_number}</td>
                  <td>{pets.pet_type}</td>
                  <td>{pets.pet_breed}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/edit-pet/${pets.pet_id}`);
                      }}
                      className="btn btn-success btn-sm me-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(pets.pet_id);
                      }}
                      className="btn btn-danger btn-sm"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Pets;
