import React, { useCallback, useState } from "react";

import styles from "./index.module.scss";

export const InputPlus = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputText, setInputText] = useState("");

  const addTask = useCallback(() => {
    console.log(inputValue, inputText);
    const isAdd = onAdd(inputValue, inputText);
    if (isAdd) {
      setInputValue("");
      setInputText("");
    }
  }, [inputValue, inputText]);

  return (
    <div className={styles.inputPlus}>
      <div className={styles.inputPlusCol}>
        <input
          type="text"
          name="title"
          className={styles.inputPlusValue}
          placeholder="Введите название..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />

        <textarea
          rows="4"
          name="text"
          className={styles.inputPlusText}
          placeholder="Введите текст..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        ></textarea>
      </div>
      <button
        onClick={() => addTask()}
        aria-label="Add"
        className={styles.inputPlusButton}
      />
    </div>
  );
};
