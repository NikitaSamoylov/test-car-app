Реализовано:
*загрузка данных с сервера;
*серверная пагинация, сортировка и фильтрация;
*переход на страницу выбранного автомобиля с подробной информацией;
*регистрация и авторизация, обработка неверного ввода email или пароля при авторизации, проверка пользователя на уже существующего в базе данных;
*загрузка нового автомобиля возможна только авторизованным пользователем;
*форма для добавления нового авто с валидацией и загрузкой изображений;
*добавленный автомобиль сохраняется в базе данных и доступен для просмотра любым пользователем;


Запуск:

git clone https://github.com/NikitaSamoylov/test-car-app.git
Далее нужно создать в корне файл .env и вставить данные:
MONGODB_URI=mongodb+srv://nsam7655:rq0QDxoB7HaRydDO@cluster0.jvsi5.mongodb.net/
и
NEXTAUTH_SECRET=cg0nq478BmNOoaQkUMaEutJxdn3hXjadvMZBYcOSt0Y=
Далее:
npm i
npm run dev

Deploy: https://test-car-app.vercel.app
Исходники: https://github.com/NikitaSamoylov/test-car-app

Данные для входа:
email: admin@mail.ru
пароль: admin01

Затраченное время: 3 полнорабочих дня или 3 сторипоинта (по 8 часов).
