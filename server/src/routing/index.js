module.exports = {
    ''                          : require('./main'),
    '/:id/storageFile'          : require('./fileStorage'),
    '/:id/wiki'                 : require('./wiki'),
    '/:id/settings'             : require('./settings'),
    '/calendar'                 : require('./calendar'),
};