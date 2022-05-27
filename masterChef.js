const { request, gql } = require('graphql-request');

const API_URL = 'https://api.thegraph.com/subgraphs/name/kcorkscrew/polygon'

async function getUserPoolAmounts(user) {
    const result = await request(API_URL,
        gql`{
                pools(orderBy:id) {
                    id
                    users(where: {address:"${user}"}){
                        amount
                    }
                }
            }`
    );
    return result
}

async function getPoolAmounts() {
    let result = await request(API_URL,
        gql`{
                pools(orderBy: id) {
                    id
                    pair
                    balance
                }
            }`
    );
    return result
}

async function main() {
    const userPoolAmounts = await getUserPoolAmounts("0x79297c94d382cca69af6ca3782907d7a461f9031");
    const poolAmounts = await getPoolAmounts()
    console.log(poolAmounts)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });