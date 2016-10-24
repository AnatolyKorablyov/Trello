goog.provide("ispring.sample.view.CardView");

goog.require("goog.dom.TagName");
goog.require("ispring.sample.Button");
goog.require("ispring.sample.Config");

/**
 * @export
 */
goog.scope(function()
{
    const Button = ispring.sample.Button;
    /**
     * @constructor
     */
    ispring.sample.view.CardView = goog.defineClass(null, {
        constructor: function (controller)
        {
            this._controller = controller;

            this._i18n = this._controller.getI18n();

            const Config = ispring.sample.Config;
            /**
             * @type {ispring.sample.Config}
             * @private
             */
            this._conf = new Config();

            this._createToolbar();
        },

        /**
         * @private
         */
        _createToolbar: function()
        {
            const thisPtr = this;

            /**
             * @type {Element}
             * @private
             */
            this._cardForm = document.createElement(goog.dom.TagName.DIV);
            this._cardForm.id = this._conf._ID_CARD_PLACE;
        },

        /**
         * @private
         */
        _changeText: function()
        {
            this._btnBackspace._btn.value = this._i18n.getMessageById(this._conf._ID_LABEL_BACKSPACE_BUTTON);
            //document.getElementById(this._conf._ID_MAIN_TOOLBAR).appendChild(this._btnCreate._btn);
        },


        changeLanguage: function()
        {
            this._changeText();
        },

        /**
         * @private
         */
        _createListPanel: function()
        {
            /**
             * @type {Element}
             * @private
             */
            this._listsForm = document.createElement(goog.dom.TagName.DIV);
            this._listsForm.id = this._conf._ID_LIST_PLACE;
            this._listsForm.style.display = 'display: table-row';

            document.getElementById("container").appendChild(this._listsForm);
        },

        /**
         * @param list
         */
        drawLists: function(list)
        {
            const thisPtr = this;
            const listId = list._id;

            this._listForm = document.createElement(goog.dom.TagName.DIV);
            this._listForm.id = 'col1';

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
            this._listForm.appendChild(listNameForm);

            for (var i = 0; i < list._cards.length; ++i)
            {
                var nameCard = list._cards[i].getCardName();

                /**
                 * @type {Element}
                 */
                var cardTitle = document.createElement(goog.dom.TagName.INPUT);
                cardTitle.value = nameCard;
                cardTitle.id = list._cards[i].getCardId();
                cardTitle.className = "card_title_form";

                if (nameCard != "")
                {
                    cardTitle.type = "button";
                }
                else
                {
                    cardTitle.onblur = function()
                    {
                        if (this.value != "")
                        {
                            thisPtr._controller.renameCard(listId, cardTitle.id, this.value);
                        }
                    };
                }

                this._listForm.appendChild(cardTitle);
            }

            var addCard = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_ADD_CARD));

            addCard._btn.style.display = 'display: table-cell';
            addCard._btn.style.background = '#E2E4E6';

            addCard._btn.onclick = function()
            {
                thisPtr._controller.clickAddCard(listId);
            };

            this._listForm.appendChild(addCard._btn);


            this._listsForm.appendChild(this._listForm);
        },


        /**
         * @param {Element} node
         * @private
         */
        _removeChildren: function(node)
        {
            while (node.firstChild)
            {
                node.removeChild(node.firstChild);
            }
        }
    });
});