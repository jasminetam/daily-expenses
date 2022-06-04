import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./Context/BudgetsContext";


export default function ExpenseInputModal({
  show,
  handleClose,
  defaultBudgetId,
}) {

  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const { addExpense, budgets, expenses } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  }

  const setSelected = (expense) => {
    setSearch(expense);
    setDisplay(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlled="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={descriptionRef}
              type="text"
              onClick={() => setDisplay(!display)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {display && (
              <div>
                {expenses
                  .filter(
                    ({ description }) =>
                      description.indexOf(search.toLowerCase()) > -1
                  )
                  .map((e, i) => {
                    return (
                      <div
                        onClick={() => setSelected(e.description)}
                        key={i}
                        tabIndex="0"
                      >
                        <span>{e.description}</span>
                      </div>
                    );
                  })
                }
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlled="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlled="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
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
