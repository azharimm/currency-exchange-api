const request = require("request-promise");
const cheerio = require("cheerio");
const { json, errorJson } = require("../utils/response");

exports.index = (req, res) => {
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

    return json(res, {
        maintainer: "Azhari Muhammad M <azhari.marzan@gmail.com>",
        source: "https://github.com/azharimm/currency-exchange-api",
    });
};

exports.calculator = async (req, res) => {
    try {
        const htmlResult = await request.get(`${process.env.BASE_URL}`);
        const $ = await cheerio.load(htmlResult);
        const title = $(".OutputHeader").text();
        return json(res, title);
    } catch (error) {
        return errorJson(res, "Error:"+error);
    }
}

