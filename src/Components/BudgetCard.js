import React from "react";
import { Card, ProgressBar, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "./utils";

export default function BudgetCard({
  name,
  amount,
  maxAmount,
  gray,
  hideButtons,
  onExpenseInputClick,
  onExpensesViewClick
}) {
  const classNames = [];
  if (amount > maxAmount) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  return (
    <div >
      <div className="cardBody">
        <div className="cardTitle">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {maxAmount && (<span className="text-muted fs-6 ms-1">
              /  {currencyFormatter.format(maxAmount)}</span>
            )}
          </div>
          </div>
        {maxAmount && (<ProgressBar
          className="rounded-pill"
          variant={getProgressBarRatio(amount, maxAmount)}
          min={0}
          max={maxAmount}
          now={amount}
        />
        )}
        {!hideButtons && (<div className="cardButtonsDiv">
          <button className="cardButtons"
            onClick={onExpenseInputClick}
          >
            Add Expense
          </button>
          <button className="cardButtons"
            onClick={onExpensesViewClick}
            
          >View Expenses
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

function getProgressBarRatio(amount, maxAmount) {
  const ratio = amount / maxAmount;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}
