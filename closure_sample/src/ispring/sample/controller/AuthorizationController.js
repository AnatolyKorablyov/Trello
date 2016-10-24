goog.provide("ispring.sample.controller.AuthorizationController");

//goog.require("goog.dom.TagName");

//goog.require("ispring.sample.I18n");
goog.require("ispring.sample.Config");
goog.require("ispring.sample.ShaCrypt");
goog.require("ispring.sample.view.AuthorizationView");
goog.require("ispring.sample.model.AuthorizationModel");

/**
 * @export
 */
goog.scope(function()
{
    //const I18n = ispring.sample.I18n;

    /**
     * @constructor
     * @param {ispring.sample.model.AuthorizationModel} model
     */
    ispring.sample.controller.AuthorizationController = goog.defineClass(null, {
        constructor: function (model)
        {
            const thisPtr = this;

            const Config = ispring.sample.Config;

            /**
             * @type {ispring.sample.Config}
             * @private
             */
            this._conf = new Config();

            const ShaCrypt = ispring.sample.ShaCrypt;

            /**
             * @type {ispring.sample.ShaCrypt}
             * @private
             */
            this._crypt = new ShaCrypt();

            this._authorizationModel = model;

            document.addEventListener(this._conf._EVENT_LANGUAGE_MODIFIED, function(e)
            {
                thisPtr._changeLanguage();
            });
        },

        /**
         * @private
         */
        _changeLanguage: function()
        {
            this._authorizationView.changeLanguage();
            this._resetErrors();
        },

        /**
         * @param {ispring.sample.controller.ApplicationController} controller
         */
        addParentController: function(controller)
        {
            /**
             * @type {ispring.sample.controller.ApplicationController}
             * @private
             */
            this._parentController = controller;

            /**
             * @type {ispring.sample.I18n}
             * @private
             */
            this._i18n = this._parentController.getI18n();

            const AuthorizationView = ispring.sample.view.AuthorizationView;
            /**
             * @type {ispring.sample.view.AuthorizationView}
             * @private
             */
            this._authorizationView = new AuthorizationView(this);
        },

        /**
         * @returns {ispring.sample.I18n}
         */
        getI18n: function()
        {
            return this._parentController.getI18n();
        },

        buttonSendAct: function()
        {
            if (this.validationUser())
            {
                this._parentController.authorizationComplete(this._authorizationModel.getUserName());
            }
        },

        /**
         * @private
         */
        _resetErrors: function()
        {
            this._authorizationView.resetAllErrors();
        },

        /**
         * @return {ispring.sample.model.AuthorizationModel}
         */
        getModel: function()
        {
            return this._authorizationModel;
        },


        validationUser: function()
        {
            var login = document.getElementById(this._conf._ID_INPUT_USER_NAME);
            var pass = document.getElementById(this._conf._ID_INPUT_PASSWORD);
            var resultValidationLogin = login.value.match(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i);
            if (resultValidationLogin == null)
            {
                this._authorizationView.resetError(login.parentNode);
                this._authorizationView.showError(login.parentNode, " " + this._i18n.getMessageById(this._conf._ID_INCORRECT_LOGIN_MESSAGE));
            }
            else
            {
                this._authorizationView.resetError(login.parentNode);
                this._authorizationView.resetError(pass.parentNode);
                if (!pass.value)
                {
                    this._authorizationView.showError(pass.parentNode, " " + this._i18n.getMessageById(this._conf._ID_EMPTY_PASS_MESSAGE));
                }
                else if (pass.value.length < 4)
                {
                    this._authorizationView.showError(pass.parentNode, " " + this._i18n.getMessageById(this._conf._ID_SHORT_PASS_MESSAGE));
                }
                else if (this._authorizationModel.getPass(login.value) == null)
                {
                    if (confirm(this._i18n.getMessageById(this._conf._ID_CREATE_ACCOUNT_MESSAGE)))
                    {
                        this._authorizationModel.addUser(login.value, this._crypt.sha1(pass.value));
                        this._authorizationModel.setUserName(login.value);
                        document.getElementById("container").removeChild(document.getElementById(this._conf._ID_AUTHORIZATION_FORM));
                        window.varLogin = login.value;
                        return true;
                    }
                    else
                    {
                        this._authorizationView.showError(pass.parentNode, this._i18n.getMessageById(this._conf._ID_NO_LOGIN_MESSAGE));
                    }
                }
                else
                {

                    if (this._crypt.sha1(pass.value) == this._authorizationModel.getPass(login.value))
                    {
                        this._authorizationModel.setUserName(login.value);
                        document.getElementById("container").removeChild(document.getElementById(this._conf._ID_AUTHORIZATION_FORM));
                        window.varLogin = login.value;
                        return true;
                    }
                    else
                    {
                        this._authorizationView.showError(pass.parentNode, this._i18n.getMessageById(this._conf._ID_WRONG_PASS_MESSAGE));
                    }
                }
            }
            return false;
        }
    });
});