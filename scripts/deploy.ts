import { ethers, network } from "hardhat";

const hre = require("hardhat");
const { verify } = require("../utils/verify.js");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // Deploy Minth
  const Minth = await hre.ethers.deployContract("Minth", []);
  await Minth.waitForDeployment();
  console.log("Minth Contract Deployed at " + Minth.target);
  console.log("");

  // Verify contracts (optional, only if you have an etherscan key and on testnet/mainnet)

  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Verifying contracts...");
    await verify(Minth.target, [], "contracts/NFT.sol:Minth");
  } else {
    console.log("Skipping verification on local network");
  }
  console.log("");

  // Get Minth contract instance connected with deployer signer
  // const Minth = await hre.ethers.getContractAt(
  //   "Minth",
  //   Minth.target,
  //   deployer
  // );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
