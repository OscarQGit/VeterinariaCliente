import { useState, useEffect } from "react";
import moment from "moment";
import Calendar from "./Calendar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

const BasicCalendar = () => {
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("https://veterinariacliente.onrender.com/auth/appointments-combined")
      .then((result) => {
        console.log(result.data); // Log the data received from the API
        if (result.data.status) {
          setEvents(result.data.result);
        } else {
          alert(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEventClick = event => {
    setSelectedEvent(event);
    handleShow();
  };

  return (
    <>
      <Calendar
        events={events.map(event => ({
          start: moment(event.appoitments_starts_at).toDate(),
          end: moment(event.appointments_ends_at).toDate(),
          title: event.service_name,
          pet: event.pet_name,
          owner: event.owner_name,
          vet: event.veterinarian_name,
        }))}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? selectedEvent.title : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent ? (
            <>
              <p>Hora: {moment(selectedEvent.start).format("LLL")} - {moment(selectedEvent.end).format("LT")} </p>
              <p>Mascota: {selectedEvent.pet}</p>
              <p>Dueño: {selectedEvent.owner}</p>
              <p>Veterinario: {selectedEvent.vet}</p>
            </>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Editar
          </Button>
          <Button variant="light" onClick={handleClose}>
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BasicCalendar;
