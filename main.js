const { userClosedTokens, userData, controllerData } = require("./controller")
// const { getUserData } = require("./gasTank")
const { getUserData, getMasterChefData } = require("./masterChef")

async function main() {
    const user = "0xceda4ba64fabc1c572f95805170d1e5b0bc29782"

    // user current trade data
    const userTradeData = await userData(user);

    // all users trade data
    const controllerTradeData = await controllerData();

    // masterchef pool data
    const masterchefData = await getMasterChefData()

    // user pool data
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