goog.provide("ispring.sample.view.ListsView");

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
    ispring.sample.view.ListsView = goog.defineClass(null, {
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
            
            this._createListPanel();
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

            /**
             * @type {Element}
             * @private
             */
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
        },

        
        cleanView: function()
        {
            //this._removeChildren(this._listForm);
            this._removeChildren(this._listsForm);
        },

        deleteView: function()
        {
            this.cleanView();
            this._listsForm.parentNode.removeChild(this._listsForm);
        }
    });
});