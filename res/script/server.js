const express = require('express')
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const bodyParser = require('body-parser');

var opt = new chrome.Options()
.addArguments("--disable-infobars")
.addArguments("start-maximized")
.addArguments("--disable-extensions")
.addArguments('allow-file-access-from-files')
.addArguments('use-fake-device-for-media-stream')
.addArguments('use-fake-ui-for-media-stream');

const app = express();
app.use(bodyParser.json())

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startCv(link) {
    let driver = await new webdriver.Builder().forBrowser('chrome').setChromeOptions(opt).build();
    await driver.get(link);
    await driver.findElement(webdriver.By.id('username')).sendKeys('mmazouz')
    await driver.findElement(webdriver.By.id('password')).sendKeys('Momo_67200')
    await driver.executeScript("window.scrollTo(0, 450);")
    await driver.findElement(webdriver.By.id('loginbtn')).click()
    await sleep(5000)
    await driver.findElement(webdriver.By.tagName('a')).click()
    await sleep(10000)
    await driver.findElement(webdriver.By.xpath("html/body/div[3]/div[@id='techcheck-modal']/button")).click()
    await sleep(10000)
    await driver.findElement(webdriver.By.xpath("html/body/div[1]/div[2]/div[@id='announcement-modal']/div[@id='announcement-modal-page-wrap']/button[@class='close']")).click()
    await driver.findElement(webdriver.By.id('side-panel-open')).click()
    await driver.findElement(webdriver.By.className('channel-item')).click()
    await driver.findElement(webdriver.By.id('message-input')).sendKeys('Bonjour')
}

app.post('/cv', (req, res) => {
  var url = req.body.link
  try{
    startCv(url)
    return(res.send('tout va bien'))
  }
  catch(e){
    return res.send(e)
  }
});

app.get('/shutdown', function(req, res) {
  res.send('server shutdown');
  app.close()
});


app.listen(5001, () =>
  console.log(`listening!`),
);