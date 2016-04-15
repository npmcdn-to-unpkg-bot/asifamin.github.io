<?php
$query = $_GET['sql'];
$template = $_GET['template'];

function getDataCr($query, $template)
{
    $encodedQuery = urlencode($query);
    $proxy = '167.123.1.2:8008';
    $templatePath = "templates/".$template;
    $url = "https://data.qld.gov.au/api/action/datastore_search_sql?sql=".$encodedQuery;
//    echo $url;
//  Initiate curl
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_PROXY, $proxy);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result = curl_exec($ch);
    curl_close($ch);
//$newResult = json_decode($result, true);

//register mustache library
    require(realpath(__DIR__ . '/../Mustache/Autoloader.php'));
//    require '../Mustache/Autoloader.php';
    Mustache_Autoloader::register();

    $entry = new Mustache_Engine;
    $entry_template = file_get_contents($templatePath);
//$entry_data = file_get_contents('new.json');
    $entry_data = $result;

//showing data using mustache template
    echo $entry->render($entry_template, json_decode($entry_data, true));
}


getDataCr($query , $template);








