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

async function getUserApproval(user, payee) {
    let result = await request(GAS_TANK_API_URL,
        gql`{
            payers(where: {id: "${user}"}) {
                payees(where: {payee: "${payee}"}) {
                    approved
                }
            }
        }`
    );
    return result.payers[0].payees[0].approved
}

module.exports = {
    getUserGasTankData,
    getUserApproval
}