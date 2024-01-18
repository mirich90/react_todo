import React, { useCallback, useState } from "react";

import styles from "./index.module.scss";

export const Button = ({ text, click }) => {
  const [inputValue, setInputValue] = useState("");
  const addTask = useCallback(() => {
    click(inputValue);
    setInputValue("");
  }, [inputValue]);

  return (
    <button
      onClick={() => addTask()}
      aria-label="Add"
      className={styles.button}
    >
      {text}
    </button>
  );
};
