const cheerio = require("cheerio")
const axios = require("axios")

//Async functions to allow await 
async function performScraping(){
    const axiosResponse = await axios.request({
        method: "GET",
        //URL for interested webpage
        url: "https://www.amazon.ca/HOPLYNN-Running-Wicking-Athletic-Breathable/dp/B0BRRN1VS4/ref=sr_1_2_sspa?keywords=shirt&qid=1699131659&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&psc=1",
        //Headers to set valid user-agent so that web scraping isn't blocked
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })

    //Initializing cheerio
    const $ = cheerio.load(axiosResponse.data)

    productDescript = $(".a-unordered-list").find(".a-list-item").text()
    console.log(productDescript)
}

performScraping()