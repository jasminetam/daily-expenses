import React, { useState, useEffect } from "react";
import './app.css'
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
      <div className="containerWrapper">
      <div className="container">
        <div className="header">
          <h1 className="titleName">Budgets</h1>
          <div className="headerButtonsDiv">
          <button className="headerButtons"
            onClick={() => setShowBudgetInputModal(true)}
          >
            Add Budget
          </button>
          <button  className="headerButtons" onClick={openExpenseInputModal}>
            Add Expense
            </button>
            </div>
        </div>
        <div className="card">
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
                maxAmount={budget.maxAmount}
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
      </div>
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
        </div>
    </>
  );
}