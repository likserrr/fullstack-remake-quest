<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/likserrr/fullstack-remake-quest/blob/master/.media/QuestLogo.png" alt="Logo" width="215" height="110">
  </a>

  <h3 align="center">Quest Game Blog (Remake)</h3>

  <p align="center">
    Реализация функциональных возможностей HTML макета
    <br />
    <a href="https://github.com/likserrr/"><strong>Other Projects</strong></a>
  </p>
</div>

<details><summary>Оглавление</summary>

   <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>

</details>

# About The Project

<img src="https://github.com/likserrr/fullstack-remake-quest/blob/master/.media/MainScreen.jpg" width="800px">

Продолжительное время я искал способ, которым будет эффективно на практике закрепить всю изученную мной теорию. Стандартные решения по типу реализации конкретного небольшого модуля мне не подходили. Было необходимо получить от проекта полную картину взаимодействия каждой части между собой. Плюсом к этому идет факт того, что крупное приложение содержит в себе большое количество компонентов, нуждающихся в систематизации. Правильной систематизации

Конечно разрабатывать все с полного нуля не являлось первостепенной задачей. Было решено взять за основу существующий шаблон без функционала, но с адаптивной версткой. С таким макетом можно свободно работать над закреплением, отсекая небольшую часть лишних задач.

Данная работа была для меня принципиально новой. Это первая работа, код и систематизация которой меня устраивала. Где мне все было понятно и осталась возможность **масштабирования**. Также это первая *fullstack* работа

## Built with

В данной работе получилось испробовать одни из основных среди перспективных технологий в области разработки. Список основных:
### Frontend
* [React.js](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Mobx (simplified redax)](https://mobx.js.org/)
* [Axios](https://axios-http.com/)
### Backend
* [Express](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [Probe-img-size (For images)](https://www.npmjs.com/package/probe-image-size)

# Getting started

Данное приложение имеет отдельную серверную и клиентскую часть. Для локальной установки и демонстрации возможностей необходимо клонировать репозиторий и получить ссылку доступа к mongoDB

## Prerequisites

Работа с MongoDB

* Создание нового пустого класстера и получаение access ссылки
---
<img src="https://github.com/likserrr/fullstack-remake-quest/blob/master/.media/MongoAccess.gif" width="800px">

## Installation

1. Git clone
  ```sh
  git clone https://github.com/likserrr/fullstack-remake-quest.git
  ```

2. Установка зависимостей отдельно на сервере и клиенте
  ```sh
  npm install
  ```

3. Перейти server_mongodb > index.js, вставить в строчку полученную из Mongo Access ссылку
  ```sh
  const DB_URL = `MongoUrlHere`;
  ```
  
4. Старт сервера (server_mongodb)
  ```sh
  npm run dev / npm start
  ```
  
5. Запуск старт скрипта, создающего необходимые коллекции в Mongo. Достаточно перейти по ссылке
  ```sh
 localhost:5000/api/start
  ```
  
6. Запуск React приложения (client)
  ```sh
  npm start
  ```
  
# Usage

Раздел с демонстрацией основных возможностей приложения. 



