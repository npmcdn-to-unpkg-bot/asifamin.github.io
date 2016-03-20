$(function() {
    $( "#service-type" ).autocomplete({
        search: function(event, ui) {
            $('.indicator').show();
        },
        multiple: true,
        multipleSeparator: " ",
        highlightItem: true,
        source: function( request, response ) {
            var searchTerm = request.term.toLowerCase();
            $.ajax({
                url: "https://data.qld.gov.au/api/action/datastore_search_sql?sql=SELECT%20*%20from%20%22384429ae-fd27-4448-afe6-e4ecb8d1ad93%22%20WHERE%20service%20ILIKE%20%27%"+searchTerm+"%%27",
                dataType: "jsonp",
                success: function( data ) {
                    if(!data.result.records.length){
                        var result = [
                            {
                                label : 'No matches found',
                                value : response.term
                            }
                        ];
                        response(result);
                    }
                    else {
                        var results = $.map(data.result.records , function(value, key){
                            return value.service;
                        });
                        response(results.slice(0, 5));
                    }
                }
            });
        },
        minLength: 3,
        open: function() {
            $('.indicator').hide();
        }
    });
});


console.log(document.referrer);

var hostName = window.location.hostname;

console.log(hostName);

if((hostName.search(/asifamin/i)) != -1 ){
    $("#department").val("datsip");
}





