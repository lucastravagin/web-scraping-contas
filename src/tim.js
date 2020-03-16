const puppeteer = require('puppeteer')
const url = 'https://meutim.tim.com.br/novo/login'


let scrape = async () => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'networkidle2' })

        await page.evaluate(() => {
            document.getElementById('campo-numero').value = '11984167366'
            document.getElementById('campo-senha').value = '9118'
            document.getElementById('btn-entrar').disabled = false;
            //document.getElementById('btn-entrar').click()
        })



        await page.evaluate(() => {
            document.getElementById('btn-entrar').click()
        })
        await page.waitForNavigation()
        await page.waitFor(2000)

        await page.evaluate(() => {
            document.querySelector('.setinha-ultimas-contas').click()
            document.querySelector('#button_codigo_barras > button').click()
        })

        await page.waitFor(2000)

        const result = await page.evaluate(() => {
            let conta = {}
            conta.vencimento = document.querySelector('.texto-mes > span').innerText
            conta.status = document.querySelector('.status > span').innerText
            conta.valorDesconto = document.querySelector('.desc-pagamento').innerText
            conta.valor = document.querySelector('.valor-conta span:nth-child(2)').innerText
            conta.codigo_barras = document.querySelector('.codigo-num p span').innerText
            return conta
        })
        //await page.screenshot({path: 'tim.png'})
        browser.close()
        return result
    } catch (error) {
        console.log('Erro ao buscar contas da Tim' + error)
    }
}
scrape().then((value) => {
    console.log(value)
})
