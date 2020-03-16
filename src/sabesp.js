const puppeteer = require('puppeteer');
const url = 'https://www9.sabesp.com.br/agenciavirtual/pages/template/siteexterno.iface?idFuncao=22';


let scrape = async () => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'networkidle2' })

        //await page.waitForNavigation()

        await console.log('Acessou a página e foi está inserindo RGI no Input');
        
        
        await page.evaluate(() => { // O Evaluate serve para executar código javascript diretamente do navegador 
            document.querySelectorAll('table > tbody > tr:nth-child(1) > td > input')[0].value = '0790409500';
            document.getElementById('frmhome:j_id172').click()
        })

        await console.log('Inseriu RGI no Input e clicou em Prosseguir');

        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Confira os dados de seu imóvel")'
        );

        await page.evaluate(() => { 
            document.getElementById('frmhome:j_id206').click()
        })

        await console.log('Clicou em Prosseguir de novo');
        
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Mês de referência")'
        );

        

        await page.evaluate(() => { 
            document.getElementById("frmhome:table:j_id168").click()
            document.getElementById("frmhome:j_id356:_4").click()
        })

        await page.waitFor(1000)
        await console.log('Clicou no Checkbox');
        await page.evaluate(() => { 
            document.getElementById("frmhome:j_id380").click()
        })

        await console.log('Clicou no Radio Button');

        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Consulte o código de barras na tabela abaixo.")'
        );

       
        const selector = 'html > body > form > div:nth-child(8) > div > table > tbody > tr';

        
        const result = await page.$$eval(selector, trs => trs.map(tr => {
            const tds = [...tr.getElementsByTagName('td')];
            return tds.map(td => td.innerText);
        }));

        browser.close()
        return result
    } catch (error) {
        console.log(error)
    }
}

scrape().then((value) => {
    console.log(value)
})

