from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json

base_url = 'https://www.xxxxxx.com/dapps'
driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)

dapps_dict = {}


page_number = 1
last_page_number = 24

while page_number <= last_page_number:
    page_url = f"{base_url}?8c945ae6_page={page_number}"
    driver.get(page_url)

    wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'cms-filter_item')))

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    for element in soup.find_all(class_='cms-filter_item is--dapp w-dyn-item'):
        name = element.find(class_='heading-style-h5').text.strip()
        description = element.find(class_='cms-filter_search-content').text.strip()
        dapps_dict[name] = description
        file_path = 'dapps_dictionary4{page_number}.json'
        with open(file_path, 'w') as file:
            json.dump(dapps_dict, file, indent=4)

        print(f"Scraped {len(dapps_dict)} entries.")

    page_number += 1

driver.quit()

file_path = 'dapps_dictionary4.json'
with open(file_path, 'w') as file:
    json.dump(dapps_dict, file, indent=4)

print(f"Scraped {len(dapps_dict)} entries.")
