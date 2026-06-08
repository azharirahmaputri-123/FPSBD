const db = require('./database/db');

async function test() {

    try {

        const [rows] = await db.query(
            'SELECT NOW() as waktu'
        );

        console.log(rows);

    } catch(err) {

        console.log(err);

    }

}

test();