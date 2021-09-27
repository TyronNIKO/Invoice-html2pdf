<?php

include_once "./index.html";

$json = file_get_contents("./DataBase.json");

echo '<br>';
// var_dump(json_decode($json, true));
$data = json_decode($json, true);
$doDPF = "doPDF.html";

echo '<table><tbody>';
echo '<tr><th>Дата</th><th>Ордер</th><th>Ссылка</th></tr>';
foreach ($data as $key => $value) {
    # code...
    $link = '<a href="./'.$doDPF.'?order='.$value["id"].'">'.$value["id"].'</a>';
    echo '<tr><td>'.$value["date"]."</td><td>".$value["id"]."</td><td>".$link.'</td></tr>';
}
echo '</tbody></table>';