const { request, gql } = require('graphql-request');
const { GAS_TANK_API_URL } = require("./constants");

async function getUserGasTankData(user) {
    let result = await request(GAS_TANK_API_URL,
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

module.exports = {
    getUserGasTankData
}