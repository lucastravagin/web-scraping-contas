const puppeteer = require('puppeteer')
const url = 'https://www.sky.com.br/minha-sky/login'


let scrape = async () => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'networkidle2' })

        await console.log('Acessou a página da Sky')

        await page.evaluate(() => {
            document.getElementById('documentId').value = '404.790.938-65'
            document.querySelector('.btn-continuar-login').click()
        })


        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Senha")'
        );

        await page.evaluate(() => {
            document.getElementById('senhaLogin').value = 'fg123456'
            document.querySelector('.btn-continuar-login').click()
        })

        await console.log('Logou no sistema ')

        await page.waitForNavigation()

        await page.evaluate(() => {
            document.querySelector('#portlet_com_liferay_journal_content_web_portlet_JournalContentPortlet_INSTANCE_q348LegLUE6N > div > div > div > div.clearfix.journal-content-article > div.container.msky-recarga-ativa.msky-pos > div > div > div.col-xs-12.col-sm-12.col-md-2.hidden-sm.hidden-xs.wrap-menu-paste.desk-menu-wrap > div > ul > li:nth-child(3) > a').click()
        })

        await console.log('Clicou na Faturas ')
        await page.waitFor(5000)


        await page.evaluate(() => {
            document.querySelector('#partialInvoices > tr:nth-child(1) > td:nth-child(3) > div > div.col-sm-4.col-md-4 > a:nth-child(1)').click()
        })
        await console.log('Clicou na Lupa ')
        //await page.waitForNavigation()

        await page.waitFor(5000);

        const result = await page.evaluate(() => {
            let conta = {}
            conta.vencimento = document.querySelector('#portlet_com_liferay_journal_content_web_portlet_JournalContentPortlet_INSTANCE_9Qbyv8voOH5q > div > div.portlet-content-container > div > div.clearfix.journal-content-article > section > div > div > div.detail_info > div:nth-child(1) > div.final-date.pull-left.col-md-5.dtVencimentoDetail > span:nth-child(3)').textContent
            conta.fechamento = document.querySelector('#portlet_com_liferay_journal_content_web_portlet_JournalContentPortlet_INSTANCE_9Qbyv8voOH5q > div > div.portlet-content-container > div > div.clearfix.journal-content-article > section > div > div > div.detail_info > div:nth-child(1) > div.final-date.pull-left.col-md-5.dtFechamentoDetail > span:nth-child(3)').textContent
            conta.valor_total = document.querySelector('#portlet_com_liferay_journal_content_web_portlet_JournalContentPortlet_INSTANCE_9Qbyv8voOH5q > div > div.portlet-content-container > div > div.clearfix.journal-content-article > section > div > div > div.detail_info > div:nth-child(1) > div.pay-value.pull-right.col-md-2 > span:nth-child(3)').textContent
            conta.status = document.querySelector('.statusDetail').textContent
            conta.codigo_barras = document.querySelector('#portlet_com_liferay_journal_content_web_portlet_JournalContentPortlet_INSTANCE_9Qbyv8voOH5q > div > div.portlet-content-container > div > div.clearfix.journal-content-article > section > div > div > div.bar-code > div > div > span:nth-child(3)').textContent
            return conta
        })

        //  const result = await page.$$eval(sele, trs => trs.map(tr => {
        //     const tds = [...tr.getElementsByTagName('td')];
        //     return tds.map(td => td.innerText);
        // }));

        //await page.screenshot({path: 'sky.png'})
        browser.close()
        return result

    } catch (error) {
        console.log('Erro ao buscar contas da Sky' + error)
    }
}

scrape().then((value) => {
    console.log(value)
})




