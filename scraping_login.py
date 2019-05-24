import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from firebase import firebase
import firebase_admin

def main():
    fb = firebase.FirebaseApplication('https://yeat-dc4bc.firebaseio.com', None)
    ref = fb.get('/users', None)
    print(ref)
    for k,v in ref.items():
        for k1,v1 in v.items():
            if k1 == "tritoncard":
                for k2, v2 in v1.items():
                    print(k2)

    LOGIN_URL = 'https://services.jsatech.com/login.php?cid=212&'
    URL = 'https://services.jsatech.com/index.php?skey=6456f832e86903dbf79bd4b45d0dd117&cid=212&#'
    USER_NAME = '914544308'
    PASSWORD = '166d5316'

    payload = {
    "loginphrase": USER_NAME,
    "password": PASSWORD,
    #"skey": authenticity_token
    }
    chrome_options = Options()
    #chrome_options.add_argument("--headless")
    # OPENING THE DAMN LOGIN SITE and logging in :3
    chrome = webdriver.Chrome(executable_path=r"/Users/tiffanyloo/Downloads/chromedriver", chrome_options=chrome_options)
    chrome.get(LOGIN_URL)
    u = chrome.find_element_by_name('loginphrase')
    u.send_keys(USER_NAME)
    p = chrome.find_element_by_name('password')
    p.send_keys(PASSWORD)
    p.send_keys(Keys.RETURN)

    element = WebDriverWait(chrome, 10).until(EC.presence_of_element_located((By.ID, "Dining Dollars")))
    soup = BeautifulSoup(chrome.page_source, 'lxml')
    table = soup.find(lambda tag: tag.name=='table' and tag.has_attr('id') and tag['id']=="Dining Dollars")
    rows = table.find(lambda tag: tag.name=='td' and tag.has_attr('data-bal') and tag['data-bal']==" ", text=True)
    balance = rows.text.strip()
    balance = balance.replace("$","")
    balance = balance.replace(",","")
    print(balance)

    chrome.find_element(By.XPATH, "(//a[contains(text(),'" + 'View More'"')])[2]").click()
    chrome.find_element(By.XPATH, "(//a[contains(text(),'" + 'View'"')])[1]").click()
    soup = BeautifulSoup(chrome.page_source, 'lxml')
    table = soup.find('table', attrs={'class': 'jsa_transactions'})
    table_body = table.find('tbody')


    thisMonth_trans = {}
    for row in table_body.find_all("tr"):
        cells = row.findAll("td")
        if cells:
            sad = cells[0].find(text=True)
            sad = sad.replace("9 ","9_")
            evensadder = cells[2].find(text=True)
            evensadder = evensadder.replace("-","")
            thisMonth_trans[sad] = evensadder

    chrome.back()
    chrome.find_element(By.XPATH, "(//a[contains(text(),'" + 'View'"')])[2]").click()
    soup = BeautifulSoup(chrome.page_source, 'lxml')
    table = soup.find('table', attrs={'class': 'jsa_transactions'})
    table_body = table.find('tbody')
    lastMonth_trans = {}
    for row in table_body.find_all("tr"):
        cells = row.findAll("td")
        if cells:
            sad = cells[0].find(text=True)
            sad = sad.replace("9 ","9_")
            evensadder = cells[2].find(text=True)
            evensadder = evensadder.replace("-","")
            lastMonth_trans[sad] = evensadder


if __name__ == '__main__':
    main()
