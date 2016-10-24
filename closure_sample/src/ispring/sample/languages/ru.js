goog.provide("ispring.sample.languages.ru");

/**
 * @export
 */
goog.scope(function() {
    /**
     * @constructor
     */
    ispring.sample.languages.ru = goog.defineClass(null, {
        constructor: function () {
            this.MESSAGES =
            {
                "LOGIN" : "Имя пользователя",
                "PASSWORD" : "Пароль",
                "SEND" : "Отправить",
                "LOGOUT" : "Выйти",
                "INCORRECT_LOGIN" : "Некорректный логин",
                "EMPTY_PASS" : "Пароль не может быть пустым",
                "SHORT_PASS" : "Пароль не может содержать меньше 4 символов!",
                "CREATE_ACCOUNT" : "Создать новый аккаунт?",
                "NO_LOGIN" : "Вы ввели несуществующий логин",
                "WRONG_PASS" : "Пароль неверный",
                "CREATE_BOARD_BTN" : "Создать доску",
                "BACKSPACE_BUTTON" : "Назад",
                "RENAME_BUTTON" : "Переименовать",
                "MESSAGE_FIRST_LANG" : "Русский",
                "MESSAGE_SECOND_LANG" : "English",
                "ADD_CARD" : "Добавить карточку",
                "ADD_LIST" : "Добавить список"
            }
        }
    });
});