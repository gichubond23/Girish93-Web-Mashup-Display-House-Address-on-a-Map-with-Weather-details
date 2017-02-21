<?php
  header("Accept: application/xml");
  $host = " http://api.geonames.org/findNearByWeatherXML";
  $query = $_SERVER['QUERY_STRING'];
 echo '<?xml version="1.0"?>';  $ch = curl_init($host . "?" . $query);
  curl_exec($ch);
  curl_close($ch);
?>
