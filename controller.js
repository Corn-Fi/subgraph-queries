const { request, gql } = require('graphql-request');

const API_URL = 'https://api.thegraph.com/subgraphs/name/kcorkscrew/controller'



async function userOpenTokens(user) {
    const result = await request(API_URL,
        gql`{
            users(where: {id: "${user}"}, first: 100) {
                strategyTokens(where: {open: true}) {
                    strategyId
                    tokenId
                    erc20 {
                        address
                        amount
                    }
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
            }
        }`
    );

    return result.users[0]
}


async function userClosedTokens(user) {
    const result = await request(API_URL,
        gql`{
            users(where: {id: "${user}"}, first: 100) {
                strategyTokens(where: {open: false}) {
                    strategyId
                    tokenId
                    erc20 {
                        address
                        amount
                    }
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
            }
        }`
    );

    return result.users[0]
}

async function userTotalDepositedAmounts(user) {
    const result = await request(API_URL,
        gql`{
            erc20S(where: {owner: "${user}", amount_not: 0}) {
                address
                amount
            }
        }`
    );

    return result
}



async function main() {
    const order = await userTotalDepositedAmounts("0x43b02cdf22d0de535279507cf597969ce82198af");
    console.log(order)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });