const { userClosedTokens, userData, controllerData } = require("./controller")
// const { getUserData } = require("./gasTank")
const { getUserData, getMasterChefData } = require("./masterChef")

async function main() {
    const user = "0x016d26e90eca6c56b9411134f752e2a021cd93bf"

    const userTradeData = await userData(user);
    const controllerTradeData = await controllerData();
    const masterchefData = await getMasterChefData()
    const userPoolData = await getUserData(user)

    console.log(userTradeData)
    console.log(controllerTradeData)
    console.log(masterchefData)
    console.log(userPoolData)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});