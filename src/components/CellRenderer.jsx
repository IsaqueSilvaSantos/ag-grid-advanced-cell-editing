import { React, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import Button from "react-bootstrap/Button";

import ModalForm from "./ModalForm";

export default (props) => {
  let rowNode = props.api.getRowNode(props.rowIndex);

  let [show, setShow] = useState(false);
  let [formData, setformData] = useState([]);

  let handleFormSubmit = (formData) => {
    rowNode.setData(formData);
    setShow(false);
  };

  let buttonClicked = () => {
    setformData(rowNode.data);
    setShow(true);
  };

  return (
    <span>
      <ModalForm show={show} closeModal={() => setShow(false)} data={formData} onSubmit={handleFormSubmit} />

      <Button variant="dark" onClick={() => buttonClicked()}>
        <FontAwesomeIcon icon={faPen} />
      </Button>
      <span> {rowNode.data.id}</span>
    </span>
  );
};
