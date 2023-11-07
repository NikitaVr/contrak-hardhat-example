# contrak-hardhat-example

## Quickstart

### Install Dependencies

`npm install`

### Deploy Contract with Contrak tracking

`npx hardhat run --network localhost scripts/deploy.ts`

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
