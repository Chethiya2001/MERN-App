const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//all currency
app.get("/getAllCurrencies", async (req, res)=>{
    const nameURl = `https://openexchangerates.org/api/currencies.json?app_id=ad145e1527fa4bc0a5d2aca3ce3393da`;

    try {
        
        const nameResponse = await axios.get(nameURl);
        const nameData = nameResponse.data;

        return res.json(nameData);


    } catch (error) {
        console.log(error);
    }
});
//cal target amount
app.get("/convert", async(req, res)=>{
    const {
        date,
        Soursecurrency,
        Targetcurrency,
        AmountSourcecurrency
    } = req.query;

    const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=ad145e1527fa4bc0a5d2aca3ce3393da`;

    const dataresponse =  await axios.get(dataURL);
    const rates = dataresponse.data.rates;

    //rates
    const sourceRate = rates[Soursecurrency];
    const targetRate = rates[Targetcurrency];

    //FINAL VALUE
    const targetAmount = (targetRate / sourceRate) * AmountSourcecurrency;

    return res.json(targetAmount.toFixed(3));

})


//listn to the port
app.listen(5000, ()=>{
    console.log("Server started..")
})


//maths

// target amount = (tartget rate / source rate) * source amount

