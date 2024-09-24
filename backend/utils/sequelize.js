class DefineTable {
    constructor(sequelize, DataTypes, options = {}) {
        this.sequelize = sequelize;
        this.DataTypes = DataTypes;
        this.options = options;
        this.columns = {};
    }

    appendColumn(columnName, columnType = null, options = {}) {
        if (this.columns[columnName]) {
            throw new Error(`Duplicated column name: ${columnName}`);
        }
        if (columnName === 'id') {
            this.columns[columnName] = {
                type: this.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            };
        } else {
            if (/^string\(\d+\)$/.test(columnType)) {
                const size = +columnType.replace(/^string\((\d+)\)$/, '$1');
                this.columns[columnName] = {
                    type: this.DataTypes.STRING(size),
                    allowNull: false,
                    comment: null,
                    ...options
                };
                return this;
            } else if (columnType.startsWith('text')) {
                let textType = 'text'; // 기본값은 text
                if (columnType.includes('long')) textType = 'long';
                else if (columnType.includes('medium')) textType = 'medium';
                else if (columnType.includes('tiny')) textType = 'tiny';

                this.columns[columnName] = {
                    type: this.DataTypes.TEXT(textType),
                    allowNull: false,
                    comment: null,
                    ...options
                };
            } else {
                if (!this.DataTypes[columnType.toUpperCase()]) {
                    throw new Error(`Invalid column type: ${columnType}`);
                }
                this.columns[columnName] = {
                    type: this.DataTypes[columnType.toUpperCase()],
                    allowNull: false,
                    comment: null,
                    ...options
                };
            }
        }
        return this;
    }

    done() {
        if (!this.options.tableName) {
            throw new Error(`Table name is not set`);
        }
        if (this.options.indexes) { // Indexes 의 유효성 검사
            if (!Array.isArray(this.options.indexes)) {
                throw new Error(`Invalid type of indexes option: ${typeof this.options.indexes}`);
            }
            this.options.indexes.forEach(index => {
                if (!index.fields) {
                    throw new Error(`Invalid index option: ${JSON.stringify(index)}`);
                }
            });
        }
        return this.sequelize.define(this.options.tableName,
            this.columns,
            {
                freezeTableName: true,
                tableName: this.options.tableName,
                initialAutoIncrement: 1000,
                ...this.options
            }
        );
    }
}


function hasMany(models, src, dst, options = {}) {
    const foreignKey = src + 'Id';
    models[src].hasMany(models[dst], {
        foreignKey: {
            allowNull: options.allowNull || false,
            name: options.name || foreignKey,
            comment: options.comment
        },
        onDelete: options.onDelete || 'CASCADE',
        as: options.as || null
    });
    models[dst].belongsTo(models[src], {
        foreignKey: {
            allowNull: options.allowNull || false,
            name: options.name || foreignKey,
            comment: options.comment
        },
        onDelete: options.onDelete || 'CASCADE',
        as: options.as || null
    });
}

function hasOne(models, src, dst, options = {}) {
    const foreignKey = src + 'Id';
    models[src].hasOne(models[dst], {
        foreignKey: {
            allowNull: options.allowNull || false,
            name: options.name || foreignKey,
            comment: options.comment
        },
        onDelete: options.onDelete || 'CASCADE',
        as: options.as || null
    });
    models[dst].belongsTo(models[src], {
        foreignKey: {
            allowNull: options.allowNull || false,
            name: options.name || foreignKey,
            comment: options.comment
        },
        onDelete: options.onDelete || 'CASCADE',
        as: options.as || null
    });
}

function manyToMany(models, src, dst, options = {}) {
    const foreignKey = src + 'Id';
    const otherKey = dst + 'Id';
    if (!options.through) {
        throw new Error('through option is required');
    }
    models[src].belongsToMany(models[dst], {
        through: options.through, // 중간 테이블
        foreignKey: {
            allowNull: options.allowNull || false,
            name: options.name || foreignKey
        },
        onDelete: options.onDelete || 'CASCADE',
        as: options.as || null
    });
    models[dst].belongsToMany(models[src], {
        through: options.through, // 중간 테이블
        foreignKey: {
            allowNull: options.allowNull || false,
            name: options.name || otherKey
        },
        onDelete: options.onDelete || 'CASCADE',
        as: options.as || null
    });
}

function createOrderByClause(data, defaultColumn) {
    let result = [];
    if (Array.isArray(data)) {
        for (let item of data) {
            const split = item.split(APP_CONSTANTS.DELIMITER_SUB);
            result.push(`${split[0]} ${split[1]}`);
        }
    } else {
        const split = data.split(APP_CONSTANTS.DELIMITER_SUB);
        result.push(`${split[0]} ${split[1]}`);
    }

    if (!result.length) {
        result.push(`${defaultColumn || 'id'} DESC`);
    }

    result = 'ORDER BY ' + result.join(', ');
    return result;
}

module.exports = {hasMany, hasOne, DefineTable, createOrderByClause, manyToMany};
