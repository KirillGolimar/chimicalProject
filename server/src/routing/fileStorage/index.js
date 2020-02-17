const router = require('express').Router();

router.get('/', (req,res) => {
    const storageFile = require('./../../permissionsAndGetters/storageFile');
    storageFile('/:id/storageFile', req.query.login, req.query.pass, res)
});

router.delete('/delete', (req,res) => {
    const fileStorageDelete = require('./../../fileStorage/deleteFile/deleteFile');
    fileStorageDelete('/:id/storageFile', req.query.login, req.query.pass, res)
});

router.post('/change', (req,res) => {
    const changeName = require('./../../fileStorage/changeFile/changeNameFile');
    changeName('/:id/storageFile', req.query.login, req.query.pass, res)
});

/**
 * метод добавления новых файлов на вервер
 */
router.post('/addFiles', function (req, res) {
    const fileStorageAddFiles = require('./../../fileStorage/addFiles/addFiles');
    if (req.files && req.files.file) {
        fileStorageAddFiles(req.files.file, req.body.url, res)
    } else {
        res.send({
            typeMessage: 'error',
            status: false,
            message: 'пустый файлы загружать нельзя'
        })
    }
});


module.exports = router;
