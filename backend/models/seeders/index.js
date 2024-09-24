const fs = require('fs');
const path = require('path');
const {camelToPascal} = require('../../utils/string');
// 우선 순위 테이블 정의
const highPriority = [];

module.exports = {
    run: async function (db) {
        try {
            const seederDirectory = __dirname;
            const files = fs.readdirSync(seederDirectory);

            const seederFiles = files.filter(file => {
                const isJsFile = file.slice(-3) === '.js';
                const isNotHidden = file.indexOf('.') !== 0;
                const isNotIndex = file !== 'index.js';
                return isJsFile && isNotHidden && isNotIndex;
            });
            const seederName = seederFiles.map(item => item.replace(/\.js/, ''));

            seederName.sort((x, y) => {
                const xIndex = highPriority.indexOf(x);
                const yIndex = highPriority.indexOf(y);

                if (xIndex !== -1 && yIndex === -1) return -1;
                if (yIndex !== -1 && xIndex === -1) return 1;
                if (xIndex !== -1 && yIndex !== -1) return xIndex - yIndex;
                return 0;
            });
            for (let file of seederName) {
                const seeder = require(path.join(seederDirectory, file));
                if (typeof seeder !== 'function') {
                    serverLog(`[Seeders] '${file}' did not return a function.`);
                    continue;
                }
                const seeds = await seeder();
                if (!seeds || !seeds.length) {
                    serverLog(`[Seeders] '${file}' no record found.`);
                    continue;
                }
                file = camelToPascal(file);
                const existData = await db[file].findOne({logging: false});
                if (!existData) {
                    await db[file].bulkCreate(seeds, {logging: false});
                    console.log(KST().toLocaleString(), `[Seeders] Insert default "${file}".`);
                }
            }
        } catch (e) {
            throw e;
        }
    }
};
