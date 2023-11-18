import pandas as pd
import json

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

print(translated_values)
