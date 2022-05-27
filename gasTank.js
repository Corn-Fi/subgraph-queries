const { request, gql } = require('graphql-request');

const API_URL = 'https://api.thegraph.com/subgraphs/name/kcorkscrew/trades'

async function getUserData(user) {
    let result = await request(API_URL,
        gql`{
                payers(where: {id: "${user}"}) {
                    amountDeposited
                    totalAmountSpent
                }
            }`
    );
    result = result.payers[0]
    return {
        amountDeposited: result.amountDeposited,
        totalAmountSpent: result.totalAmountSpent
    }
}

async function main() {
    const userData = await getUserData("0x43b02cdf22d0de535279507cf597969ce82198af");
    console.log(userData)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });