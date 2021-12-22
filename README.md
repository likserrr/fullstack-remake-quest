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
    <li><a href="#some-problems">Some Problems</a></li>
     <li>
      <a href="#getting-started">Usage</a>
      <ul>
        <li><a href="#preview-section">Preview section</a></li>
        <li><a href="#search-section">Search section</a></li>
        <li><a href="#category-section">Category section</a></li>
        <li><a href="#last-post-section">Last post section</a></li>
        <li><a href="#last-comments-section">Last comments section</a></li>
      </ul>
    </li>
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

# Some Problems

Втечение работы над проектом приходилось сталкиваться сразу с несколькими проблемами и решать их по мере поступления

## JSON Base

Различие хранения данных постов и хранения, допустим, карточек товаров для главной страницы заключается в их комплексности. В данном случае нужно было продумать подробную содержательную часть для их отображения на главной и на отдельной странице каждого поста. В результате база данных разделилась на следующие основные модели:

* Actives. Содержит информацию о каждом оставленном комментарии. Данная модель учавствует в подсчете количества комментариев для каждого поста и отображении главной модели
* Index_posts. 
* Posts
* Posttemps
* Users

# Usage

Разбор основных функциональных возможностей приложения. 

## Preview section



## Search section
## Category section
## Last post section
## Last comments section



