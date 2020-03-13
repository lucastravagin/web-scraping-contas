const puppeteer = require('puppeteer')
const url = 'https://meutim.tim.com.br/novo/login?bmctx=8B94D49C137CCFE1FA9512A461AC79DB4FBA69EFB5FA39109654FE9A6E39100A&contextType=external&username=string&enablePersistentLogin=true&contextValue=%2Foam&password=secure_string&challenge_url=https%3A%2F%2Fmeutim.tim.com.br%2Fnovo%2Flogin&request_id=-6163604974841247348&authn_try_count=0&locale=pt_BR&resource_url=https%253A%252F%252Fmeutim.tim.com.br%252F'


let scrape = async () => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'networkidle2' })

        await page.evaluate(() => {
            document.getElementById('campo-numero').value = '11984167366'
            document.getElementById('campo-senha').value = '9118'
            document.getElementById('btn-entrar').click()
        })
        
        await page.screenshot({path: 'tim.png'})
    } catch (error) {
        console.log('Erro ao buscar contas da Sky' + error)
    }
}
scrape().then((value) => {
    console.log(value)
})
