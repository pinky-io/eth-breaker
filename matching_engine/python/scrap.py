import requests
import json
from bs4 import BeautifulSoup

# URL of the DApps page
url = 'https://www.alchemy.com/dapps?chain=Ethereum'

# Fetch the page content
response = requests.get(url)
html = response.content

# Parse the HTML
soup = BeautifulSoup(html, 'html.parser')

# Initialize an empty dictionary
dapps_dict = {}

# Find elements containing DApp names and descriptions
# (You need to replace 'class_name' with the actual class names found in the HTML)
for element in soup.find_all(class_='cms-filter_item is--dapp w-dyn-item'):
    name = element.find(class_='heading-style-h5').text  # Adjust this if needed
    description = element.find(class_='cms-filter_search-content').text
    dapps_dict[name] = description

# Print the dictionary
print(dapps_dict, len(dapps_dict))

file_path = 'dapps_dictionary.json'

with open(file_path, 'w') as file:
    json.dump(dapps_dict, file, indent=4)
