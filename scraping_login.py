import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException
from firebase import firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
#import sys

def main():
    # Steps to initialize Firebase (need to change path for running on Luis's desktop
    cred = credentials.Certificate("/Users/tiffanyloo/Downloads/yeat-dc4bc-firebase-adminsdk-4alun-e3e233f62a.json")
    firebase_admin.initialize_app(cred, {'databaseURL':'https://yeat-dc4bc.firebaseio.com',
                                             'databaseAuthVariableOverride': None})
    while (1):
        # Getting all the users
        ref = db.reference('/users')
        snapshot = ref.order_by_key().get()
        # Iterating through the users
        for key in snapshot:
            # Only processing users who have clicked LOGIN on TritonCardScreen
            if bool(ref.child(key).child('tritoncard').get()):
                user = ref.child(key).child('tritoncard').child('username').get()
                # If they put in an empty string or their information is incorrect, save as 'wrong' to Firebase
                if str(user) == '' or str(user) == 'wrong':
                    ref.child(key).child('tritoncard').set({'username': 'wrong', 'password': 'wrong'})
                else:
                    # Getting user TritonCard info to log into the website to initiate scraping
                    USER_NAME = str(user)
                    PASSWORD = str(ref.child(key).child('tritoncard').child('password').get())
                    LOGIN_URL = 'https://services.jsatech.com/login.php?cid=212&'
                    print(USER_NAME)
                    print(PASSWORD)
                    # Settings for chrome
                    chrome_options = Options()
                    chrome_options.add_argument("--headless")
                    # OPENING THE LOGIN SITE and logging in (change this for Luis)
                    chrome = webdriver.Chrome(executable_path=r"/Users/tiffanyloo/Downloads/chromedriver", chrome_options=chrome_options)
                    chrome.get(LOGIN_URL)
                    u = chrome.find_element_by_name('loginphrase')
                    u.send_keys(USER_NAME)
                    p = chrome.find_element_by_name('password')
                    p.send_keys(PASSWORD)
                    p.send_keys(Keys.RETURN)

                    # Will skip over bad usernames and passwords
                    try:
                        element = WebDriverWait(chrome, 4).until(EC.presence_of_element_located((By.ID, "Dining Dollars")))
                    except TimeoutException:
                        ref.child(key).child('tritoncard').set({'username': 'wrong', 'password': 'wrong'})
                        print("Skipping bad user")
                        continue

                    # Finding the tags for getting the balance
                    soup = BeautifulSoup(chrome.page_source, 'lxml')
                    table = soup.find(lambda tag: tag.name=='table' and tag.has_attr('id') and tag['id']=="Dining Dollars")
                    rows = table.find(lambda tag: tag.name=='td' and tag.has_attr('data-bal') and tag['data-bal']==" ", text=True)
                    # Taking out the dollar sign and commas to store
                    balance = rows.text.strip()
                    balance = balance.replace("$","")
                    balance = balance.replace(",","")
                    ref.child(key).child('tritoncard').update({'balance': balance})
                    print("Balance is "+balance)

                    # Clicking to get transactions
                    chrome.find_element(By.XPATH, "(//a[contains(text(),'" + 'View More'"')])[2]").click()
                    chrome.find_element(By.XPATH, "(//a[contains(text(),'" + 'View'"')])[1]").click()
                    soup = BeautifulSoup(chrome.page_source, 'lxml')
                    table = soup.find('table', attrs={'class': 'jsa_transactions'})
                    table_body = table.find('tbody')

                    # Current month's transactions
                    thisMonth_trans = {}
                    for row in table_body.find_all("tr"):
                        cells = row.findAll("td")
                        if cells:
                            sad = cells[0].find(text=True)
                            # Seeing if they had spent Dining Dollars this month (edge case)
                            if sad == "No transaction history found for this date range.":
                                # Setting bogus date and time to check for later
                                thisMonth_trans["Jan 01 1800_09:10PM"] = "0.00"
                                break

                            # Saving date and time as key to directory
                            sad = sad.replace("2019 ","2019_")
                            sad = sad.replace(u'\xa0', u'')
                            evensadder = cells[2].find(text=True)
                            evensadder = evensadder.replace("-","")
                            evensadder = evensadder.replace(" ","")
                            evensadder = evensadder.replace("\n","")
                            thisMonth_trans[sad] = str(evensadder)

                    # Saving current month's transactions to Firebase
                    ref.child(key).child('tritoncard').update({'thismonth': thisMonth_trans})

                    # Navigating back to the other window to get last month's transactions
                    chrome.back()
                    chrome.find_element(By.XPATH, "(//a[contains(text(),'" + 'View'"')])[2]").click()
                    soup = BeautifulSoup(chrome.page_source, 'lxml')
                    table = soup.find('table', attrs={'class': 'jsa_transactions'})
                    table_body = table.find('tbody')

                    # Getting last month's transactions
                    lastMonth_trans = {}
                    for row in table_body.find_all("tr"):
                        cells = row.findAll("td")
                        if cells:
                            sad = cells[0].find(text=True)
                            # Seeing if they had spent Dining Dollars last month (edge case)
                            if sad == "No transaction history found for this date range.":
                                # Setting bogus date and time to check for later
                                thisMonth_trans["Jan 01 1800_09:10PM"] = "0.00"
                                break

                            # Saving date and time as key to directory
                            sad = sad.replace("2019 ","2019_")
                            sad = sad.replace(u'\xa0', u'')
                            evensadder = cells[2].find(text=True)
                            evensadder = evensadder.replace("-","")
                            evensadder = evensadder.replace(" ","")
                            evensadder = evensadder.replace("\n","")
                            lastMonth_trans[sad] = evensadder

                    #print(lastMonth_trans)
                    ref.child(key).child('tritoncard').update({'lastmonth': lastMonth_trans})
                    print("Got transactions")

if __name__ == '__main__':
    main()
