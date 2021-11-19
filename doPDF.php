<?php
$serv_path = "$_SERVER[DOCUMENT_ROOT]".dirname($_SERVER["PHP_SELF"]);
$path = "$_SERVER[REQUEST_URI]";
$db_file = $serv_path."/Data.json";
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

$invoice = [
    "id" => 0,
    "invoice_id" => "",
    "patient_name" => "",
    "patient_date" => "",
    "country" => "",
    "cur_date" => "",
    "currency" => "0",
    "template" => "assutatop",
    "rows" => [["", "", ""]],
    "id" => 0
];
if (file_exists($db_file)) {
    $invoices = array_reverse(json_decode(file_get_contents($db_file), true));
    if (!empty($invoices)) {
        foreach ($invoices as $inv) {
            if ($inv['id'] == $id) {
                $invoice = $inv;
                break;
            }
        }
    }
}
// var_dump($invoices);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $invoice['invoice_id'] ? $invoice['invoice_id'] : "New";?>_Invoice </title>
    <script src="./dist/html2pdf.bundle.min.js"></script>
    <script src="./js/script.js"></script>
    <link rel="stylesheet" href="./css/styles.css">
</head>

<body>
    <div class="container">
        <div id="element-to-print">
            <div class="page">
                <section class="header">
                    <img src="./img/AssutaTop_off__top@1200px.png" alt="">
                </section>
                <section class="content">
                    <div class="row order-num">
                        <div class="field-group">
                            <label for="order-num">Order №:</label>
                            <input type="number" id="order-num" value="<?php echo $invoice['invoice_id']; ?>">
                        </div>
                    </div>
                    <div class="row">
                        <div class="divider">Order</div>
                    </div>
                    <div class="row customer">
                        <div class="customer-info">
                            <div class="title">Customer</div>
                            <div class="field-group">
                                <label for="">Patien Name:</label>
                                <input type="text" id="patient_name" value="<?php echo $invoice['patient_name']; ?>">
                            </div>
                            <div class="field-group">
                                <label for="">Date of birth:</label>
                                <div id="patient_date"><?php echo $invoice['patient_date']?$invoice['patient_date']:"Введите дату"?></div>
                                <input type="date" class="patient_date">
                            </div>
                            <div class="field-group">
                                <label for="">Country:</label>
                                <input type="text" id="country" value="<?php echo $invoice['country']; ?>">
                            </div>
                        </div>
                        <div class="order-date">
                            <div class="curr-date">Date: <span><?php echo $invoice['cur_date'] ? $invoice['cur_date'] : date('d-m-Y'); ?></span></div>
                            <div class="curr-order-num">Order №: <span></span></div>
                            <div class="date-correction"><input type="date"></div>
                        </div>
                    </div>
                    <div class="table-wrap">
                        <div class="tbl">
                            <div class="table">
                                <div class="row">
                                    <div>Qty</div>
                                    <div>Description</div>
                                    <div>Total</div>
                                </div>
                                <?php
                                foreach ($invoice['rows'] as $row) { ?>
                                <div class="row table-row">
                                    <div><input type="text" class="rowQty" value="<?php echo $row[0]; ?>"></div>
                                    <div class="desc">
                                        <div contenteditable="true" class="rowDescription"><?php echo $row[1]; ?></div>
                                    </div>
                                    <div class="price"><span class="curency"></span>
                                        <input type="text" class="rowPrice" value="<?php echo $row[2]; ?>">
                                    </div>
                                </div>
                                <?php } ?>
                            </div>
                        </div>
                    </div>
                    <div class="row page_number">
                        1
                    </div>

                    <div class="row total" id="total">
                        <div class="bank-details">
                            <div class="title">Bank details</div>
                            <ul>
                                <li>ACCOUNT NUMBER: 66551112</li>
                                <li>BANK NAME: MERCANTILE DISCOUNT BANK LTD</li>
                                <li>BRANCH NAME: (AND NUMBER) (672)HASHALOM</li>
                                <li>SWIFT CODE: BARDILIT</li>
                                <li>IBAN: IL200176720000066551112</li>
                                <li>ACCOUNT NAME: TOP EXPERTS CENTER LTD</li>
                            </ul>
                            <img class="bank-details-stamp" data-clinic-stamp="assutatop" id="blank-stamp" src="" alt="" width="300" height="300">
                        </div>
                        <div class="total-info">
                            <div>
                                Total: <span class="curency"></span>&nbsp;<span class="count">0.00</span>
                            </div>
                            <button id="total-btn" class="total-btn">Пересчитать</button>
                            
                        </div>
                    </div>
                </section>
                <section class="footer"><img src="./img/AssutaTop_bottom@1200px.png" alt=""></section>
            </div>
        </div>
    </div>
    <div class="controls fixed">
        <button onclick="goBack()" class="btn" style="background-color: red;">Назад</button>
        <div class="title">Выберите клинику</div>
        <button class="btn btn-template" data-clinic="assutatop">Шаблон Ассута Топ</button>
        <button class="btn btn-template" data-clinic="assutacomplex">Шаблон Ассута Комплекс</button>
        <button class="btn btn-template" data-clinic="ichilovtop">Шаблон Ихилов Топ</button>
        <button class="btn btn-template" data-clinic="ichilovcomplex">Шаблон Ихилов Комплекс</button>
        <div class="title">Настройки документа</div>
        <button class="btn btn-warning btn-page" id="btn-new-page">Добавить страницу</button>
        <?php if ($invoice['id'] > 0) { ?>
        <button class="btn btn-warning" id="removePage">Удалить страницу</button>
        <?php } ?>
        <div class="choose-currency">
            <div class="title">Выберите валюту</div>
            <div>
                <input type="radio" id="dollar_curr" name="currency" value="0" <?php echo ($invoice['currency'] == 0)?' checked="checked"':''; ?>>
                <label for="dollar_curr">Доллар $</label>
            </div>
            <div>
                <input type="radio" id="sheqel_curr" name="currency" value="1" <?php echo ($invoice['currency'] == 1)?' checked="checked"':''; ?>>
                <label for="sheqel_curr">Шекель ₪</label>
            </div>
            <div>
                <input type="radio" id="euro_curr" name="currency" value="2" <?php echo ($invoice['currency'] == 2)?' checked="checked"':''; ?>>
                <label for="euro_curr">Евро €</label>
            </div>
        </div>
        <button class="btn btn-success" id="doPDF">Сохранить/PDF</button>

        <input id="template" type="hidden" value="<?php echo $invoice['template']; ?>">
        <input id="id" type="hidden" value="<?php echo $invoice['id']; ?>">

        <div class="text-template">
            <button class="btn btn-warning" data-get-modal="simple-modal">Заметки</button>
        </div>
    </div>

    <div class="modals">
        <div class="modals__modal" data-modal="simple-modal">
            <div class="modals__modal-row">
                <div class="modals__modal-block">
                    <div class="modals__cols">
                        <div class="modals__col">
                            <p class="modals__col-title">Оригинал</p>
                            <div contenteditable="true" class="text original"></div>
                        </div>
                        <div class="modals__col">
                            <p class="modals__col-title">Перевод</p>
                            <div contenteditable="true" class="text transleted"></div>
                        </div>
                    </div>
                    <div class="modals__close" data-close-modal="simple-modal">X</div>
                </div>
            </div>
        </div>
    </div>
</body>
<script>
    function goBack() {
        window.history.back();
    }

    function changePatientDate() {
        let patientDate = document.querySelector("#patient_date"),
            patientInput = document.querySelector(".patient_date");
        patientInput.addEventListener('change', function() {
            if (patientInput) {
                var date = patientInput.value;
                date = date.split("-").reverse().join(".");
                patientDate.innerHTML = date;
            } else {
                console.log('no date selected ', patientInput);
            }
        })
    }
    changePatientDate();

    function changeCurrentDate() {
        let currDate = document.querySelector(".curr-date span"),
            currInput = document.querySelector(".date-correction input");
        currInput.addEventListener('change', function() {
            if (currInput) {
                var date = currInput.value;
                date = date.split("-").reverse().join("-");
                currDate.innerHTML = date;
            } else {
                console.log('no date selected ', currInput);
            }
        })
    }
    changeCurrentDate();
</script>

</html>