console.log('%c data module loaded ', 'background: #222; color: #bada55');

//global
var qg = qg || {};
// glue
qg.glue = qg.glue || {};
// module
qg.glue.data = qg.glue.data || {};

(function($) {
    "use strict";
    qg.glue.data.get = function (domain, sql, callbackFunc) {
        $.ajax({
            url: 'https://' + domain + '/api/action/datastore_search_sql',
            data: { sql: sql }
        }).done(callbackFunc);
    };
}(jQuery));


//# sourceMappingURL=data.js.map
