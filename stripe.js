const stripe = require('stripe')('sk_test_iVdGivJxl2WWBAYSdWuPxFxq00X86Ao5gF');
const express = require('express');
const app = express();
const cors = require('cors')
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(cors());

let paymentIntent = null;

//starting the server....
app.listen(3000, () => {
    console.log(`running at port 3000`);
});

(async () => {
    paymentIntent = await stripe.paymentIntents.create({
        amount: 50,
        currency: 'inr',
        // Verify your integration in this guide by including this parameter
        metadata: { integration_check: 'accept_a_payment' },
    });
    console.log(paymentIntent);
})();

//API  to send client_secret to front-end.
app.get("/get_payment_intent", (req, res) => {
    console.log(req, res);
    res.status(200).send(paymentIntent);
});

