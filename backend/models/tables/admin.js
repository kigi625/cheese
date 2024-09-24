const path = require('path');
const {DefineTable, hasMany} = require('../../utils/sequelize');

module.exports = (sequelize, DataTypes) => {
    const tableName = path.parse(__filename).name;
    const tableComment = '관리자';
    const tableOptions = {
        tableName,
        comment: tableComment
    };
    const table = new DefineTable(sequelize, DataTypes, tableOptions)
    .appendColumn('id', 'integer')
    .appendColumn('email', 'string', {comment: '이메일'})
    .appendColumn('password', 'string', {comment: '비밀번호'})
    .appendColumn('passwordSalt', 'string', {comment: '비밀번호 암호화 Salt'})
    .appendColumn('isEnabled', 'string(1)', {comment: '활성화 여부'})
    .done();

    return table;
};
