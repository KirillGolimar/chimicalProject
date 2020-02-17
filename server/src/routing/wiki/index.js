const router = require('express').Router();

//ORGANIZATION
router.get('/organization', function (req, res) {
    console.log(req.query);
    const storageFile = require('./../../permissionsAndGetters/wikiOrganization');
    storageFile('/:id/wiki/organization', req.query.login, req.query.pass, res);
});

//LIST USERS
router.get('/usefulLinks', function (req, res) {
    console.log(req.query);
    const storageFile = require('./../../permissionsAndGetters/wikiUserFullLinks');
    storageFile('/:id/wiki/usefulLinks', req.query.login, req.query.pass, res);
});

//Innovations
router.get('/innovation', function (req, res) {
    console.log(3);
    const innovation = require('./../../permissionsAndGetters/wikiInnovation');
    innovation('/:id/wiki/usefulLinks', req.query.login, req.query.pass, res);
});


module.exports = router;