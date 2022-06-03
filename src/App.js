import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "../src/Components/BudgetCard";
import BudgetInputModal from "../src/Components/BudgetInputModal";
import ExpenseInputModal from "./Components/ExpenseInputModal";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "./Components/Context/BudgetsContext";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard";
import TotalBudgetCard from "./Components/TotalBudgetCard";
import ExpensesViewModal from "./Components/ExpensesViewModal";

export default function App() {
  const [showBudgetInputModal, setShowBudgetInputModal] = useState(false);
  const [showExpenseInputModal, setShowExpenseInputModal] = useState(false);
  const [expenseInputModalBudgetId, setShowExpenseInputModalBudgetId] =
    useState();
  const [expensesViewModalBudgetId, setExpensesViewModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openExpenseInputModal(budgetId) {
    setShowExpenseInputModal(true);
    setShowExpenseInputModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button
            variant="primary"
            onClick={() => setShowBudgetInputModal(true)}
          >
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openExpenseInputModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onExpenseInputClick={() => openExpenseInputModal(budget.id)}
                onExpensesViewClick={() =>
                  setExpensesViewModalBudgetId(budget.id)
                }
              />
            );
          })}
          <UncategorizedBudgetCard
            onExpenseInputClick={openExpenseInputModal}
            onExpensesViewClick={() =>
              setExpensesViewModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <BudgetInputModal
        show={showBudgetInputModal}
        handleClose={() => setShowBudgetInputModal(false)}
      />
      <ExpenseInputModal
        show={showExpenseInputModal}
        defaultBudgetId={expenseInputModalBudgetId}
        handleClose={() => setShowExpenseInputModal(false)}
      />
      <ExpensesViewModal
        budgetId={expensesViewModalBudgetId}
        handleClose={() => setExpensesViewModalBudgetId()}
      />
    </>
  );
}
