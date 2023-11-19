import { allowCors } from "@/allowCors";
import axios from "axios";

export const maxDuration = 100; // This function can run for a maximum of 5 seconds
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

let contractsData = [];

const getTransactions = async (walletAddress) => {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${etherscanApiKey}`;

  try {
    console.log("Fetching transactions...");
    const response = await axios.get(url);
    const transactions = response.data.result;

    console.log(`Total transactions fetched: ${transactions.length}`);
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
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
      name: contractData.ContractName || "Unnamed Contract",
      isContract: true,
    };
  } catch (error) {
    console.error(
      `Error fetching contract data for address ${contractAddress}:`,
      error
    );
    return { address: contractAddress, isContract: false };
  }
};

async function handler(req, res) {
  const walletAddress = req.query.wallet_address;

  const transactions = await getTransactions(walletAddress);

  for (const tx of transactions) {
    if (tx.to) {
      const contractInfo = await fetchContractData(tx.to);
      if (contractInfo.isContract) {
        contractsData.push({
          address: tx.from,
          contractAddress: contractInfo.address,
          contractName: contractInfo.name,
        });
        console.log(
          `Contract Address: ${contractInfo.address}, Contract Name: ${contractInfo.name}`
        );
      }
    }
  }

  res.status(200).json({ contractsData, walletAddress });
}

export default allowCors(handler);
