<?php
$serv_path = "$_SERVER[DOCUMENT_ROOT]".dirname($_SERVER["PHP_SELF"]);
$path = "$_SERVER[REQUEST_URI]";
$db_file = $serv_path."/Data.json";
$status = 1;

if (!empty($_POST)) {

    if (!file_exists($db_file)) {
        file_put_contents(
            $db_file,
            json_encode([], JSON_UNESCAPED_UNICODE)
        );
    }

    $invoices = json_decode(file_get_contents($db_file), true);

    $invoice = $_POST;
    $invoice['id'] = (int)$_POST['id'];

    if ($invoice['id'] > 0) {
        if ($invoice['del'] == 1) {
            foreach ($invoices as $k => $inv) {
                if ($inv['id'] == $invoice['id']) {
                    unset($invoices[$k]);
                }
            }
            $status = 2;
        } else {
            foreach ($invoices as $k => $inv) {
                if ($inv['id'] == $invoice['id']) {
                    $invoice['add_date'] = $inv['add_date'];
                    $invoice['edit_date'] = date('Y-m-d H:i:s');
                    $invoices[$k] = $invoice;
                }
            }
        }
    } else {
        $invoice['id'] = count($invoices) + 1;
        $invoice['add_date'] = date('Y-m-d H:i:s');
        $invoices[] = $invoice;
    }


    file_put_contents(
        $db_file,
        json_encode($invoices, JSON_UNESCAPED_UNICODE)
    );

    echo json_encode(['status' => $status]);
    die;
}

$invoices_list = [];
if (file_exists($db_file)) {
    $invoices_list = json_decode(file_get_contents($db_file), true);
    $invoices_list = array_reverse($invoices_list);
}
// var_dump($invoices_list); die;
?>

<!doctype html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compfunction searchByName() {
    let searchInput = document.querySelector('#search_input').value;
    alert(searchInput);
}atible" content="ie=edge">
    <title>Список инвойсов</title>
    <link rel="stylesheet" href="./css/styles.css">
</head>


<body>
    <div class="orders">
        <div class="header">
            <h1>Список инвойсов</h1><a href="<?php echo $path?>doPDF.php">Добавить инвойс</a>
        </div>
        <div class="list">
            <table>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="search">
                        <input id="search_input" type="text" placeholder="Поиск по ФИ" value>
                    <button class="btn btn-success" id="search_btn" onclick="searchByName()">Найти</button>
                </td>
                    <td></td>
                </tr>
                <tr>
                    <td>ID</td>
                    <td>Дата создания</td>
                    <td>Order №</td>
                    <td>ФИ пациента</td>
                    <td>Шаблон</td>
                </tr>
                <?php
                    foreach ($invoices_list as $invoice) {
                    // var_dump($invoice);
                ?>
                <tr>
                    <td><?php echo $invoice['id']; ?></td>
                    <td>
                        <a href="<?php echo $path?>doPDF.php?id=<?php echo $invoice['id']; ?>"><?php echo date('d.m.Y в H:i', strtotime($invoice['add_date'])); ?></a>
                    </td>
                    <td class="invoice_id"><?php echo $invoice['invoice_id']; ?></td>
                    <td class="patient_name"><?php echo $invoice['patient_name']; ?></td>
                    <td class="template"><?php echo $invoice['template']; ?></td>
                </tr><?php
            }
            ?>
            </table>
        </div>
        <div class="version" style="margin-top:30px;">2021.11.16 | Vladimir Belogorodskiy | main</div>
    </div>
</body>
<script>
function searchByName() {
    let searchInput = document.querySelector('#search_input');
    console.log(searchInput.value);
    if(searchInput.value.length >= 2){
        let nameList = document.querySelectorAll(".patient_name");
        console.log(nameList);
        nameList.forEach(element => {
            let str = element.innerHTML.toLowerCase();
            if(!str.includes(searchInput.value)){
                element.closest("tbody tr").style = "display:none;";
                console.log("no includes");
            }else{
                console.log(element);
            }
        });
    }else{
        alert("Введите минимум 3 буквы ФИ");
    }
}
</script>
</html>