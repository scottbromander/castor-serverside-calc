const express = require('express');
const app = express();
const PORT = 5002;
// Body Parser Module was rolled into Express within the past 3 months
// const bodyParser = require('body-parser');

app.use(express.static('server/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const history = [];

// We need history 
// We need to calculate

/*
    req.body {
        val1: number / string
        val2: number / string
        op: string
    }
*/
app.post('/api/calc', (req,res) => {
    const val1 = parseInt(req.body.val1);
    const val2 = parseInt(req.body.val2);
    let answer = 0;
    const op = req.body.op;

    if(!val1 || !val2) return res.sendStatus(400);

    if (op === "add") {
        answer = val1 + val2;
    } else if (op === "sub") {
        answer = val1 - val2;
    } else if (op === "mul") {
        answer = val1 * val2;
    } else if (op === "div") {
        answer = val1 / val2;
    } else {
        return res.sendStatus(400);
    }

    const equation = {
        val1,
        val2,
        op,
        answer
    }

    history.push(equation);
    // [ {val1: number, val2: number, op: string, answer: number}, {...}, {...} ]

    // switch(op) {
    //     case "add":
    //         answer = val1 + val2;
    //         break;
    //     case "sub":
    //         answer = val1 - val2;
    //         break;
    //     case "mul":
    //         answer = val1 * val2;
    //         break;
    //     case "div":
    //         answer = val1 / val2;
    //         break;
    // }

    res.sendStatus(200);
});

app.get('/api/history', (req,res) =>{
    res.send(history);
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})