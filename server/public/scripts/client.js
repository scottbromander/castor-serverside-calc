$(document).ready(init);

let op = '';
let history = [];

function init() {
    $(".js-btn-math").on('click', clickMath);
    $("#js-btn-eq").on('click', evaluate);
    $('#js-btn-clear').on('click', clear);

    getData();
}

function clickMath() {
    op = $(this).data('math');
    console.log(op);
}

function evaluate() {
    const val1 = $("#js-input-val1").val();
    const val2 = $("#js-input-val2").val();

    if(!val1 || !val2 || !op) {
        return alert('Enter in values, yo!');
    }

    const dataForServer = {
        val1,
        val2,
        op
    }

    postData(dataForServer);
}

function postData(dataForServer) {
    $.ajax({
        type: "POST",
        url: "/api/calc",
        data: dataForServer
    }).then((response) => {
        getData();
    }).catch((err) => {
        console.log(err);
    })
}

function getData() {
    $.ajax({
        type: "GET",
        url: "/api/history"
    }).then((response) => {
        history = response;
        render();
    }).catch(err => {
        console.log(err);
    })
}

// POST -> GET
// GET -> RENDER

function clear() {
    $("#js-input-val1").val('');
    $("#js-input-val2").val('');
    op = '';
}

function render() {
    $("#js-container").empty();

    for (let item of history) {

        let opString = '';

        if (item.op === "add") {
            opString = "+";
        } else if(item.op === "sub") {
            opString = "-";
        } else if(item.op === "mul") {
            opString = "*";
        } else if(item.op === "div") {
            opString = "/";
        }  

        $("#js-container").append(`
            <div>
                <p>${item.val1} ${opString} ${item.val2} = ${item.answer}</p>
            </div>
        `);
    }
}