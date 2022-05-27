const { request, gql } = require('graphql-request');

const API_URL = 'https://api.thegraph.com/subgraphs/name/kcorkscrew/controller'

// Get user strategy tokens - WORKING
async function getUserStrategyTokens(user) {
    let result = await request(API_URL,
        gql`{
                strategyTokens(where: {owner: "${user}"}) {
                    tokenId
                    strategy {
                    id
                    address
                    name
                    }
                }
            }`
    );
    return result
}


// Get all user data (strategy tokens, trades, orders) - NOT WORKING
async function getUserData(user) {
    let result = await request(API_URL,
        gql`{
                strategyTokens(where: {owner: "${user}"}) {
                    trades {
                        tradeId
                        orders {
                            orderId
                            fromToken
                            toToken
                            amountIn
                            desiredAmountOut
                            amountOut
                            expiration
                            open
                            timestamp
                        }
                    }
                }
            }`
    );
    return result
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