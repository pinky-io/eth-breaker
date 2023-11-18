import pandas as pd
import json
import csv

with open('dapps_dictionary4.json', 'r') as file:
    valuable_dict = json.load(file)

csv_path = '../contractsData.csv'
df_user = pd.read_csv(csv_path)

terms_list = df_user.contractName.tolist()

translation_dict = {
    "GhoToken": "Aave",
    "RocketTokenRETH": "Rocket Pool",
    "AaveGovernanceV2": "Aave",
    "ETHRegistrarController": "ENS",
    "UniversalRouter": "Uniswap",
    "PublicResolver": "ENS",
    "InitializableAdminUpgradeabilityProxy": "Aave",
    "L1ChugSplashProxy": "Base Bridge"
}

translated_values = {}

for term in terms_list:
    key_part = term.split()[0]
    if key_part in translation_dict:
        valuable_key = translation_dict[key_part]
        translated_values[term] = valuable_dict.get(valuable_key, "Not found")

with open('output.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(translated_values)
    for key, value in valuable_dict.items():
        writer.writerow([key, value])

terms_list.reverse()

texts_to_combine = []
for name in terms_list:
    if name in translated_values:
        texts_to_combine.append(translated_values[name])

combined_text = ' '.join(texts_to_combine)

print(combined_text)


from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('OPENAI_API_KEY')

client = OpenAI()
completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
        {"role": "user", "content": f"Summarize the following text into a concise summary of about 150 characters: {combined_text}"}
    ]
)

print(completion.choices[0].message)