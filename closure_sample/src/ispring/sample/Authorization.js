goog.provide("ispring.sample.Authorization");
goog.require("ispring.sample.I18n");
goog.require("goog.dom.TagName");
goog.require("ispring.sample.Config");
goog.require("ispring.sample.ShaCrypt");

 /**
 * @export
 */
goog.scope(function()
{
    const CONFIG = ispring.sample.Config;
    const I18N = ispring.sample.I18n;
    const CRYPT = ispring.sample.ShaCrypt;
    /**
     * @constructor
     */
    ispring.sample.Authorization = goog.defineClass(null, {
        constructor: function () {
            this._conf = new CONFIG();
            this._i18n = new I18N();
            this._crypt = new CRYPT();
            
            this.UsersInit();
            this.FormAuthorizationInit();
        },
        showError: function (container, errorMessage) {
            container.className = 'error';
            var msgElem = document.createElement(goog.dom.TagName.SPAN);
            msgElem.className = "error-message";
            msgElem.innerHTML = errorMessage;
            container.appendChild(msgElem);
        },

        resetError: function (container) {
            container.className = '';
            if (container.lastChild.className == "error-message") { // в константу
                container.removeChild(container.lastChild);
            }
        },
        FormAuthorizationInit: function()
        {
            var AuthorizationForm = document.createElement(goog.dom.TagName.DIV);
            AuthorizationForm.id = this._conf._ID_AUTHORIZATION_FORM;
            AuthorizationForm.style = "display: table horizontal-";

            var loginForm = document.createElement(goog.dom.TagName.DIV);
            loginForm.style = 'display: table-row';

            var loginMessage = document.createElement(goog.dom.TagName.LABEL);
            loginMessage.id = this._conf._ID_LABEL_USER_NAME_MESSAGE;
            loginMessage.innerHTML = this._i18n.getMessageById("LOGIN") + " ";
            loginMessage.style = "display: table-cell";
            loginForm.appendChild(loginMessage);

            var loginInput = document.createElement(goog.dom.TagName.INPUT);
            loginInput.id = this._conf._ID_INPUT_USER_NAME;
            loginInput.type = "text";
            loginInput.style = "display: table-cell";
            loginForm.appendChild(loginInput);

            AuthorizationForm.appendChild(loginForm);

            var passForm = document.createElement(goog.dom.TagName.DIV);
            passForm.style = 'display: table-row';

            var passMessage = document.createElement(goog.dom.TagName.LABEL);
            passMessage.id = this._conf._ID_LABEL_PASSWORD_MESSAGE;
            passMessage.innerHTML = this._i18n.getMessageById("PASSWORD") + " ";
            passMessage.style = "display: table-cell";
            passForm.appendChild(passMessage);

            var passInput = document.createElement(goog.dom.TagName.INPUT);
            passInput.id = this._conf._ID_INPUT_PASSWORD;
            passInput.type = "password";
            passInput.style = "display: table-cell";
            passForm.appendChild(passInput);

            AuthorizationForm.appendChild(passForm);
            
            
            document.getElementById("container").appendChild(AuthorizationForm);
        },
        ValidationUser: function()
        {
            var login = document.getElementById(this._conf._ID_INPUT_USER_NAME);
            var pass = document.getElementById(this._conf._ID_INPUT_PASSWORD);
            var resultValidationLogin = login.value.match(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i);
            if (resultValidationLogin == null)
            {
                this.resetError(login.parentNode);
                this.showError(login.parentNode, " " + this._i18n.getMessageById(this._conf._ID_INCORRECT_LOGIN_MESSAGE));
            }
            else
            {
                this.resetError(login.parentNode);
                this.resetError(pass.parentNode);
                if (!pass.value)
                {
                    this.showError(pass.parentNode, " " + this._i18n.getMessageById(this._conf._ID_EMPTY_PASS_MESSAGE));
                }
                else if (pass.value.length < 4)
                {
                    this.showError(pass.parentNode, " " + this._i18n.getMessageById(this._conf._ID_SHORT_PASS_MESSAGE));
                }
                else if (this._users[login.value] == null)
                {
                    if (confirm(this._i18n.getMessageById(this._conf._ID_CREATE_ACCOUNT_MESSAGE)))
                    {
                        this._users[login.value] = this._crypt.sha1(pass.value);
                        window.localStorage.setItem('users', JSON.stringify(this._users));
                        document.getElementById("container").removeChild(document.getElementById(this._conf._ID_AUTHORIZATION_FORM));
                        window.varLogin = login.value;
                        return true;
                    }
                    else
                    {
                        this.showError(pass.parentNode, this._i18n.getMessageById(this._conf._ID_NO_LOGIN_MESSAGE));
                    }
                }
                else
                {
                    if (this._crypt.sha1(pass.value) == this._users[login.value])
                    {
                        document.getElementById("container").removeChild(document.getElementById(this._conf._ID_AUTHORIZATION_FORM));
                        window.varLogin = login.value;
                        return true;
                    }
                    else
                    {
                        this.showError(pass.parentNode, this._i18n.getMessageById(this._conf._ID_WRONG_PASS_MESSAGE));
                    }
                }
            }
            return false;
        },
        UsersInit: function()
        {
            this._users = {"admin": this._crypt.sha1("admin")};
            var loginStorage = window.localStorage.getItem('users');
            if (loginStorage != null)
            {
                this._users = JSON.parse(loginStorage);
            }
        }
    });
});
/*
Authorization.start = function()
{
    function showError(container, errorMessage) {
        container.className = 'error';
        var msgElem = document.createElement('span');
        msgElem.className = "error-message";
        msgElem.innerHTML = errorMessage;
        container.appendChild(msgElem);
    }

    function resetError(container) {
        container.className = '';
        if (container.lastChild.className == "error-message") { // в константу
            container.removeChild(container.lastChild);
        }
    }
*/

    /**
     *
     * @type {string}
     */
 //  var login = document.LogIn.iName.value;
    /**
     *
     * @type {string}
     */
  //  var password = document.LogIn.iPass.value;
    /**
     *
     * @type {Array|{index: number, input: string}}
     */
  //  var resultValidationLogin = login.match(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i);

 /*   if (resultValidationLogin == null)
    {
        resetError(document.LogIn.iName.parentNode);
        showError(document.LogIn.iName.parentNode, ' Некорректный логин');
    }
    else
    {
        resetError(document.LogIn.iPass.parentNode);
        if (!document.LogIn.iPass.value)
        {
            showError(document.LogIn.iPass.parentNode, " Пароль не может быть пустым");
        }
        else if (password.length < 4)
        {
            showError(document.LogIn.iPass.parentNode, " Пароль не может содержать меньше 4 символов!");
        }
        else if (users[login] == null)
        {
            if (confirm('Создать новый аккаунт?'))
            {
                users[login] = sha1(password);
                localStorage.setItem('users', JSON.stringify(users));
                document.getElementById('Authorization').style.display = 'none';
                window.varLogin = login;
                return true;
            }
            else
            {
                showError(document.LogIn.iPass.parentNode, " Вы ввели несуществующий логин");
            }
        }
        else
        {
            if (sha1(password) == users[login])
            {
                document.getElementById('Authorization').style.display = 'none';
                window.varLogin = login;
                return true;
            }
            else
            {
                showError(document.LogIn.iPass.parentNode, " Пароль неверный");
            }
        }
    }

};
*/