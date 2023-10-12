const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON What would you like to check
        1. Check Balances
        2. Send Funds
        3. Wallet Address`
    } else if (text == '1') {
        // Business logic for first level response
        response = `END You will be notified shortly`;

    } else if (text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        response = `CON Select Token 
            ${token}
        `;
    } else if (text == '3') {
        // This is a second level response where the user selected 1 in the first instance
        // This is a terminal request. Note how we start the response with END
        response = `END You will be notified shortly`;
    }
    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});

