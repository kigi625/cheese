const {CreateController, CreateControllerTx} = require('../../utils/express');

module.exports = {
    getCsrfToken: CreateController('getCsrfToken', async ({req}) => {
        try {
            return {csrfToken: req.csrfToken()};
        } catch (e) {
            throw e;
        }
    })
};
