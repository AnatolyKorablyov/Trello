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
            this._keys = 
            {
                USERS_INFO: "usersInfo",
                USERS: "users",
                BOARDS: "boards",
                BOARD: "board",
                NAME: "name",
                ID: "id",
                LISTS: "lists",
                LIST: "list"
            };
            
            this._ID_AUTHORIZATION_FORM = "AuthorizationForm";

            this._ID_INCORRECT_LOGIN_MESSAGE = "INCORRECT_LOGIN";
            this._ID_EMPTY_PASS_MESSAGE = "EMPTY_PASS";
            this._ID_SHORT_PASS_MESSAGE = "SHORT_PASS";
            this._ID_CREATE_ACCOUNT_MESSAGE = "CREATE_ACCOUNT";
            this._ID_NO_LOGIN_MESSAGE = "NO_LOGIN";

            this._ID_WRONG_PASS_MESSAGE = "WRONG_PASS";


            this._ID_INPUT_USER_NAME = "inputUserName";
            this._ID_INPUT_PASSWORD  = "inputUserPass";

            this._ID_APP_TOOLBAR = "AppToolbarForm";
            this._ID_MAIN_TOOLBAR = "MainToolbarForm";
            this._ID_BOARD_TOOLBAR = "boardToolbar";
            this._ID_BOARDS_PANEL = "BoardsForm";
            this._ID_BOARD_PLACE = "BoardPlace";
            this._ID_LIST_PLACE = "ListPlace";
            this._ID_CARD_PLACE = "cardPlace";

            this._ID_LABEL_SELECT_FIRST_LANG = "MESSAGE_FIRST_LANG";
            this._ID_LABEL_SELECT_SECOND_LANG = "MESSAGE_SECOND_LANG";
            this._ID_LABEL_LOGOUT = "LOGOUT";
            this._ID_LABEL_LOGIN = "LOGIN";
            this._ID_LABEL_PASSWORD = "PASSWORD";
            this._ID_LABEL_SEND = "SEND";
            this._ID_LABEL_ADD_CARD = "ADD_CARD";
            this._ID_LABEL_ADD_LIST = "ADD_LIST";
            
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

            this._EVENT_LANGUAGE_MODIFIED =  "langModified";
            this._EVENT_CREATE_BOARD = "createBoard";
            this._EVENT_BACKSPACE_TO_TRELLO = "trelloBackspace";
            this._EVENT_CLICK_BOARD = "clickBoard";
            this._EVENT_ADD_LIST = "addList";
            this._EVENT_CLEAN_VIEW = "cleanViewEvent";
            this._EVENT_MODIFIED_LISTS_MODEL = "modifiedListsModelEvent";
            this._EVENT_MODIFIED_BOARDS_MODEL = "modifiedBoardsModelEvent";
            
        }
    });
});