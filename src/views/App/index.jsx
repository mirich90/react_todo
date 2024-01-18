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
  const [isDescriptionDisplay, setDescriptionDisplay] = React.useState(true);
  const [tasks, setTasks] = React.useState([
    {
      id: generateId(),
      title: "Перебудил всех",
      isDone: true,
      isDisplay: true,
      date: generateDate(1, 57),
      text: "Просыпался в 6 часов, перебудил всех, но от лени не встал и проспал до 9",
    },
    {
      id: generateId(),
      title: "Главные мои недостатки.",
      isDone: false,
      isDisplay: false,
      date: generateDate(5, 26),
      text: "1) Неосновательность (под этим я разумею: нерешительность, непостоянство и непоследовательность). 2) Неприятный тяжелый характер, раздражительность, излишнее самолюбие, тщеславие. 3) Привычка к праздности. Буду стараться постоянно наблюдать за этими тремя основными пороками и записывать всякий раз, что буду впадать в них».",
    },
    {
      id: generateId(),
      title: "Просто 'весь ваш'",
      isDone: false,
      isDisplay: true,
      date: generateDate(9, 26),
      text: "Утром читал и писал немного. Вечером побольше, но все не только без увлечения, но с какою-то непреодолимой ленью. Решился не брать фортепьян и ответил Олхину, что у меня денег нет, чем он верно обиделся, тем более, что я подписал просто 'весь ваш'",
    },
    {
      id: generateId(),
      title: "Непростительная нерешительность",
      isDone: false,
      isDisplay: true,
      date: generateDate(11, 26),
      text: "Встал поздно и все утро читал Шиллера, но без удовольствия и увлечения. После обеда, хотя и был в расположении заниматься, от лени написал чрезвычайно мало. Вечер же весь провел в шляньи за девками. Много было интересного в нынешнем дне: и чтение деньщиков, и rendez-vous в саду, и обман Шубина. Обо всем напишу завтра, ибо теперь 1/2 3-го. Упрекаю себя за лень и в последний раз. Ежели завтра я ничего не сделаю, я застрелюсь. Еще упрекаю за непростительную нерешительность с девками",
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
                isDisplay: true,
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
          text={isDescriptionDisplay ? "Развернуть все" : "Свернуть все"}
          click={(id) => {
            setTasks(
              tasks.map((task) => ({
                ...task,
                isDisplay: isDescriptionDisplay,
              }))
            );
            setDescriptionDisplay(!isDescriptionDisplay);
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
            isDisplay={task.isDisplay}
            isDone={task.isDone}
            text={task.text}
            date={task.date}
            onDone={(id) => {
              setTasks(
                tasks.map((task) =>
                  task.id === id ? { ...task, isDone: !task.isDone } : task
                )
              );
            }}
            onDisplay={(id) => {
              setTasks(
                tasks.map((task) =>
                  task.id === id
                    ? { ...task, isDisplay: !task.isDisplay }
                    : task
                )
              );
            }}
            onRemove={(id) => {
              setTasks(tasks.filter((task) => task.id !== id));
            }}
            onEdited={(id, title, text) => {
              setTasks(
                tasks.map((task) =>
                  task.id === id ? { ...task, title, text } : task
                )
              );
            }}
          />
        ))}
      </section>
    </article>
  );
};
