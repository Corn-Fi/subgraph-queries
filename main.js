const { userClosedTokens, userData, controllerData } = require("./controller")
const { getUserGasTankData } = require("./gasTank")
const { getUserData, getMasterChefData } = require("./masterChef")

async function main() {
    const user = "0x43b02cdf22d0de535279507cf597969ce82198af"

    // user current trade data
    const userTradeData = await userData(user);

    // all users trade data
    const controllerTradeData = await controllerData();

    // masterchef pool data
    const masterchefData = await getMasterChefData()

    // user pool data
    const userPoolData = await getUserData(user)

    // user gas tank data
    const userGasTankData = await getUserGasTankData(user)

    console.log(userTradeData)
    console.log(controllerTradeData)
    console.log(userGasTankData)
    // console.log(masterchefData)
    // console.log(userPoolData)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});