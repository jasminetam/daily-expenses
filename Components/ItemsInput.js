import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ItemsInput() {
  const initialItemData = Object.freeze({
    itemName: "",
    itemAmount: "",
  });
  const [expensesItems, setExpensesItems] = useState(initialItemData);
  const [savedItems, setSavedItems] = useState(
    JSON.parse(localStorage.getItem("expensesItems")) || []
  );


  const handleItemChange = (e) => {
    setExpensesItems({
      ...expensesItems,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedItems([expensesItems, ...savedItems]);
    setExpensesItems({ ...initialState });
  };

  useEffect(() => {
    localStorage.setItem("expensesItems", JSON.stringify(savedItems));
  }, [savedItems]);

  const clearSavedItems = () => {
    window.confirm("Are you sure you wish to delete all your saved items?") &&
      localStorage.clear("expensesItems");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item">Item</label>
        <input
          type="text"
          name="itemName"
          value={itemName}
          onChange={handleItemChange}
          placeholder="Enter the item"
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number value"
          name="itemAmount"
          value={itemAmount}
          onChange={handleItemChange}
          placeholder="Enter the amount"
        ></input>
        <button type="submit">Submit</button>
        <button onClick={clearSavedItems}>Clear</button>
      </form>
    </div>
  );
}
