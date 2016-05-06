console.log('%c data module loaded ', 'background: #222; color: #bada55');

//global
var qg = qg || {};

// glue
qg.glue = qg.glue || {};

(function($) {
    "use strict";
    glue.data = glue.data || {};
    glue.data.get = function (domain, sql, callbackFunc) {
        $.ajax({
            url: 'https://' + domain + '/api/action/datastore_search_sql',
            data: { sql: sql }
        }).done(callbackFunc);
    };
}(jQuery));

