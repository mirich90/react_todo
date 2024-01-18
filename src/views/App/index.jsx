import React from "react";

import { InputPlus } from "../components/InputPlus";
import { InputTask } from "../components/InputTask";
import { Button } from "../components/Button";

import styles from "./index.module.scss";

export const generateId = () =>
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36);

export const generateDate = (h, m) => {
  const today = new Date();
  today.setHours(h, m, 0);
  return today;
};

export const App = () => {
  const [tasks, setTasks] = React.useState([
    {
      id: generateId(),
      title: "Unix Epoch",
      isDone: true,
      date: generateDate(1, 57),
      text: "This is the day the Unix clock began (or December 31, 1969 if you live behind UTC 😉).",
    },
    {
      id: generateId(),
      title: "1 Billion Seconds",
      isDone: false,
      date: generateDate(5, 26),
      text: "At 6:36:57 PM UTC, the date in ISO 8601 format (1973-10-17) within the time digits (119731017) appeared for the first time.",
    },
    {
      id: generateId(),
      title: "Digits Within ISO 8601 Format",
      isDone: false,
      date: generateDate(9, 26),
      text: "Unix time reached 1,000,000,000 seconds at 1:46:40 AM UTC. The Danish UNIX User Group celebrated this in Copenhagen, Denmark.",
    },
  ]);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>Заметки</h1>

      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title, text) => {
            if (!title || !text) {
              alert("Заполните оба поля");
              return false;
            }

            setTasks([
              {
                id: generateId(),
                title,
                text,
                isDone: false,
                date: new Date(),
              },
              ...tasks,
            ]);

            return true;
          }}
        />
      </section>

      <section className={styles.articleSection}>
        <Button
          text="Свернуть все"
          click={(id) => {
            setTasks(tasks.filter((task) => task.id !== id));
          }}
        />
        <Button
          text="Развернуть все"
          click={(id) => {
            setTasks(tasks.filter((task) => task.id !== id));
          }}
        />
      </section>

      <section className={styles.articleSection}>
        {tasks.length <= 0 && (
          <p className={styles.articleText}>There is no one task.</p>
        )}

        {tasks.map((task) => (
          <InputTask
            key={task.id}
            id={task.id}
            title={task.title}
            isDone={task.isDone}
            text={task.text}
            date={task.date}
            onDone={(id) => {
              setTasks(
                tasks.map((task) => {
                  if (task.id === id) task.isDone = !task.isDone;
                  return task;
                })
              );
            }}
            onRemove={(id) => {
              setTasks(tasks.filter((task) => task.id !== id));
            }}
            onEdited={(id, value) => {
              setTasks(
                tasks.map((task) =>
                  task.id === id ? { ...task, text: value } : task
                )
              );
            }}
          />
        ))}
      </section>
    </article>
  );
};
