const { request, gql } = require('graphql-request');

async function getUserPoolAmount(poolId, user) {
    const result = await request('https://api.thegraph.com/subgraphs/name/kcorkscrew/polygon',
        gql`{
                pools(orderBy:id) {
                    id
                    users(where: {address:"0x79297c94d382cca69af6ca3782907d7a461f9031"}){
                        amount
                    }
                }
            }`
    );
    console.log(result);
}

async function main() {
    await getUserPoolAmount(0, '0-0x016d26e90eca6c56b9411134f752e2a021cd93bf');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });