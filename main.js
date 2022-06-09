const { userClosedTokens, userOpenTokens, userTotalDepositedAmounts } = require("./controller")
const { getUserData } = require("./gasTank")
const { getUserData, getMasterChefData } = require("./masterChef")

async function main() {
    const order = await userClosedTokens("0x43b02cdf22d0de535279507cf597969ce82198af");
    console.log(JSON.stringify(order))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});