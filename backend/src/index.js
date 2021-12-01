require('dotenv').config();

const app = require('./app');
const db = require('./database');

async function main(){
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();