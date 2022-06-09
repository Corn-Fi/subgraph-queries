const { request, gql } = require('graphql-request');
const { CONTROLLER_API_URL } = require("./constants")


async function userOpenTokens(user) {
    const result = await request(CONTROLLER_API_URL,
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
    const result = await request(CONTROLLER_API_URL,
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
    const result = await request(CONTROLLER_API_URL,
        gql`{
            erc20S(where: {owner: "${user}", amount_not: 0}) {
                address
                amount
            }
        }`
    );

    return result
}

module.exports = {
    userOpenTokens,
    userClosedTokens,
    userTotalDepositedAmounts
}