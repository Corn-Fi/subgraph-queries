const { request, gql } = require('graphql-request');
const { MASTERCHEF_API_URL } = require("./constants")

async function getUserData(user) {
    const result = await request(MASTERCHEF_API_URL,
        gql`{
            poolUsers(where: {user: "${user}"}) {
                pool {
                    id
                }
                depositAmount
            }
        }`
    );
    return result
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
    return result
}

module.exports = {
    getUserData,
    getMasterChefData
}