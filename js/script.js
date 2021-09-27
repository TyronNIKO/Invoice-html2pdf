document.addEventListener('DOMContentLoaded', function() {
    let element = document.getElementById('element-to-print');
    // var element = document.querySelector(".container");
    let opt;
    let orderNum = document.querySelector("#order-num");
    let curOrderNum = document.querySelector(".curr-order-num span");
    let filename_order;
    let btn_doPDF = document.querySelector(".doPDF");
    let table = document.querySelector(".table");
    let priceArr = document.querySelectorAll('.table .price input');
    let rows = document.querySelector(".table-row");
    let btn = document.createElement("div");

    let summ;
    let total = document.querySelector('.total span.count');
    let curerncySelect = document.querySelectorAll('.choose-currency input');
    let curencyList = document.querySelectorAll('.curency');
    let curerncyArr = ['$', '₪', '€'];
    let templateSelect = document.querySelectorAll('.controls .btn-template');
    let templateHead = document.querySelector('.header img');
    let templateFoot = document.querySelector('.footer img');
    let newPageBtn = document.querySelector('.controls .btn-page');
    let clinic = {
        assutatop: {
            img: {
                header: './img/AssutaTop_off__top@1200px.png',
                footer: './img/AssutaTop_bottom@1200px.png'
            }
        },
        assutacomplex: {
            img: {
                header: './img/AssutaComplex_top@1200px.png',
                footer: './img/AssutaComplex_bottom@1200px.png'
            },
        },
        ichilovtop: {
            img: {
                header: './img/IchilovTop_top@1200px.png',
                footer: './img/IchilovTop_bottom@1200px.png'
            },
        },
        ichilovcomplex: {
            img: {
                header: './img/IchilovComplex_top@1200px.png',
                footer: './img/IchilovComplex_bottom@1200px.png'
            },
        }
    };
    let count = false;
    let ro = new ResizeObserver(entries => {
        for (let entry of entries) {
            let cs = window.getComputedStyle(entry.target);
            CheckContenSize();
            console.log(childsSumm);
            let height = content.offsetHeight - (164 + 25 + 160 + 90);
            console.log(height);
            console.log(count);
            if (height < childsSumm && count === false) {
                console.log("time to do magic");
                let a = document.querySelector(".container");
                let b = document.querySelector("#element-to-print");
                a = a.cloneNode(true);
                document.querySelector('body').appendChild(a);
                count = true;
            }
            // console.log('watching element:', entry.target);
            // console.log(entry.contentRect.top, ' is ', cs.paddingTop);
            // console.log(entry.contentRect.left, ' is ', cs.paddingLeft);
            // console.log(entry.borderBoxSize[0].inlineSize, ' is ', cs.width);
            // console.log(entry.borderBoxSize[0].blockSize, ' is ', cs.height);
            // if (entry.target.handleResize)
            //     entry.target.handleResize(entry);
        }
    });
    let childsSumm;
    let content = document.querySelector('.content');
    let contentTable = document.querySelector('.content .table');
    let childs = contentTable.children;
    let textarea = contentTable.querySelectorAll('textarea');

    let SetTemplate = function(e) {
        let val = e.target.dataset.clinic;
        templateHead.src = clinic[val].img.header;
        templateFoot.src = clinic[val].img.footer;

    }
    let SetCurency = function(e) {
        console.log(e.target.value);
        curencyList.forEach(item => {
            item.innerHTML = curerncyArr[e.target.value - 1];
        });
    }
    let PdfSettings = function(e) {
        filename_order = e.target.value;
        opt = {
            margin: 0,
            filename: 'invoice' + '_' + filename_order + '.pdf',
            image: {
                type: 'jpeg',
                quality: 1
            },
            html2canvas: {
                scale: 1
            },
            jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'portrait'
            }
        };
    }

    let SetDate = function() {
        let date = new Date(),
            day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (day < 10) {
            day = "0" + day;
        }
        document.querySelector(".order-date .curr-date span").innerHTML = day + "-" + months[month] + "-" + year;
    }
    let ChangeOrder = function(e) {
        curOrderNum.innerHTML = e.target.value;
        console.log("changed");
    }
    let GetPrice = function(e) {
        let val, sum = 0;
        priceArr.forEach(element => {
            val = parseInt(element.value);
            // console.log("97 el val",val,typeof val);
            if (!val) {
                // console.log("NaN");
            } else if (val >= 0) {
                // console.log("not nan and more than 0");
                sum += val;
            } else if (val < 0) {
                // console.log("not nan and less than 0");
                sum += val;
            }
        });
        summ = sum;
        return summ;
    }
    let ChangeTotal = function() {
        // console.log("summ",summ);
        total.textContent = summ + '.00';
    }
    let CheckContenSize = function() {
        childsSumm = 30;
        for (let i = 0; i < childs.length; i++) {
            childsSumm += childs[i].offsetHeight + 5;
        }
    }
    let RowAddingBtn = function() {
        btn.classList.add("table-row-add");
        btn.setAttribute('title','Добавить строку');
        table.append(btn);
    }
    let AddNewTableRow = function(e) {
        let a = document.createElement('div');
        a.classList.add('row','table-row');
        a.setAttribute('data-row','');
        a.innerHTML = `<div><input type="text"></div><div class="desc"><textarea data-area="1"></textarea></div><div class="price"><span class="curency"></span><input type="number"></div>`;
        table.append(a);
        
    }
    let AddNewPage = function() {
        console.log("new page");
        let a = document.querySelector(".header");
        let b = document.querySelector(".content");
        let c = document.querySelector(".footer");
        a = a.cloneNode(true);
        b = b.cloneNode(false);
        c = c.cloneNode(true);
        document.querySelector('#element-to-print').append(a,b,c);
    }
    let doPDF = function() {
        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();
    }
    /*Inits*/
    SetDate();
    templateSelect.forEach(item => {
        item.addEventListener('click', SetTemplate)
    })
    curerncySelect.forEach(item => {
        item.addEventListener('change', SetCurency)
    })
    orderNum.addEventListener('change', (e) => {
        ChangeOrder(e);
        PdfSettings(e);
    });
    priceArr.forEach(function(element) {
        element.addEventListener('change', (e) => {
            GetPrice(e);
            ChangeTotal(e)
        });
    });
    RowAddingBtn();
    btn.addEventListener('click', AddNewTableRow);
    newPageBtn.addEventListener('click', AddNewPage);
    /*Check if textarea resize and overflow size of container*/
    // textarea.forEach(area => {
    //     ro.observe(area);
    // })
    btn_doPDF.addEventListener('click', doPDF);
});