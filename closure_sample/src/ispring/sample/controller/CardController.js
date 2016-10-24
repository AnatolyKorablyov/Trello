goog.provide("ispring.sample.controller.CardController");

goog.require("goog.dom.TagName");
goog.require("ispring.sample.Config");

goog.require("ispring.sample.view.CardView");

/**
 * @export
 */
goog.scope(function()
{
    /**
     * @constructor
     * @param {ispring.sample.model.Card} model
     */
    ispring.sample.controller.CardController = goog.defineClass(null, {
        constructor: function(model)
        {
            const Config = ispring.sample.Config;
            this._conf = new Config();
            this._cardModel = model;

            const thisPtr = this;
            
        },

        _createView: function()
        {
            const CardView = ispring.sample.view.CardView;

            this._cardView = new CardView(this);

            const thisPtr = this;
            document.addEventListener(this._conf._EVENT_LANGUAGE_MODIFIED, function (e)
            {
                thisPtr._cardView.changeLanguage();
            });
        },

        /**
         * @param {ispring.sample.controller.ApplicationController} controller
         */
        addParentController: function(controller)
        {
            this._parentController = controller;
            this._createView();
        },

        /**
         * @returns {string}
         */
        getLanguage: function()
        {
            return this._parentController.getLanguage();
        },

        /**
         * @returns {ispring.sample.I18n}
         */
        getI18n: function()
        {
            return this._parentController.getI18n();
        },

        removeChildren: function(node)
        {
            while (node.firstChild)
            {
                node.removeChild(node.firstChild);
            }
        },
        
        getModel: function()
        {
            return this._cardModel;
        }

    });
});