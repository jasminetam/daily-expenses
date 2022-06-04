import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "./Context/BudgetsContext";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const maxAmount = budgets.reduce((total, budget) => total + budget.maxAmount, 0);

  if (maxAmount === 0) return null;

  return <BudgetCard name="Total" amount={amount} gray maxAmount={maxAmount} hideButtons />;
}
