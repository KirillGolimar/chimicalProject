const router = require('express').Router();


//Записывание нового пользовательского события
router.post('/user/newEvent', (req, res) => {
    const addNewEvent = require('./../../switch/сalendar/addNewEvent');
    addNewEvent(req.body, res)
});

/**
 * метод получения всех событий по календарю для пользователя
 */
router.get('/getEvents', (req, res) => {
    const getEventsUser = require('./../../switch/сalendar/getEventsUser');
    getEventsUser(req.query.id, res)
});

// метод вкл/выкл оповещения
router.post('/user/changeEvent', (req, res) => {
    const changeReminder = require('./../../switch/сalendar/changeReminder');
    changeReminder(req.body, res)
});

// метод выполнено/невыполнено событие
router.post('/user/doneEvent', (req, res) => {
    const doneEvent = require('./../../switch/сalendar/doneEvent');
    doneEvent(req.body, res)
});

// метод удаления события пользователя
router.post('/user/deleteEvents', (req, res) => {
    const deleteEvent = require('./../../switch/сalendar/deleteEvent');
    deleteEvent(req.body, res)
});

module.exports = router;