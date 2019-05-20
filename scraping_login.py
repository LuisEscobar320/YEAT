import requests
from lxml import html
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options


def main():
    LOGIN_URL = 'https://services.jsatech.com/login.php?cid=212&'
    URL = 'https://services.jsatech.com/index.php?skey=6456f832e86903dbf79bd4b45d0dd117&cid=212&#'
    USER_NAME = '914544308'
    PASSWORD = '166d5316'

    #result = requests.get(LOGIN_URL)
    #tree = html.fromstring(result.text)
    #authenticity_token = list(set(tree.xpath("//input[@name='skey']/@value")))[0]
    payload = {
    "loginphrase": USER_NAME,
    "password": PASSWORD,
    #"skey": authenticity_token
    }
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    # OPENING THE DAMN LOGIN SITE and logging in :3
    chrome = webdriver.Chrome(executable_path=r"/Users/tiffanyloo/Downloads/chromedriver", chrome_options=chrome_options)
    chrome.get(LOGIN_URL)
    u = chrome.find_element_by_name('loginphrase')
    u.send_keys(USER_NAME)
    p = chrome.find_element_by_name('password')
    p.send_keys(PASSWORD)
    p.send_keys(Keys.RETURN)

    #s=requests.Session()

    #c = [s.cookies.set(c['name'], c['value']) for c in request_cookies_browser]
    #resp = s.post(LOGIN_URL, params)
    #dict_resp_cookies = resp.cookies.get_dict()
    #response_cookies_browser = [{'name':name, 'value':value} for name, value in dict_resp_cookies.items()]
    #c = [chrome.add_cookie(c) for c in response_cookies_browser]
    #chrome.get(LOGIN_URL)
    #result = session_request.post(
    #LOGIN_URL, data = payload,
    #headers = dict(referer = LOGIN_URL)
    #)

    #session_request = requests.session()
    #post = session_request.post(LOGIN_URL, data=payload)
    #print(post.text)
    #r = requests.get(URL, headers=dict(referer=URL))
    #print(r.text)
    #soup = BeautifulSoup(html.fromstring(r.content))
    element = WebDriverWait(chrome, 10).until(EC.presence_of_element_located((By.ID, "Dining Dollars")))
    soup = BeautifulSoup(chrome.page_source, 'lxml')
    #print(soup.prettify())
    table = soup.find(lambda tag: tag.name=='table' and tag.has_attr('id') and tag['id']=="Dining Dollars")
    rows = table.find(lambda tag: tag.name=='td' and tag.has_attr('data-bal') and tag['data-bal']==" ", text=True)
    balance = rows.text.strip()
    balance = balance.replace("$","")
    balance = balance.replace(",","")
    balance = float(balance) *2
    print(balance)
    #balance = soup.find('')
    #balance = [td.get_text() for td in table.find("tr").find_all("td")]
    #datasets = []
    #for row in table.find_all("tr")[1:]:
     #   dataset = zip(headings, (td.get_text() for td in row.find_all("td")))
    #balance = tree.xpath('//td[@data-bal=""]/text()')
    #print(balance)
    #result = session_request.get(URL, headers = dict(referer = URL))
    #tree = html.fromstring(result.content)
    #balance = tree.xpath('//div[@class="jsa_content-interior"]//td[@class="jsa_amount bal"]/@href')
    #print(balance)

if __name__ == '__main__':
    main()
