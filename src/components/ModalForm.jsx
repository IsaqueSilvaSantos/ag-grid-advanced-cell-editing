import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ModalForm(props) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);

    props.onSubmit(formData);
  };

  return (
    <>
      <Modal show={props.show} onHide={props.closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID:</Form.Label>
              <Form.Control type="number" name={"id"} defaultValue={props.data.id} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Completed:</Form.Label>
              <Form.Select name={"completed"} defaultValue={props.data.completed}>
                <option value="false">false</option>
                <option value="true">true</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control as="textarea" rows={3} name={"title"} defaultValue={props.data.title} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalForm;
