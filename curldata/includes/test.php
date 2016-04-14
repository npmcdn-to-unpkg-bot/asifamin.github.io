<?php
//rest api call using curl

$url="https://data.qld.gov.au/api/action/datastore_search_sql?sql=SELECT%20*%20from%20%22384429ae-fd27-4448-afe6-e4ecb8d1ad93%22%20WHERE%20service%20ILIKE%20%27%pay%%27";
//  Initiate curl
$ch = curl_init();
// Disable SSL verification
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// Will return the response, if false it print the response
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Set the url
curl_setopt($ch, CURLOPT_URL,$url);
// Execute
$result=curl_exec($ch);
// Closing
curl_close($ch);
//$newResult = json_decode($result, true);

//register mustache library
require '../Mustache/Autoloader.php';
Mustache_Autoloader::register();

$entry = new Mustache_Engine;
$entry_template = file_get_contents('entry.mustache');
//$entry_data = file_get_contents('new.json');
$entry_data = $result;
?>


<?php //showing data using mustache template
echo $entry->render($entry_template, json_decode($entry_data, true)); ?>
