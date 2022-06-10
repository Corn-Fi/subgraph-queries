const { request, gql } = require('graphql-request');
const { CONTROLLER_API_URL } = require("./constants")

async function cleanStrategyToken(data) {
    const token0Tvl = data.erc20[0].erc20Meta.priceUSD * data.erc20[0].amount
    const token1Tvl = data.erc20[1].erc20Meta.priceUSD * data.erc20[1].amount

    let trade = []
    for(let i = 0; i < data.trades.length; i++) {
        trade.push({
            tradeId: data.trades[i].tradeId,
            orders: data.trades[i].orders
        })
    }

    return {
        strategyId: data.strategyId,
        tokenId: data.tokenId,
        valueUSD: token0Tvl + token1Tvl,
        tokenAmounts: [
            {
                name: data.erc20[0].erc20Meta.name,
                symbol: data.erc20[0].erc20Meta.symbol,
                amount: data.erc20[0].amount,
                valueUSD: token0Tvl
            },
            {
                name: data.erc20[1].erc20Meta.name,
                symbol: data.erc20[1].erc20Meta.symbol,
                amount: data.erc20[1].amount,
                valueUSD: token1Tvl
            }
        ],
        trades: trade
    }
}


async function userData(user) {
    const result = await request(CONTROLLER_API_URL,
        gql`{
            users(where: {id: "${user}"}, first: 100) {
                strategyTokens(where: {open: true}) {
                    strategyId
                    tokenId
                    erc20 {
                        erc20Meta {
                            id
                            priceUSD
                            name
                            symbol
                        }
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
    
    let tokens = []
    let tv = 0
    if(result.users[0] == null) {
        return
    }
    for(let i = 0; i < result.users[0].strategyTokens.length; i++) {
        let st = await cleanStrategyToken(result.users[0].strategyTokens[i])
        tokens.push(st)
        tv = tv + st.valueUSD
    }
    return {
        totalUserValueUSD: tv,
        strategyTokens: tokens
    }
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

    let tokens = []
    if(result.users[0] == null) {
        return
    }
    for(let i = 0; i < result.users[0].strategyTokens.length; i++) {
        tokens.push(await cleanStrategyToken(result.users[0].strategyTokens[i]))
    }
    return tokens
}

async function controllerData() {
    const result = await request(CONTROLLER_API_URL,
        gql`{
            controllers {
                id
                strategyCount
                userCount
                totalOrderCount
                openOrderCount
                filledOrderCount
                totalValueUSD
            }
        }`
    );
    return result
}

module.exports = {
    userData,
    userClosedTokens,
    controllerData
}