const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const config = require('../config/database');
const { camelToPascal, snakeToPascal } = require('../utils/string');
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const tablePath = path.join(__dirname, 'tables');
const tableFiles = fs.readdirSync(tablePath);

const validFiles = tableFiles.filter((file) =>
    file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js'
);

for (const file of validFiles) {
    const modelPath = path.join(tablePath, file);
    const defineModel = require(modelPath);
    const model = defineModel(db.sequelize, db.Sequelize.DataTypes);
    db[model.name] = model;
}

for (const modelName in db) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
}

for (const modelName in db) {
    if (modelName !== 'sequelize' && modelName !== 'Sequelize') {
        const newModelName = snakeToPascal(modelName);
        db[newModelName] = db[modelName];
        delete db[modelName];
    }
}

module.exports = db;
