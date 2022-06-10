const { request, gql } = require('graphql-request');
const { MASTERCHEF_API_URL } = require("./constants")

async function getUserData(user) {
    const result = await request(MASTERCHEF_API_URL,
        gql`{
            poolUsers(where: {user: "${user}"}) {
                pool {
                    id
                    priceUSD
                }
                depositAmount
            }
        }`
    );
    let pools = []
    let totalValue = 0
    for(let i = 0; i < result.poolUsers.length; i ++) {
        let value = result.poolUsers[i].depositAmount * result.poolUsers[i].pool.priceUSD
        pools.push({
            poolId: result.poolUsers[i].pool.id,
            amount: result.poolUsers[i].depositAmount,
            valueUSD: value
        })
        totalValue += value
    }
    return {
        totalUserValueUSD: totalValue,
        pools: pools
    }
}

async function getMasterChefData() {
    let result = await request(MASTERCHEF_API_URL,
        gql`{
            masterchefs {
                id
                poolCount
                cobPerBlock
                userCount
                tvl
                totalAllocationPoints
            }
            pools {
                id
                token
                name
                symbol
                decimals
                lp
                userCount
                totalDeposited
                priceUSD
                tvl
                allocationPoint
                apy
                depositFee
                timestamp
            }
        }`
    )
    return {
        address: result.masterchefs[0].id,
        poolCount: result.masterchefs[0].poolCount,
        cobPerBlock: result.masterchefs[0].cobPerBlock,
        userCount: result.masterchefs[0].userCount,
        tvl: result.masterchefs[0].tvl,
        totalAllocationPoints: result.masterchefs[0].totalAllocationPoints,
        pools: result.pools
    }
}

module.exports = {
    getUserData,
    getMasterChefData
}