import React from 'react';
import { Button, Modal, Stack } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './Context/BudgetsContext';
import { currencyFormatter } from './utils';

export default function ExpensesViewModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? {
          name: 'Uncategorized',
          id: UNCATEGORIZED_BUDGET_ID,
        }
      : budgets.find((b) => b.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
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
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                <Button
                  onClick={() => {
                    deleteBudget(budget);
                    handleClose();
                  }}
                  variant="outline-danger"
                >
                  Delete
                </Button>
            )}
          </Stack>

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="mr-2 me-auto fs-4">{expense.description}</div>
                  <div className="fs-5">
                    {currencyFormatter.format(expense.amount)}
                  </div>
                </div>
                <Button
                  onClick={() => deleteExpense(expense)}
                  size="sm"
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </div>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
