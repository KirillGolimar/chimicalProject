const router = require('express').Router();

/**
 * метод удаления строк из БД
 */
router.delete('/removeFromTable', function (req, res) {
    const dbUsersDelete = require('./../../mainMethods/deleteData/deleteFromTable');
    dbUsersDelete(req.query, res)
});

/**
 * метод отправки сообщения
 */
router.post('/addMessage', function (req, res) {
    const addMessageInUser = require('./../../mainMethods/addMessage/addMEssage');
    addMessageInUser(req.body, res)
});

/**
 * метод получения всех сообщений для пользователя
 */

router.get('/getMessage', (req, res) => {
    const getAllMessage = require('./../../mainMethods/messageInUser/getMessage');
    getAllMessage(req.query.id, res)
});

/**
 * метод прочитывания сообщения
 */
router.get('/statusMessage', (req, res) => {
    const readMessage = require('./../../mainMethods/readMessage/readMessage');
    readMessage(req.query.id, res);
});

/**
 * общий метод отправки письма
 * отправляет внутри системы или на поту
 * возможность отправки нескольким адресатам
 */
router.post('/message/new', function (req, res) {
    if (req.body.typeMessage === 'system') {
        require('./../../mainMethods/addMessage/letterSendingSystem')(req.body, res)
    } else if (req.body.typeMessage === 'mail') {
        require('./../../mainMethods/addMessage/letterSendingMail')(req.body, res)
    }
});

router.get('/change/status/table', (req, res) => {
    require('./../../mainMethods/tableMethods/changeStatusTable')(req.query, res)
})


module.exports = router;