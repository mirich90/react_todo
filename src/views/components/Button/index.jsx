import React, { useCallback, useState } from "react";

import styles from "./index.module.scss";

export const Button = ({ text, click }) => {
  return (
    <button onClick={() => click()} aria-label="Add" className={styles.button}>
      {text}
    </button>
  );
};
