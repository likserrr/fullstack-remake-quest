<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/likserrr/fullstack-remake-quest/blob/master/client/public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Best-README-Template</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</div>

<details><summary>Оглавление</summary>

   1. Кнопка с переходом на отдельную страницу с полным контентом поста
   1. Отображение его категории, при клике на который выводятся все посты той же категории
   1. Отображение количества комментариев каждого поста для оценки его активности пользователем

</details>

# Расширение функционала game-блога Quest

<img src="https://github.com/likserrr/fullstack-remake-quest/blob/master/.media/MainScreen.jpg" width="800px">

Продолжительное время я искал способ, которым будет эффективно на практике закрепить всю изученную мной теорию. Стандартные решения по типу реализации конкретного небольшого модуля мне не подходили. Было необходимо получить от проекта полную картину взаимодействия каждой части между собой. Плюсом к этому идет факт того, что крупное приложение содержит в себе большое количество компонентов, нуждающихся в систематизации. Правильной систематизации

Конечно разрабатывать все с полного нуля не являлось первостепенной задачей. Было решено взять за основу существующий шаблон без функционала, но с адаптивной версткой. С таким макетом можно свободно работать над закреплением, отсекая небольшую часть лишних задач.

Данная работа была для меня принципиально новой. Это первая работа, код и систематизация которой меня устраивала. Где мне все было понятно и осталась возможность **масштабирования**. Также это первая *fullstack* работа



Первостепенной задачей проекта было взять за основу сверстанный макет и внедрить в него недостающий функционал. Это позволило поработать с основными новейшими технологиями в области frontend и backend разработки. В возможности приложения входили:

1. **Preview поста. Его первостепенная отрисовка на главной странице**

<details><summary>---</summary>

   1. Кнопка с переходом на отдельную страницу с полным контентом поста
   1. Отображение его категории, при клике на который выводятся все посты той же категории
   1. Отображение количества комментариев каждого поста для оценки его активности пользователем

</details>

2. **Строка поиска**

<details><summary>---</summary>

   1. Вывод найденных постов по ключевым словам среди title постов
   1. Отправка запросов на бэкенд раз в n-ное количество времени для уменьшения нагрузки сервера

</details>

<details><summary>Секция с кликабельными категориями постов. Функциональная часть:</summary>

   1. При клике на заголовок необходимо отображать каждый пост указанной категории
   1. Реализовать счетчик постов каждой категории и вывод их числа рядом с заголовком
   1. При выборе всех постов отображать главный экран приложения

</details>

<details><summary>Секция с последними загруженными постами. Функциональная часть:</summary>

   1. Отображение постов в sidebar формате
   1. Переход на пост для его прочтения
   1. Отображение категории и активностей

</details>

<details><summary>Секция с демонстрацией информации по последним оставленным комментариям. Функциональная часть:</summary>

   1. Отображение информации о пользователе, совершившим активность
   1. Переход по кликабельному заголовку на отдельную страницу контента поста

</details>


