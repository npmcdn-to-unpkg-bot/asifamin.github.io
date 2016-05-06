console.log('%c data module loaded ', 'background: #222; color: #bada55');
// globals
var qg = qg || {};

/*global qg*/
(function(qg) {
    'use strict';

    // get data
    qg = qg || {};
    qg.data = qg.data || {};


    // TODO make this a promise
    qg.data.get = function( domain, sql, options ) {
        var errorCallback;

        if ( $.isFunction( options )) {
            options = {
                successCallback: options,
                cache: false
            };
        } else {
            options = $.extend({ cache: false }, options );
        }

        errorCallback = function() {
            $('#showError').modal('show');
        };

        $.jsonp({
            url: 'https://' + domain + '/api/action/datastore_search_sql',
            data: { sql: sql },
            callbackParameter: 'callback',
            success: options.successCallback,
            error: errorCallback,
            pageCache: options.cache
        });
    };
}(qg));


