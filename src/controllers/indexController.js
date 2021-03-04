const request = require("request-promise");
const cheerio = require("cheerio");
const { json, errorJson } = require("../utils/response");

exports.index = (req, res) => {
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

    return json(res, {
        maintainer: "Azhari Muhammad M <azhari.marzan@gmail.com>",
        source: "https://github.com/azharimm/currency-exchange-api",
        list_currency: {
            endpoint: fullUrl+'list-currency'
        },
        calculator: {
            endpoint: fullUrl+'calculator?from={currCode}&to={currCode}&amount={amount}',
            example: fullUrl+'calculator?from=USD&to=IDR&amount=1000',
        }
    });
};

exports.calculator = async (req, res) => {
    try {
        let baseUrl = `${process.env.BASE_URL}`;
        const { from, to, amount } = req.query;
        if (from != null && to != null && amount != null) {
            baseUrl = `${process.env.BASE_URL}?from=${from}&to=${to}&amount=${parseInt(amount)}`;
        }
        const htmlResult = await request.get(baseUrl);
        const $ = await cheerio.load(htmlResult);
        const title = $(".OutputHeader").text();
        const fromResult = $(".ccOutputTxt").text().replace("=", "");
        const trail = $(".ccOutputTrail").text();
        const toResult = $(".ccOutputRslt").text().replace(trail, "");
        const updatedAt = $(".calOutputTS").text();
        return json(res, { title, fromResult, toResult, updatedAt });
    } catch (error) {
        return errorJson(res, "Error:" + error);
    }
};

exports.listCurrencies = async (req, res) => {
    try {
        let baseUrl = `${process.env.BASE_URL}`;
        const htmlResult = await request.get(baseUrl);
        const $ = await cheerio.load(htmlResult);
        const results = [];
        $(".currencyList")
            .find("li")
            .each((index, el) => {
                const currName = $(el).text();
                const currCode = $(el)
                    .children("a")
                    .attr("href")
                    .replace(`${baseUrl}/?from=`, "");
                results.push({ currCode, currName });
            });
        return json(res, { results });
    } catch (error) {
        return errorJson(res, "Error:" + error);
    }
};
