const {CreateController, CreateControllerTx} = require('../../utils/express');
const { TotalAnaly } = require('../../models');
const sequelize = require('sequelize');

module.exports = {
    getResult: CreateController('getResult', async ({req}) => {
        try {
            const result = await TotalAnaly.findOne({
                where: {
                    id: 1
                }
            });
            return {result};
        } catch (e) {
            throw e;
        }
    }),
    getTotalAnaly: CreateController('getTotalAnaly', async ({req}) => {
        try {
            const params = req.body;
            let column = '';
            // 카운터 증가
            if(params.grade === 1){
                column = 'beginer';
            }else if(params.grade === 2){
                column = 'student';
            }else if(params.grade === 3){
                column = 'graduate';
            }
            // 카운터 증가 
            await TotalAnaly.update(
                {
                    [column]: sequelize.literal('`' + column + '` + 1')
                },
                {
                    where: {
                        id: 1
                    }
                }
            )
            return {success: true};
        } catch (e) {
            throw e;
        }
    }),
    getCsrfToken: CreateController('getCsrfToken', async ({req}) => {
        try {
            return {csrfToken: req.csrfToken()};
        } catch (e) {
            throw e;
        }
    })
};
