import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useRef } from 'react';
import { useBudgets } from './Context/BudgetsContext';

export default function BudgetInputModal({ show, handleClose }) {
  const nameRef = useRef();
  const maxAmountRef = useRef();
  const { addBudget } = useBudgets();
  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      maxAmount: parseFloat(maxAmountRef.current.value),
    });
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title className="w-100">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                handleClose();
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div>New Budget</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlled="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlled="maxAmount">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxAmountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
