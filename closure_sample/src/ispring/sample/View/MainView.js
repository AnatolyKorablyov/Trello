goog.provide("ispring.sample.View.MainView");
goog.require("goog.dom.TagName");
goog.require("ispring.sample.Button");
goog.require("ispring.sample.Config");
goog.require("ispring.sample.I18n");

/**
 * @export
 */
goog.scope(function()
{
    const I18N = ispring.sample.I18n;
    const CONFIG = ispring.sample.Config;
    const BUTTON = ispring.sample.Button;
    /**
     * @constructor
     */
    ispring.sample.View.MainView = goog.defineClass(null, {
        constructor: function ()
        {
            this._i18n = new I18N();
            this._conf = new CONFIG();
        },
        CreateToolbar: function()
        {
            var toolbarForm = document.createElement(goog.dom.TagName.DIV);
            toolbarForm.id = this._conf._ID_MAIN_TOOLBAR;

            var btnCreate = new BUTTON(this._i18n.getMessageById(this._conf._ID_LABEL_CREATE_BOARD_BUTTON));
            btnCreate._btn.setAttribute('data-action', this._conf._NAME_ACT_CREATE_BOARD);
            toolbarForm.appendChild(btnCreate._btn);
            document.getElementById("container").appendChild(toolbarForm);
            this.CreateBoardPanel();
        },
        CreateBoardPanel: function()
        {
            var boardsForm = document.createElement(goog.dom.TagName.DIV);
            boardsForm.id = this._conf._ID_BOARDS_PANEL;
            document.getElementById("container").appendChild(boardsForm);
        },
        DrawBoards: function(boards)
        {
            var boardDiv = document.createElement(goog.dom.TagName.BUTTON);
            boardDiv.id = boards._id;
            boardDiv.innerHTML = boards._nameBoard;
            boardDiv.style.color = "white";
            boardDiv.style.background = "blue";

            boardDiv.setAttribute('data-action', this._conf._NAME_ACT_CLICK_BOARD);
            document.getElementById(this._conf._ID_BOARDS_PANEL).appendChild(boardDiv);
        }
    });
});