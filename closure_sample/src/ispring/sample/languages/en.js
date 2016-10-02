goog.provide("ispring.sample.languages.en");

/**
 * @export
 */
goog.scope(function() {
    /**
     * @constructor
     */
    ispring.sample.languages.en = goog.defineClass(null, {
        constructor: function () {
            this.MESSAGES =
            {
                "LOGIN" : "User name",
                "PASSWORD" : "Password",
                "SEND" : "Send",
                "LOGOUT" : "Logout",
                "INCORRECT_LOGIN" : "Incorrect login",
                "EMPTY_PASS" : "Password can not be empty",
                "SHORT_PASS" : "The password can not be less than 4 characters!",
                "CREATE_ACCOUNT" : "Create New Account?",
                "NO_LOGIN" : "You have entered a non-existent username",
                "WRONG_PASS" : "Wrong password",
                "CREATE_BOARD_BTN" : "Create board",
                "BACKSPACE_BUTTON" : "Backspace",
                "RENAME_BUTTON" : "Rename",
                "MESSAGE_FIRST_LANG" : "Русский",
                "MESSAGE_SECOND_LANG" : "English"
            }
        }
    });
});

/*
messages:
{
    Messages.BOARD_LABEL: "Boards"
}

getMessageById(id)->label


i18n.constructor(messages);
i18n.getMessageById(Messages.BOARD_LABEL)*/