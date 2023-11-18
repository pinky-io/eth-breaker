import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import { parse } from 'json2csv';

dotenv.config();

const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
const loggedwallet = "0x25420F306A203A02e33Fd778FBd7867d76CfeB3E";

let contractsData = [];

const getTransactions = async () => {
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${loggedwallet}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${etherscanApiKey}`;

    try {
        console.log('Fetching transactions...');
        const response = await axios.get(url);
        const transactions = response.data.result;

        console.log(`Total transactions fetched: ${transactions.length}`);
        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
};

const fetchContractData = async (contractAddress) => {
    const url = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${etherscanApiKey}`;

    try {
        //console.log(`Fetching contract data for address: ${contractAddress}`);
        const response = await axios.get(url);
        const contractData = response.data.result[0];

        return {
            address: contractAddress,
            name: contractData.ContractName || 'Unnamed Contract',
            isContract: true
        };
    } catch (error) {
        console.error(`Error fetching contract data for address ${contractAddress}:`, error);
        return { address: contractAddress, isContract: false };
    }
};

const analyzeTransactions = async () => {
    const transactions = await getTransactions();

    for (const tx of transactions) {
        if (tx.to) {
            const contractInfo = await fetchContractData(tx.to);
            if (contractInfo.isContract) {
                contractsData.push({
                    address: tx.from,
                    contractAddress: contractInfo.address,
                    contractName: contractInfo.name
                });
                console.log(`Contract Address: ${contractInfo.address}, Contract Name: ${contractInfo.name}`);
            }
        }
    }
    const fields = ['address', 'contractAddress', 'contractName'];
    const opts = { fields };

    try {

        const csv = parse(contractsData, opts);
        fs.writeFileSync('contractsData.csv', csv);

        console.log('Contracts data saved to contractsData.csv');
    } catch (err) {
        console.error(err);
    }

    const walletData = [{ wallet: loggedwallet }];
    try {
        const csv = parse(walletData);
        fs.writeFileSync('currentwallet.csv', csv);
        console.log('Wallet data saved to currentwallet.csv');
    } catch (err) {
        console.error(err);
    }
};


analyzeTransactions();

