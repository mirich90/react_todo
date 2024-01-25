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
      title: "Генератор заголовков",
      isDone: true,
      isDisplay: true,
      date: generateDate(1, 57),
      text: "В настоящее время наш генератор случайного контента не умеет создавать хоть сколь-нибудь осмысленные заголовки, он выдает лишь целые предложения. Конечно, ничто не мешает брать вам начала этих предложений и использовать их в качестве заголовков, однако мы бы хотели сделать все по уму.",
    },
    {
      id: generateId(),
      title: "Генератор статей",
      isDone: false,
      isDisplay: true,
      date: generateDate(1, 57),
      text: "Мегаполезная фича для вывода тестового листинга статей, например. Или для предварительного заполнения сайта перед показом клиенту. В планах сделать полноценный генератор целых статей: с заголовками, разметкой на выбор, изображениями, форматированием. Разумеется, генератор статей должен уметь отдавать как plain text, так и качественный HTML с возможностью настройки. В общем, идеальный инструмент для проверки типографики или тестирования REST API.",
    },
    {
      id: generateId(),
      title: "Категории рыбатекста.",
      isDone: false,
      isDisplay: false,
      date: generateDate(5, 26),
      text: "То бишь генерация кириллического Lorem Ipsum на выбранную тематику. Нужно пятьдесят предложений рыбатекста об архитектуре или тяжелой промышленности? Пожалуйста. Приличная по объему, но не сильно сложная задача, которая сводится лишь к написанию значительного количества шаблонов и небольшому кодингу. Однако чтобы к ней приступить, необходимо понимать, какие темы текста-рыбы самые популярные. Если у вас есть подобная информация или статистика и вы её можете отправить на dev@fish-text.ru, мы будем крайне признательны.",
    },
    {
      id: generateId(),
      title: "Генератор изображений",
      isDone: false,
      isDisplay: true,
      date: generateDate(9, 26),
      text: "Вообще-то это, по сути, отдельный подпроект, который будет иметь с РыбаТекстом общий API. Онлайн-генераторов изображений сейчас довольно много, но какие-то не умеют отдавать фиксированные картинки (всегда передают случайные), в каких-то нет категорий, а многие просто недоступны по HTTPS (что накладывает ограничения на использование). В общем, идеала мы так и не нашли. И, конечно, хотим создать его самостоятельно.",
    },
    {
      id: generateId(),
      title: "Плагин для Figma",
      isDone: true,
      isDisplay: true,
      date: generateDate(11, 26),
      text: "Да, всё верно. Хотим написать самый крутой плагин бредотекста для Фигмы. Заполнение текстовых слоёв (в том числе нескольких) — даже с учётом их высоты/ширины, генерация новых слоёв, работа с компонентами.",
    },
    {
      id: generateId(),
      title: "Плагин для Figma",
      isDone: false,
      isDisplay: true,
      date: generateDate(11, 26),
      text: "Да, всё верно. Хотим написать самый крутой плагин бредотекста для Фигмы. Заполнение текстовых слоёв (в том числе нескольких) — даже с учётом их высоты/ширины, генерация новых слоёв, работа с компонентами.",
    },
  ]);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>ТУДУшки</h1>
      <p>
        Вместо рыба-текста скопировал ТУДУшки с сайта
        <a href="https://fish-text.ru/todo"> fish-text.ru</a>
      </p>

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
