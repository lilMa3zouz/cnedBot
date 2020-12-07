import sys
from multiprocessing import Process
from flask import Flask, request
from flask_cors import cross_origin
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
import time

opt = Options()
opt.add_argument("--disable-infobars")
opt.add_argument("start-maximized")
opt.add_argument("--disable-extensions")
opt.add_experimental_option("prefs", {"profile.default_content_setting_values.media_stream_mic": 1, "profile.default_content_setting_values.media_stream_camera": 1,"profile.default_content_setting_values.geolocation": 1, "profile.default_content_setting_values.notifications": 1 })
def connectClass(link):
    try:
        driver = webdriver.Chrome(chrome_options=opt, executable_path="chromedriver.exe")
        driver.get(link)
        id = driver.find_element_by_id('username')  
        pd = driver.find_element_by_id('password')
        id.send_keys('mmazouz')
        pd.send_keys('Momo_67200')
        driver.execute_script(f"window.scrollTo(0, {2**127});") 
        login = driver.find_element_by_id('loginbtn')
        login.click()
        access = False
        while not access:
            try:
                access =driver.find_element_by_tag_name('a')
            except:
                pass
        access.click()
        closeTest = False
        while not closeTest:
            try:
                closeTest = driver.find_element_by_xpath("html/body/div[3]/div[@id='techcheck-modal']/button")
            except:
                pass
        closeTest.click()
        closeTutorial = False
        while not closeTutorial:
            try:
                closeTutorial = driver.find_element_by_xpath("html/body/div[1]/div[2]/div[@id='announcement-modal']/div[@id='announcement-modal-page-wrap']/button[@class='close']")
            except:
                pass
        closeTutorial.click()
        time.sleep(5)
        openPanel = False
        while not openPanel:
            try:
                openPanel= driver.find_element_by_id('side-panel-open')
            except:
                pass
        openPanel.click()
        enterChat= driver.find_element_by_class_name('channel-item')
        enterChat.click()
        textArea = driver.find_element_by_id('message-input')
        textArea.send_keys('Bonjour')
        time.sleep(3600)
        return 'perfect'
    except Exception as e:
        print(e)        

def shutdown_server():
       func = request.environ.get('werkzeug.server.shutdown')
       if func is None:
           raise RuntimeError('Not running with the Werkzeug Server')
       func()

app = Flask(__name__)

@app.route("/cv",methods=['POST'])
def calc():
    driver = webdriver.Chrome(chrome_options=opt, executable_path="chromedriver.exe")
    data = request.get_json()
    connectClass(data["link"])
    return 'lastreet'


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001, debug=True)