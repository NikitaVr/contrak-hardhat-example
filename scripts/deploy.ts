import { ethers } from "hardhat";
import { connect } from "@contrak/sdk";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  const lock = await ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );

  // NEW CONTRAK CODE
  // CONTRACT_HISTORY_ID is used to create a timeline of multiple deployments of the same contract
  const CONTRACT_HISTORY_ID = "143d0bde-5383-427d-8ea4-3b8178b11fac";
  const contractName = "Lock";

  const deploymentTransaction = lock.deploymentTransaction();

  if (!deploymentTransaction) {
    throw new Error("Deployment transaction not found");
  }

  const contractAddress = await lock.getAddress();

  connect({
    contractName,
    contractHistoryId: CONTRACT_HISTORY_ID,
    chainID: deploymentTransaction.chainId.toString(),
    contractAddress: contractAddress,
    deployerAddress: deploymentTransaction.from,
    contractDeploymentTransactionHash: deploymentTransaction.hash,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
