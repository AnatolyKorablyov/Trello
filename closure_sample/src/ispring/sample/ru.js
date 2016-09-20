goog.provide("ispring.sample.ru");

/**
 * @export
 */
goog.scope(function() {
    /**
     * @constructor
     */
    ispring.sample.ru = goog.defineClass(null, {
        constructor: function () {
            this.MESSAGES =
            {
                "LOGIN" : "Имя пользователя",
                "PASSWORD" : "Пароль",
                "INCORRECT_LOGIN" : "Некорректный логин",
                "EMPTY_PASS" : "Пароль не может быть пустым",
                "SHORT_PASS" : "Пароль не может содержать меньше 4 символов!",
                "CREATE_ACCOUNT" : "Создать новый аккаунт?",
                "NO_LOGIN" : "Вы ввели несуществующий логин",
                "WRONG_PASS" : "Пароль неверный",
                "CREATE_BOARD_BTN" : "Создать доску",
                "BACKSPACE_BUTTON" : "Назад",
                "RENAME_BUTTON" : "Переименовать"
            }
        }
    });
});