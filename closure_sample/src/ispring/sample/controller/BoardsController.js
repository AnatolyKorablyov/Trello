goog.provide("ispring.sample.controller.BoardsController");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.view.BoardsView");
goog.require("ispring.sample.controller.BoardController");

/**
 * @export
 */
goog.scope(function()
{

    /**
     * @constructor
     * @param {ispring.sample.model.BoardsList} model
     */
    ispring.sample.controller.BoardsController = goog.defineClass(null, {
        constructor: function (model)
        {
            const Config = ispring.sample.Config;

            this._conf = new Config();

            this._trelloModel = model;

            /**
             * @type {Array}
             * @private
             */
            this._childConstructors = [];
            
            const thisPtr = this;

            document.addEventListener(this._conf._EVENT_CREATE_BOARD, function (e) 
            {
                thisPtr.createBoard(e.detail.newValue);
            });
            
            document.addEventListener(this._conf._EVENT_BACKSPACE_TO_TRELLO, function (e)
            {
                thisPtr.saveBoard();
                thisPtr._boardsView.showView();
            });

            document.addEventListener(this._conf._EVENT_CLICK_BOARD, function (e)
            {
                thisPtr.clickBoard(e.detail.newValue);
            });

            document.addEventListener(this._conf._EVENT_CLEAN_VIEW, function(e)
            {
                thisPtr._boardsView.cleanView();
            });

            document.addEventListener(this._conf._EVENT_MODIFIED_BOARDS_MODEL, function(e)
            {
                thisPtr.drawBoards();
            });
            
        },


        _createView: function()
        {
            const BoardsView = ispring.sample.view.BoardsView;

            /**
             * @type {ispring.sample.view.BoardsView}
             * @private
             */
            this._boardsView = new BoardsView(this);

            this.drawBoards();
        },


        /**
         * @param {ispring.sample.controller.TrelloController} controller
         */
        addParentController: function(controller)
        {
            /**
             * @type {ispring.sample.controller.TrelloController}
             * @private
             */
            this._parentController = controller;

            this._createView();
        },

        /**
         * @returns {ispring.sample.I18n}
         */
        getI18n: function()
        {
            return this._parentController.getI18n();
        },

        saveBoard: function()
        {
            for (var i = 0; i < this._childConstructors.length; i++)
            {
                this._trelloModel.setBoard(this._childConstructors[i].getModel());
            }
            this._childConstructors = [];
        },
        
        drawBoards: function()
        {
            this._boardsView.cleanView();
            var i = 0;
            while (i < this._trelloModel.getNumberBoards())
            {
                this._boardsView.drawBoards(this._trelloModel.getUserBoard(i));
                i += 1;
            }
        },

        createBoard: function(boardName)
        {
            this._trelloModel.createBoard(boardName);
            this.drawBoards();
        },

        clickBoard: function(boardId)
        {
            this._boardsView.hideView();

            const BoardController = ispring.sample.controller.BoardController;

            /**
             * @type {ispring.sample.controller.BoardController}
             * @private
             */
            this._boardController = new BoardController(this._trelloModel.getBoard(boardId));
            this._boardController.addParentController(this);
            this._childConstructors.push(this._boardController);
        },

        getModel: function()
        {
            return this._trelloModel;
        }

    });
});