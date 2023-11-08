# contrak-hardhat-example

## Quickstart

1. Follow the setup instructions in the [Contrak README](https://github.com/NikitaVr/contrak#setup) to get an instance of Contrak running on your machine at http://localhost:3000/
2. Run `npm install` to install dependencies in this example repo
3. Run `npx hardhat node` to run a local hardhat node
4. Run `npx hardhat run --network localhost scripts/deploy.ts` to deploy the contract to your local hardhat node and connect it to Contrak

## Usage in your own projects

Add this code to any deployment script to connect it to Contrak.

Make sure to change the `CONTRACT_HISTORY_ID` and `contractName` to be unique in each deploy script.

```javascript
async function main() {
  // original deploy script...

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
```
