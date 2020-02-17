const router = require('express').Router();

router.get('/theme', (req, res) => {
    const getSettingsTheme = require('./../../permissionsAndGetters/settingsTheme');
    getSettingsTheme('/:id/settings/theme', req.query.login, req.query.pass, res)
});


///// Методы по работе с оформлением ( темы )
router.post('/theme/saveTheme', (req, res) => {
    const newTheme = require('./../../settings/theme/newTheme');
    newTheme(req.body, res)
});


/**
 * метод по возврату всех доступных тем
 */
router.get('/theme/allTheme', (req, res) => {
    const allTheme = require('./../../settings/theme/allTheme');
    allTheme(res)
});

/**
 * метод по запросу на актинвые темы
 */
router.get('/theme/activeTheme', (req, res) => {
    const activeTheme = require('./../../settings/theme/getActiveTheme');
    activeTheme(res)
});

router.get('/theme/deleteTheme', (req, res) => {
    const deleteTheme = require('./../../settings/theme/deleteTheme');
    deleteTheme(req.query.id, res)
});

/**
 *  метод удаления активной темы
 */

router.get('/theme/delete/active', (req, res) => {
    const deleteActiveTheme = require('./../../settings/theme/deleteActiveTheme');
    deleteActiveTheme(req.query.id, res)
});

/**
 * метод имзенения темы
 */
router.post('/theme/edit', (req, res) => {
    const editTheme = require('./../../settings/theme/editTheme');
    editTheme({id: req.body.id, info: req.body.data}, res)
});

router.get('/theme/selectedTheme', (req, res) => {
    const newACtiveTheme = require('./../../settings/theme/newActiveTheme');
    newACtiveTheme(req.query.id, res);
});

module.exports = router;