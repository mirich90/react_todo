import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";

import styles from "./index.module.scss";

export const InputTask = ({
  id,
  title,
  text,
  isDone,
  isDisplay,
  date,
  onDisplay,
  onDone,
  onRemove,
  onEdited,
}) => {
  const [checked, setChecked] = useState(isDone);
  const [isEditMode, setEditMode] = useState(false);
  const [valueTitle, setValueTitle] = useState(title);
  const [valueText, setValueText] = useState(text);
  const editTextInputRef = useRef(null);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  useLayoutEffect(() => {
    if (isEditMode && editTextInputRef) {
      editTextInputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div className={styles.inputTaskWrapper}>
      <div className={styles.inputTaskHeader}>
        <div
          className={styles.inputTaskHeaderCollapse}
          onClick={() => {
            onDisplay(id);
          }}
        >
          <div
            className={`${styles.inputTaskHeaderCollapseIcon} ${
              isDisplay ? "" : "rotate"
            }`}
          ></div>
        </div>

        <div className={styles.inputTaskHeaderDot}></div>

        <div className={styles.inputTaskHeaderMeta}>
          <time className="timeline__date" dateTime="1970-01-01">
            {date.toLocaleDateString("ru-RU", options)}
          </time>

          {isEditMode ? (
            <input
              ref={editTextInputRef}
              value={valueTitle}
              name="title"
              onChange={(e) => {
                setValueTitle(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onEdited(id, valueTitle, valueText);
                  setEditMode(false);
                }
              }}
              className={styles.inputTaskTitleEdit}
            />
          ) : (
            <h2 className={`${styles.inputTaskTitle} ${isDone ? "done" : ""}`}>
              {title}
            </h2>
          )}
        </div>
      </div>

      <div className={`${styles.inputTask} ${isDisplay ? "" : "hidden"}`}>
        <label className={styles.inputTaskLabel}>
          <input
            type="checkbox"
            name="checkbox"
            checked={isDone}
            onChange={(e) => {
              setChecked(e.target.checked);
              setTimeout(() => {
                onDone(id);
              }, 300);
            }}
            className={styles.inputTaskCheckbox}
          />
          {isEditMode ? (
            <textarea
              ref={editTextInputRef}
              value={valueText}
              rows="3"
              name="text"
              onChange={(e) => {
                setValueText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onEdited(id, valueTitle, valueText);
                  setEditMode(false);
                }
              }}
              className={styles.inputTaskTextEdit}
            ></textarea>
          ) : (
            <h3 className={`${styles.inputTaskText} ${isDone ? "done" : ""}`}>
              {text}
            </h3>
          )}
        </label>

        {isEditMode ? (
          <button
            onClick={() => {
              onEdited(id, valueTitle, valueText);
              setEditMode(false);
            }}
            aria-label="Save"
            className={styles.inputTaskSave}
          />
        ) : (
          <button
            onClick={() => {
              setEditMode(!isEditMode);
            }}
            aria-label="Edit"
            className={styles.inputTaskEdit}
          />
        )}

        <button
          onClick={() => {
            if (confirm("Are you sure?")) {
              onRemove(id);
            }
          }}
          aria-label="Remove"
          className={styles.inputTaskRemove}
        />
      </div>
    </div>
  );
};

/* For Edit mode
<input
    className={styles.inputTaskTitleEdit}
/>

<button
    aria-label="Save"
    className={styles.inputTaskSave}
/>
*/
