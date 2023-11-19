from sentence_transformers import SentenceTransformer, util
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
import json
import csv
import os
import requests
model = SentenceTransformer('all-MiniLM-L6-v2')

csv_path = 'similaritydata.csv'
df_user = pd.read_csv(csv_path)
df = df_user.drop(['Unnamed: 0'], axis=1)

def encode_and_store(sentences):
    embeddings = model.encode(sentences, convert_to_tensor=True)
    return embeddings.cpu().numpy()

for col in ['summary']:
    df[f'{col}_Embedding'] = df[col].apply(lambda x: encode_and_store([x])[0])

embeddings = np.array(df['summary_Embedding'].tolist())
cos_sim_matrix = cosine_similarity(embeddings)


np.fill_diagonal(cos_sim_matrix, -1)
sim_df = pd.DataFrame(cos_sim_matrix, columns=df.index, index=df.index)
ranked_preferences = {wallet: sim_df.loc[wallet].sort_values(ascending=False).index.tolist() for wallet in sim_df.index}

ranked_preferences = {df.iloc[row]['wallet']: sim_df.iloc[row].sort_values(ascending=False).index.tolist() for row in range(len(df))}

df['preference'] = df['wallet'].apply(lambda wallet: [df['wallet'][index] for index in ranked_preferences[wallet]][:3])

url = 'https://enhanced-mastiff-99.hasura.app/api/rest/update-preferences'

payload = {
    'wallet_address': df.wallet.iloc[0],
    'preferences': df.preference.iloc[0]
}

load_dotenv()
api_key = os.getenv('x-hasura-admin-secret')
headers = {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': api_key
}

try:
    response = requests.patch(url, json=payload, headers=headers)
    print(response.text)
except requests.exceptions.RequestException as e:
    print(f"Error making request: {e}")