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

async function viewAllOrders() {
    let result = await request(API_URL,
        gql`{
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
            }`
    );
    return result
}


async function userOpenOrders(user) {
    let result = await request(API_URL,
        gql`{
                orders(where: {owner:"${user}", open: true}) {
                    orderId
                    fromToken
                    toToken
                    amountIn
                    desiredAmountOut
                    amountOut
                    expiration
                    open
                    timestamp
                    owner
                    strategy {
                        id
                        name
                    }
                    trade {
                        tradeId
                    }
                }
            }`
    );
    return result
}



async function main() {
    const order = await getUserData("0x43b02cdf22d0de535279507cf597969ce82198af");
    console.log(order)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });