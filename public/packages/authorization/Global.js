'use strict';

//Global service for global variables
angular.module('eightApp').factory('Global', [

    function() {
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: false
        };
        return _this._data;
    }
]);
