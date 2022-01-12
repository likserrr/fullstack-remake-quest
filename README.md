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
    <li><a href="#some-problems">Some Problems</a>
     <ul>
        <li><a href="#json-base">JSON Base</a></li>
        <li><a href="#image-checker">Image Checker</a></li>
        <li><a href="#project-structure">Project Structure</a></li>
      </ul>
     </li>
     <li>
      <a href="#getting-started">Usage</a>
      <ul>
        <li><a href="#preview-and-category">Preview and category</a></li>
        <li><a href="#search">Search</a></li>
        <li><a href="#last-posts-and-comments">Last posts and comments</a></li>
        <li><a href="#another">Another</a></li>
      </ul>
    </li>
    <li><a href="#contact">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>

</details>

# About The Project

<img src="https://github.com/likserrr/fullstack-remake-quest/blob/master/.media/MainScreen.jpg" width="800px">

Продолжительное время я искал способ, которым будет эффективно на практике закрепить всю изученную мной теорию. Стандартные решения по типу реализации конкретного небольшого модуля мне не подходили. Было необходимо получить от проекта полную картину взаимодействия каждой части между собой. Плюсом к этому идет факт того, что крупное приложение содержит в себе большое количество компонентов, нуждающихся в систематизации. Правильной систематизации

Конечно разрабатывать все с полного нуля не являлось первостепенной задачей. Было решено взять за основу существующий шаблон без функционала, но с адаптивной версткой. С таким макетом можно свободно работать над закреплением, отсекая небольшую часть лишних задач.

Данная работа была для меня принципиально важной. Это работа, код и систематизация которой меня устраивала. Где мне все было понятно и осталась возможность **масштабирования**. Также, что не менее важно, это *fullstack* работа

## Built with

