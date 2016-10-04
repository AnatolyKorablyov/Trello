goog.provide("ispring.sample.view.BoardView");

goog.require("goog.dom.TagName");
goog.require("ispring.sample.Button");
goog.require("ispring.sample.Config");
goog.require("ispring.sample.I18n");

/**
 * @export
 */
goog.scope(function()
{
    const I18n = ispring.sample.I18n;
    const Config = ispring.sample.Config;
    const Button = ispring.sample.Button;
    /**
     * @constructor
     */
    ispring.sample.view.BoardView = goog.defineClass(null, {
        constructor: function (controller)
        {
            this._controller = controller;
            this._i18n = new I18n("ru");
            this._conf = new Config();

            this._createToolbar();
        },


        /**
         * @private
         */
        _createToolbar: function()
        {
            const thisPtr = this;

            this._toolbarForm = document.createElement(goog.dom.TagName.DIV);
            this._toolbarForm.id = this._conf._ID_BOARD_TOOLBAR;

            this._btnBackspace = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_BACKSPACE_BUTTON));

            this._btnBackspace._btn.onclick = function ()
            {
                thisPtr._controller.clickBackspace();
            };

            this._toolbarForm.appendChild(this._btnBackspace._btn);
            document.getElementById("container").appendChild(this._toolbarForm);
            this._createListPanel();
        },

        /**
         * @private
         */
        _changeText: function()
        {
            this._btnBackspace._btn.value = this._i18n.getMessageById(this._conf._ID_LABEL_BACKSPACE_BUTTON);
            //document.getElementById(this._conf._ID_MAIN_TOOLBAR).appendChild(this._btnCreate._btn);
        },

        /**
         * @param {string} lang
         */
        changeLanguage: function(lang)
        {
            this._i18n = new I18n(lang);

            this._changeText();
        },

        /**
         * @private
         */
        _createListPanel: function()
        {
            this._listsForm = document.createElement(goog.dom.TagName.DIV);
            this._listsForm.id = this._conf._ID_LIST_PLACE;
            this._listsForm.style.display = 'display: table-row';

            document.getElementById("container").appendChild(this._listsForm);
        },

        /**
         * @param board
         */
        drawLists: function(list)
        {
            const thisPtr = this;
            const listId = list._id;

            var listForm = document.createElement(goog.dom.TagName.DIV);
            listForm.id = 'col1';

            var listNameForm = document.createElement(goog.dom.TagName.INPUT);
            listNameForm.id = list._id;
            listNameForm.value = list._nameList;
            listNameForm.className = "last_name_from";
           // listNameForm.style.display = 'display: table-cell';
          //  listNameForm.style.color = "white";
           // listNameForm.style.background = "blue";


            listNameForm.onblur = function()
            {
                if (this.value != "")
                {
                    thisPtr._controller.renameList(this.id, this.value);
                }
            };
            listForm.appendChild(listNameForm);

            for (var i = 0; i < list._cards.length; ++i)
            {
                // TODO:: вынести стили в css
                var cardTitle = document.createElement(goog.dom.TagName.INPUT);
                cardTitle.value = list._cards[i]._nameCard;
                cardTitle.style.display = 'display: table-cell';
                cardTitle.style.color = "white";
                cardTitle.style.background = "grey";

                cardTitle.onblur = function()
                {
                    if (this.value != "")
                    {
                        thisPtr._controller.renameCard(this.id, i, this.value);
                    }
                };

                listForm.appendChild(cardTitle);
            }

            var addCard = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_ADD_CARD));

            addCard._btn.style.display = 'display: table-cell';
            addCard._btn.style.background = '#E2E4E6';

            addCard._btn.onclick = function()
            {
                thisPtr._controller.clickAddCard(listId);
            };

            listForm.appendChild(addCard._btn);


            this._listsForm.appendChild(listForm);
        },


        /**
         * @param node
         * @private
         */
        _removeChildren: function(node)
        {
            while (node.firstChild)
            {
                node.removeChild(node.firstChild);
            }
        },

        deleteView: function()
        {
            this._removeChildren(this._listsForm);
            //this._listsForm.parentElement.removeChild(this._listForm);
            this._toolbarForm.parentElement.removeChild(this._toolbarForm);
        }
    });
});