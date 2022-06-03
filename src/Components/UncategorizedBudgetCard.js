import React from "react";
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID } from "./Context/BudgetsContext";
import { useBudgets } from "./Context/BudgetsContext";

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;

  return <BudgetCard name="Uncategorized" amount={amount} gray {...props} />;
}