В проекте получилось испробовать одни из основных среди перспективных технологий в области разработки. Список основных:
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
  *server_mongodb* npm install
  *client* npm install
  ```

3. Перейти server_mongodb > index.js, вставить в строчку полученную из Mongo Access ссылку
  ```sh
  const DB_URL = `MongoUrlHere`;
  ```
  
4. Старт сервера (server_mongodb)
  ```sh
  npm run dev / npm start
  ```
  
5. Запуск старт скрипта, создающего необходимые коллекции в Mongo. Достаточно отправить get запрос по пути:
  ```sh
 localhost:5000/api/start
  ```
  
6. Запуск React приложения (client)
  ```sh
  npm start
  ```

# Some Problems

Во время работы над проектом приходилось сталкиваться сразу с несколькими проблемами и решать их по мере поступления. Необходимо отвести им отдельное внимание

## JSON Base

Различие хранения данных постов и хранения, допустим, карточек товаров для главной страницы заключается в их комплексности. В данном случае нужно было продумать подробную содержательную часть для их отображения на главной и на отдельной странице каждого поста. В результате база данных разделилась на следующие основные модели:

* Actives. Содержит информацию о каждом оставленном комментарии. Данная модель учавствует в подсчете количества комментариев для каждого поста и отображении главной модели
* Index_posts. Вся информация для содержательного отображения главной страницы. Хранит статичные данные о странице, которые впоследствии сервер дополняет динамичными
* Posts. Хранит все существующие посты на данный момент
* Posttemps. Предполагаемый костыль. Дело в том, что перед сохранением поста в БД нужно было проверить его корректность, и если какие-то поля отсутствуют, нужно удалить загруженные картинки. Данный метод позволяет избежать сохранения картинок, но не сохранение самого поста в БД. Так и наоборот - сохранение поста и не сохранение картинок.
* Users. Стандартное хранение основных полей пользователя

## Image Checker

Мне было интересно поработать с картинкой со стороны сервера, а именно - наверняка определить, что загружена была действительно допустимая картинка. Для этого я изучил некоторый объем информации и составил небольшой скрипт проверки. В его функционал входят:

* Магические символы. Как известно, любой формат, представленный в кодировке "hex" будет начинаться с определенного набора символов, которые показывают формат. Именно это является первой стадией проверки изображения
* Mime-формат. Базовый метод проверки изображения, отслеживающий расширения файла.
* Размеры изображения. Была установлена специальная библиотека по определению размера картинки. Предпологается, что она способна также выдать ошибку при неудачной обработке, а значит является дополнительной стадией проверки
* Сохранение неподходящего файла. В случае передачи закодированного файла под видом картинки, данный файл будет сохранен в специальную папку на сервере для последующего изучения разработчиками

## Project Structure

Структура проекта долго модифицировалась вместе с получением информации об этом. В частности сюда относится совмещение React и Typescript, NodeJS и MongoDB. Далее сложилось понимание о внедрении утилит и масштабировать проект стало проще

# Usage

Демонстрация основных функциональных возможностей приложения 

## Preview and category

При запуске проекта будет отрендерена главная страница блога, которая состоит из главного поста и 4 дополнительных постов среднего формата. Сбоку отдельно единично рендирится сайдбар. При выборе любой другой категории, кроме "All" - будет отрендерена страница без главного поста (Вместо него будет баннер о выбранной категории)

<img alt="Animation render page and select category" src="https://github.com/likserrr/fullstack-remake-quest/blob/master/.media/CategoryGif.gif?raw=true" width="800px">

*--- Animation render page and select category*

## Search

Строку поиска нужно было реализовать интересней: Данные для поиска должны собираться каждое n-ное время после изменения input поля. После этого происходит рендер постов, а в промежуток отображается скелет постов

<img alt="Animation of rendering posts based on search results" src="https://github.com/likserrr/fullstack-remake-quest/blob/master/.media/SearchGif.gif?raw=true" width="800px">

*--- Animation of rendering posts based on search results*

## Last posts and comments

В завершение проработки сайдбара - существует секция с последними постами и комментариями, вычисляющимися со стороны сервера и рендерящахся на основе определенных условий конкретного случая. В результате получается еще 2 пунка меню - последние посты и последняя активность пользователей

<img alt="Animation to a single post and sidebar widgets" src="https://github.com/likserrr/fullstack-remake-quest/blob/master/.media/PostGif.gif?raw=true" width="800px">

*--- Animation to a single post and sidebar widgets*

## Another

Также были реализованы иные мало заметные возможности по типу пагинатора для переключения страниц, прорисовки скелета постов перед их рендером, сохранение в локальном хранилище выбранной категории для перезагрузки и т.д.

# Roadmap

Данное приложение можно доработать, но главную свою цель оно выполнило. Но так как такая возможность есть, этот абзац будет заполнен.

- [x] Реализовать серверную часть на основе MongoDB и express, покрывающую весь функционал шаблона
    - [x] Сделать обработку ошибок
    - [x] Проработать взаимодействие клиента-сервера-бд (Сделать необходимые проверки)
    - [x] Структурировать и упростить результат для возможности дальнейшего масштабирования
- [x] Реализовать отображение постов в двух варинтах (1: Прорисовка главной страницы. 2: Прорисовка постов категории)
- [x] Реализовать рабочие виджеты в сайдбаре
    - [x] Выбор категории
    - [x] Поисковая строка
    - [x] Последние новости
    - [x] Последняя активность 
- [x] Проработать детали 
    - [x] 2 вида скелета для пре-рендера (1: Скелет главной страницы. 2: Скелет постов категории)
    - [x] Рендер постов (Анимация прогрузки, отображение существующих комментариев) 
    - [x] Пагинатор для постов категории
    - [x] Работа с LocalStore (При выборе катеории она сохранится в хранилище и не сбросится при перезагрузке)
    - [x] Проработка всех переходов (По категории, по посту из сайдбара и т.д.)
- [ ] Проработка постов
    - [x] Отображение активности и контента поста
    - [ ] Возможность оставить свою активность (Не реализована на фронте, есть на бекенде) 
- [ ] Реализация функционального футера и хедера с отдельными страницами (Сделать не только блог-страницу)

# Contact


