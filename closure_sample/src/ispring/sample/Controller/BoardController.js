goog.provide("ispring.sample.controller.BoardController");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.view.BoardView");

goog.require("ispring.sample.controller.ListsController");

/**
 * @export
 */
goog.scope(function()
{
    

    /**
     * @constructor
     * @param {ispring.sample.model.Board} model
     */
    ispring.sample.controller.BoardController = goog.defineClass(null, {
        constructor: function(model)
        {
            const Config = ispring.sample.Config;
            this._conf = new Config();
            this._boardModel = model;

            const thisPtr = this;

            document.addEventListener(this._conf._EVENT_BACKSPACE_TO_TRELLO, function (e) 
            {
                thisPtr._boardView.cleanView();
            });

            document.addEventListener(this._conf._EVENT_CLEAN_VIEW, function(e)
            {
                thisPtr._boardView.cleanView();
            });
        },

        _createListsController: function()
        {
            const ListsController = ispring.sample.controller.ListsController;

            /**
             * @type {ispring.sample.controller.ListsController}
             * @private
             */
            this._listsController = new ListsController(this._boardModel.getLists());

            this._listsController.addParentController(this);
        },

        _createView: function()
        {
            const BoardView = ispring.sample.view.BoardView;

            /**
             * @type {ispring.sample.view.BoardView}
             * @private
             */
            this._boardView = new BoardView(this);

            const thisPtr = this;
            document.addEventListener(this._conf._EVENT_LANGUAGE_MODIFIED, function (e) 
            {
                thisPtr._boardView.changeLanguage();
            });
        },

        /**
         * @param {ispring.sample.controller.BoardsController} controller
         */
        addParentController: function(controller)
        {
            /**
             * @type {ispring.sample.controller.BoardsController}
             * @private
             */
            this._parentController = controller;
            this._createView();

            this._createListsController();
        },

        /**
         * @returns {ispring.sample.I18n}
         */
        getI18n: function()
        {
            return this._parentController.getI18n();
        },

        /*
        removeChildren: function(node)
        {
            while (node.firstChild)
            {
                node.removeChild(node.firstChild);
            }
        },
*/
        /*
        renameList: function(id, newName)
        {
            this._boardModel.renameList(id, newName);
        },

        renameCard: function(id, numId, newName)
        {
            this._boardModel.renameCard(id, numId, newName);    
        },*/
        /*
        drawLists: function()
        {
            this.removeChildren(document.getElementById(this._conf._ID_LIST_PLACE));
            var i = 0;
            while (i < this._boardModel.getNumberLists())
            {
                this._boardView.drawLists(this._boardModel.getList(i));
                i += 1;
            }
        },*/

        clickAddCard: function(id)
        {
            this._boardModel.addCardInLists(id);
            //this.drawLists();
        },
        

        getModel: function()
        {
            return this._boardModel;
        }

    });
});