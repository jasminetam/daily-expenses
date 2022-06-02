import React, { useState } from "react";
import ItemsInput from "./ItemsInput";

export default function AddButton() {
  const [showInput, setShowInput] = useState(false);

  return (
    <div>
      <button onClick={() => setShowInput(!showInput)}>Add</button>
      {showInput ? <ItemsInput /> : null}
    </div>
  );
}
