const path = require('path');
const {DefineTable, hasMany} = require('../../utils/sequelize');
/*
* tableOptions 에 indexes 엔 
{
    unique: false,
    fields: ['pc_file_id', 'mobile_file_id']
}, 이와 같이 사용됨 만약 유니크인경우 filds가 따로 있으면 추가함
appendColumn에서 text(medium) , text(long) , text 가 있음
*
*/

module.exports = (sequelize, DataTypes) => {
    const tableName = path.parse(__filename).name;
    const tableComment = '통계 관리';
    const tableOptions = {
        tableName,
        comment: tableComment,
        indexes: [
            // {
            //     unique: false,
            //     fields: ['pc_file_id', 'mobile_file_id']
            // },
        ]
    }
    const table = new DefineTable(sequelize, DataTypes, tableOptions)
        .appendColumn('id', 'integer')
        .appendColumn('beginer', 'integer', { comment: '신입생' })
        .appendColumn('student', 'integer', { comment: '재학생' })
        .appendColumn('graduate', 'integer', { comment: '졸업생' })
        .done();

    table.associate = (models) => {
      
    }

    return table;
};
