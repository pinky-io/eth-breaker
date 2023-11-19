import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import { parse } from 'json2csv';

dotenv.config();

const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

async function getContractDescription(contractAddress) {
    const url = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${etherscanApiKey}`;

    try {
        const response = await axios.get(url);
        const contractData = response.data.result[0];

        // Create a description from the contract data
        const description = `Contract ${contractAddress} is a ${contractData.ContractName} created on ${contractData.CreationDate}. It is used for ${contractData.SourceCode}.`;

        return description;
    } catch (error) {
        console.error('Error fetching contract data:', error);
        return null;
    }
}

// Example usage
const contractAddress = '0xae78736cd615f374d3085123a210448e74fc6393'; // Replace with a real contract address
getContractDescription(contractAddress).then(description => console.log(description));