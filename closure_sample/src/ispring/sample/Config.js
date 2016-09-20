goog.provide("ispring.sample.Config");

/**
 * @export
 */
goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.sample.Config = goog.defineClass(null, {
        constructor: function () {
            this._ID_AUTHORIZATION_FORM = "AuthorizationForm";

            this._ID_INCORRECT_LOGIN_MESSAGE = "INCORRECT_LOGIN";
            this._ID_EMPTY_PASS_MESSAGE = "EMPTY_PASS";
            this._ID_SHORT_PASS_MESSAGE = "SHORT_PASS";
            this._ID_CREATE_ACCOUNT_MESSAGE = "CREATE_ACCOUNT";
            this._ID_NO_LOGIN_MESSAGE = "NO_LOGIN";

            this._ID_WRONG_PASS_MESSAGE = "WRONG_PASS";


            this._ID_INPUT_USER_NAME = "inputUserName";
            this._ID_INPUT_PASSWORD  = "inputUserPass";

            this._ID_MAIN_TOOLBAR = "MainToolbarForm";
            this._ID_BOARD_TOOLBAR = "boardToolbar";
            this._ID_BOARDS_PANEL = "BoardsForm";
            this._ID_BOARD_PLACE = "BoardPlace";

            this._ID_LABEL_USER_NAME_MESSAGE = "MessageUserName";
            this._ID_LABEL_PASSWORD_MESSAGE = "MessagePassword";
            this._ID_LABEL_BACKSPACE_BUTTON = "BACKSPACE_BUTTON";
            this._ID_LABEL_RENAME_BUTTON = "RENAME_BUTTON";
            this._ID_LABEL_BOARD_NAME = "BoardNameLabel";
            this._ID_LABEL_CREATE_BOARD_BUTTON = "CREATE_BOARD_BTN";


            this._NAME_ACT_CREATE_BOARD = "createBoard";
            this._NAME_ACT_RENAME_BOARD = "renameBoard";
            this._NAME_ACT_CLICK_BOARD = "clickBoard";
            this._NAME_ACT_BACKSPACE = "backspace";
        }
    });
});