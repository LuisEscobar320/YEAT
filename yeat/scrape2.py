from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import re
import pandas as pd
#import tabulate
import os
from selenium import webdriver
from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary

from selenium.webdriver.support.select import Select
from collections import defaultdict #for dict

class NutritionBoi:
    Vegan = False
    Vegeterian = False
    Dairy = False
    Gluten = False
    Nuts = False
    Shellfish = False

    def setVegan(self, bool):
        self.Vegan = bool
    def setVegeterian(self, bool):
        self.Vegeterian = bool
    def setDairy(self, bool):
        self.Dairy = bool
    def setGluten(self, bool):
        self.Gluten = bool





# create a new Firefox session
driver = webdriver.Firefox(executable_path=r'C:\Users\jeem\Documents\CSE110\geckodriver.exe')

# launch url
subUrl = "https://hdh-web.ucsd.edu"
url = "https://hdh-web.ucsd.edu/dining/apps/diningservices/Restaurants/MenuItem/64"
binary = FirefoxBinary(r'C:\Program Files (x86)\Mozilla Firefox\firefox.exe')
driver = webdriver.Firefox(firefox_binary=binary)
driver.get(url)



soup_level1 = BeautifulSoup(driver.page_source, 'lxml')

diningHallMenus = []
diningHallList = soup_level1.find("div", {"id":  "primaryNavContainer"})

for link in diningHallList.find_all(lambda tag: tag.name == 'a'):
    #Find dining hall by text

    print(link['href'])
    print(link.string)
    driver.find_element_by_link_text(link.string).click()


    driver.implicitly_wait(30)  # NEEDED SO WEBPAGE HAS TIME TO LOAD
    soup_level2 = BeautifulSoup(driver.page_source, 'lxml')

    menus = []  # Breakfast, lunch, and dinner dictionaries

    for i in range(3): #scrape for breakfast, lunch and dinner

        select_fr = Select(driver.find_element_by_id("mySelect")) #dropdown menu
        select_fr.select_by_index(i)  # click breakfast, lunch and dinner
        driver.implicitly_wait(30)  # NEEDED SO WEBPAGE HAS TIME TO LOAD


        div = driver.find_element_by_id("containerMenuItems")

        div.find_element_by_css_selector('a').get_attribute('href')
        #print(div.text)

        div.find_element_by_id("menuContainer")
        # Selenium hands the page source to Beautiful Soup



        foodDict = defaultdict(list) #instantiate dictionary of food hashmap with nutritionBois
        # x = 0  # counter
        menu = soup_level2.find("div", {"id":  "containerMenuItems"})
        # Beautiful Soup finds all food items List items under ng-scope yEAT
        for li in menu.find_all(lambda tag: tag.name == 'li' and tag.get('class') == ['ng-scope']):
            foodItemAndCost = li.find('a')
            foodItem = foodItemAndCost.contents[0]
            print(foodItemAndCost.contents[0]) #Debug output

           # nb = NutritionBoi() #Create a nutrition object to associate with each food item
            for img in li.find_all('img'): #GETS NURTITIONAL INFO FROM TAGS
                style = img.get('style')
                if (style == "display: none;"):
                    continue
                else:
                    elem = img.get('alt')
                    if(elem == "Nutrition Symbol info"):
                        break
                    #print(elem) #ddebug print nutritional info
                    foodDict[foodItem].append(elem)
                    #if(elem.find("Dairy)") == True): #check if tag is dairy tag
                       # nb.setDairy(True) #if it is set the nutrition boi to true
                    #etc
                    #need to add OR the react side can parse the nutritional legend and i just send as is
        menus.append(foodDict)
    diningHallMenus.append(menus)
for i in diningHallMenus:
    print(i)