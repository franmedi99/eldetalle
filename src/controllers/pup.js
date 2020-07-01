const puppeteer = require('puppeteer')
const pup = {};

    pup.createPdf = async (req, res)=>{
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();

    const options = {
        path: 'src/public/pdf/facturacion.pdf',
        format:  'Legal',

    };

//
    await page.goto(process.env.WEB , {waitUntil: 'load'});
    await page.type('#key', process.env.KEY)
    await page.click('#entrar1')
    await page.waitForNavigation()
     await page.type('#tres', req.user.client)
     await page.click('#entrar2')
     await page.waitForNavigation()
    await page.pdf(options);
    await browser.close();
   await  res.redirect(process.env.WEB2);
}

module.exports = pup;