const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const fileUlpoad = require('express-fileupload')


const config = require('./config/config');
//:TODO ИМИТАЦИЯ БАЗЫ
const dataSlider = require('./data/dataSlider');
const cardInfo = require('./data/dataCardHomeNoAuthorization');
const linksRole = require('./data/usersListLinks'); //модуль доступных ссылок по ролям

/**
 * МОДУЛИ НАВИГАЦИИ ДЛЯ КЛИЕНТА
 */
// const connection = require('./register/pool'); //инфа по бд


const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(fileUlpoad())

const poll = mysql.createPool(config.dataBase).promise();


app.get('/', (req, res) => {
    res.send({
        slider: dataSlider.dataSlider,
        cardInfo: cardInfo.cardInfo
    })
});


/**
 * ЛОВИМ ЗАПРОС НА РЕГИСТРАЦИЮ С КЛИЕНТА
 * ПРОВЕРЯЕМ, ЕСЛИ ЕСТЬ ТАКОЙ ПОЛЬЗОВАТЕЛЬ ТО НЕ ДОБАВЛЯЕМ , ЕСЛИ НЕТ ДОБАВЛЯЕМ
 */
app.post('/register', (req, response) => {
    const dataDb = {
        name: req.body.name.toLowerCase(),
        lastName: req.body.lastName.toLowerCase(),
        firstName: req.body.firstName.toLowerCase(),
        login: req.body.login.toLowerCase(),
        pass: req.body.pass.toLowerCase(),
        mail: req.body.mail.toLowerCase(),
        phone: req.body.phone.toLowerCase(),
        position: req.body.position.toLowerCase()
    } //собрал данные :TODO дописать проверку на символы и шифрование пароля
    let dataInUser = [];
    const moduleRegister = require('./register/register');
    moduleRegister(dataDb, poll, response, dataInUser)

});

/**
 * ЛОВИМ ЗАПРОС НА АВТОРИЗАЦИЮ
 */
app.post('/authorization', (req, res) => {
    const dbUser = {
        login: req.body.login.toLowerCase(),
        pass: req.body.pass.toLowerCase(),
    };
    const moduleAuth = require('./register/authorization');
    moduleAuth(dbUser, poll, res, linksRole.roleLinks, req.headers['accept-language'].substr(0, 2))
})


/**
 * ОБРАБОТКА ВХОДА ЕСЛИ ЕСТЬ ЗАПИСЬ В ХРАНИЛИЩЕ ЛОКАЛЬНОМ
 */
app.post('/lsAuthorization', (req, res) => {
    const authLocalStorage = require('./register/authorizationLocalStorage');
    authLocalStorage(req.body.id, poll, res, linksRole.roleLinks, req.headers['accept-language'].substr(0, 2))
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                     МЕТОДЫ ПО ДОСТУПУ К ССЫЛКЕ                                                     //
//                                          ПРОВЕРКА ДОСТУПА                                                          //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ORGANIZATION
app.get('/:id/wiki/organization', function (req, res) {
    console.log(req.query)
    const storageFile = require('./permissionsAndGetters/wikiOrganization');
    storageFile('/:id/wiki/organization', req.query.login, req.query.pass, res)
});

//LIST USERS
app.get('/:id/wiki/usefulLinks', function (req, res) {
    console.log(req.query)
    const storageFile = require('./permissionsAndGetters/wikiUserFullLinks');
    storageFile('/:id/wiki/usefulLinks', req.query.login, req.query.pass, res)
});

//Innovations
app.get('/:id/wiki/innovation', function (req, res) {
    console.log(req.query)
    const innovation = require('./permissionsAndGetters/wikiInnovation')
    innovation('/:id/wiki/usefulLinks', req.query.login, req.query.pass, res)
});

// app.get('/:id/wiki', (req, res) => {
//     const storageFile = require('./permissionsAndGetters/wikiUserFullLinks')
//     storageFile('/:id/wiki/usefulLinks',req.query.login, req.query.pass, res)
// })

app.get('/:id/settings/theme', (req, res) => {
    const getSettingsTheme = require('./permissionsAndGetters/settingsTheme')
    getSettingsTheme('/:id/settings/theme', req.query.login, req.query.pass, res)
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get('/:id/administration', (req, res) => {
    const getAdministration = require('./permissionsAndGetters/administration');
    getAdministration('/:id/administration', req.query.login, req.query.pass, res)
});

app.get('/:id/storageFile', (req, res) => {
    const storageFile = require('./permissionsAndGetters/storageFile')
    storageFile('/:id/storageFile', req.query.login, req.query.pass, res)
});

app.get('/:id/support', (req, res) => {
    const storageFile = require('./permissionsAndGetters/supportTable')
    storageFile('/:id/support', req.query.login, req.query.pass, res)
});

//****************++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ТЕСТЫ
app.get('/:id/testings/newTest' , (req,res) => {
    require('./testing/construcotTest')('/:id/testings/newTest',req.query.login, req.query.pass, res)
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * МЕТОДЫ ПО РАБОТЕ В АДМИНКЕ
 */

app.get('/administration/status/change', (req, res) => {
    const status = req.query.status === 'null' ? 1 : null;
    const qqq = require('./moduleAdminka/status');
    qqq(poll, req.query.id, status, res)
})

/**
 * МЕТОД НА ИЗМЕНЕНИЕ РОЛИ ПОЛЬЗОВАТЕЛЯ
 */
app.put('/administration/put/roleUser', (req, res) => {
    //если метод по изменению роли
    if (req.body.typeSet === 'role') {
        const dbRoleUser = require('./moduleAdminka/putRole');
        dbRoleUser(poll, req.body.id, req.body.roleId, res)
    }
})

/**
 * удаление пользователя
 */
app.delete('/deleteUsers', (req, res) => {
    const deleteUser = require('./moduleAdminka/deleteUsers');
    deleteUser(poll, req.query.id, res)
});

app.get('/reset/paswword/all', (req, res) => {
    require('./moduleAdminka/resetAllPasswordUsers')(poll, res,poll)
});

app.get('/generation', (req, res) => {
    require('./moduleAdminka/generationUsers')(poll, res, req.query.counter)
})


/***
 * МЕТОДЫ ФАЙЛОВОГО ХРАНИЛИЩА
 */

//удаление файлов ( папок )
app.del('/:id/storageFile/delete', function (req, res) {
    const fileStorageDelete = require('./fileStorage/deleteFile/deleteFile');
    fileStorageDelete(req.query.url, res)
});

//изменение имени файла
app.post('/:id/fileStorage/change', function (req, res) {
    const changeName = require('./fileStorage/changeFile/changeNameFile')
    changeName(req.body, res)
});

/**
 * метод добавления новых файлов на вервер
 */
app.post('/:id/fileStorage/addFiles', function (req, res) {
    const fileStorageAddFiles = require('./fileStorage/addFiles/addFiles');
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

/**
 * МЕТОД ОБРАБОТКИ ОТКРЫТИЯ ФАЙЛА С ХРАНИЛИЩА
 */
app.get('/:id/fileStorage/open', function (req, res) {
    const openFile = require('./fileStorage/openFile/openFile')
    openFile(req.query.url, res)
})


///////////////////////////////////////////////////////////////////////// МЕТОДЫ РАБОТЫ МОДУЛЕЙ П ОТЕХНИЧЕСКОЙ ПОДДЕРЖКЕ

/**
 * Метод обращения к странице технической поддержки
 */
// app.get('/:id/support/getData', function (req, res) {
//     const getMessage = require('./support/getData/getMessage')
//     getMessage(res)
// })

/**
 * метод сохранения обращения ( сохранения сообщения в бд)
 */
app.post('/:id/support/addMessage', function (req, res) {
    const addMessageSupport = require('./support/addMessage/addMessage')
    addMessageSupport(req.body, res)
});

app.get('/change/status/table', (req, res) => {
    require('./mainMethods/tableMethods/changeStatusTable')(req.query, res)
})


///////////////////////////////////////////////////////////////// МЕТОДЫ РАБОТЫ МОДУЛЕЙ СЕРВИСОВ


/***********************************************************
 *   АДРЕСА РАБОТЫ С НАСТРОЙКАМИ
 ***********************************************************/


/////////////////////////////////////////////////////////////////////ОБЩИЕ МЕТОДЫ
/**
 * метод удаления строк из БД
 */
app.del('/removeFromTable', function (req, res) {
    const dbUsersDelete = require('./mainMethods/deleteData/deleteFromTable')
    dbUsersDelete(req.query, res)
});

/**
 * метод отправки сообщения
 */
app.post('/addMessage', function (req, res) {
    const addMessageInUser = require('./mainMethods/addMessage/addMEssage')
    addMessageInUser(req.body, res)
    // res.send({status:true, message:'сообщение отправлено',typeMessage:'success'})
})

/**
 * общий метод отправки письма
 * отправляет внутри системы или на поту
 * возможность отправки нескольким адресатам
 */
app.post('/message/new', function (req, res) {
    if (req.body.typeMessage === 'system') {
        require('./mainMethods/addMessage/letterSendingSystem')(req.body, res)
    } else if (req.body.typeMessage === 'mail') {
        require('./mainMethods/addMessage/letterSendingMail')(req.body, res)
    }
});


/**
 * метод получения всех сообщений для пользователя
 */

app.get('/getMessage', (req, res) => {
    const getAllMessage = require('./mainMethods/messageInUser/getMessage')
    getAllMessage(req.query.id, res)
})
/**
 * метод прочитывания сообщения
 */
app.get('/statusMessage', (req, res) => {
    const readMessage = require('./mainMethods/readMessage/readMessage')
    readMessage(req.query.id, res)
})


//////////////////////////////////////////////// МЕТОДЫ ПО СЛАЙДЕРУ КАЛЕНДАРЬ

//Записывание нового пользовательского события
app.post('/calendar/user/newEvent', (req, res) => {
    const addNewEvent = require('./switch/сalendar/addNewEvent')
    addNewEvent(req.body, res)
})

/**
 * метод получения всех событий по календарю для пользователя
 */

app.get('/getEvents/calendar', (req, res) => {
    const getEventsUser = require('./switch/сalendar/getEventsUser')
    getEventsUser(req.query.id, res)
})

// метод вкл/выкл оповещения
app.post('/calendar/user/changeEvent', (req, res) => {
    const changeReminder = require('./switch/сalendar/changeReminder')
    changeReminder(req.body, res)
})

// метод выполнено/невыполнено событие
app.post('/calendar/user/doneEvent', (req, res) => {
    const doneEvent = require('./switch/сalendar/doneEvent')
    doneEvent(req.body, res)
})

// метод удаления события пользователя
app.post('/calendar/user/deleteEvents', (req, res) => {
    const deleteEvent = require('./switch/сalendar/deleteEvent')
    deleteEvent(req.body, res)
})


////////////////////////////////////////////////////////////////// Методы по работе с блоком насттроек !!!!

///// Методы по работе с оформлением ( темы )
app.post('/settings/theme/saveTheme', (req, res) => {
    const newTheme = require('./settings/theme/newTheme')
    newTheme(req.body, res)
})

/**
 * метод по возврату всех доступных тем
 */
app.get('/settings/theme/allTheme', (req, res) => {
    const allTheme = require('./settings/theme/allTheme')
    allTheme(res)
})

/**
 * метод по запросу на актинвые темы
 */
app.get('/settings/theme/activeTheme', (req, res) => {
    const activeTheme = require('./settings/theme/getActiveTheme')
    activeTheme(res)
})


/**
 *  метод удаления темы
 */

app.get('/settings/theme/deleteTheme', (req, res) => {
    const deleteTheme = require('./settings/theme/deleteTheme')
    deleteTheme(req.query.id, res)
})


/**
 *  метод удаления активной темы
 */

app.get('/settings/theme/delete/active', (req, res) => {
    const deleteActiveTheme = require('./settings/theme/deleteActiveTheme')
    deleteActiveTheme(req.query.id, res)
})

/**
 * метод имзенения темы
 */
app.post('/settings/theme/edit', (req, res) => {
    const editTheme = require('./settings/theme/editTheme')
    editTheme({id: req.body.id, info: req.body.data}, res)
})


/**
 * метод изменения дополнительной темы
 */

app.get('/settings/theme/selectedTheme', (req, res) => {
    const newACtiveTheme = require('./settings/theme/newActiveTheme')
    newACtiveTheme(req.query.id, res)
});



/***********************************************************
 *   АДРЕСА РАБОТЫ ТЕСТИРОВАНИЯ
 ***********************************************************/
//////////////////////////////////////////////// тестовый массив ответов
const testAnswer = [
    {id: 1, description: 'ответ 1'},
    {id: 2, description: 'ответ 2'},
    {id: 3, description: 'ответ 3'},
    {id: 4, description: 'ответ 4'},
    {id: 5, description: 'ответ 5'},
    {id: 6, description: 'ответ 6'},
    {id: 12, description: 'ответ 7'},
    {id: 7, description: 'ответ 8'},
    {id: 8, description: 'ответ 9'},
];
////////////////////////////////////////////////////// тестовый массив классификаторов вопросов
let classifiersQuest = [
    {id: 1, name: 'органическая химия', group: 1},
    {id: 2, name: 'неорганическая химия', group: 1},
    {id: 3, name: 'аналитическая химия', group: 1},
    {id: 4, name: 'мат анализ', group: 2},
    {id: 5, name: 'линейная алгебра', group: 2},
    {id: 6, name: 'введение в математический анализ', group: 3},
];
/**
 * массив групп классификаторов
 * @type {*[]}
 */
const groupClassifiers = [
    {id: 1, name: 'химия'},
    {id: 2, name: 'матан'},
    {id: 3, name: 'другое'},
    {id: 421, name: 'геометрия'},
];
///////////////////////////////////////////////////// тестовый массив вопросов
const testQuest = [
    {
        id: 1, //идентификатор вопроса
        question: 'Вопрос тестовый и нужо смотреть что да как, что кого', // собственно сам вопрос
        answersId: [1, 5, 4, 2], //идентификаторы  вариантов ответов
        typeQuestion: 'single',
        correctAnswer: [5], // идентификатор правильно вопроса
        classifiers: [] // классификаторы вопроса
    },
    {
        id: 2, //идентификатор вопроса
        question: 'Вопрос тестовый и нужо смотреть что да как, что кого 2', // собственно сам вопрос
        answersId: [3, 1, 7, 2], //идентификаторы  вариантов ответов
        typeQuestion: 'checkbox',
        correctAnswer: [1, 3], // идентификатор правильно вопроса
        classifiers: [] // классификаторы вопроса
    },
];

/**
 * класс по созданию нового теста
 */
class NewTest {
    constructor(nameTest, settings, quest) {
        this.id = null;
        this.nameTest = nameTest;
        this.settings = settings;
        this.questId = quest
    }

    generationId() {
        // :TODO тут будт норм работа по созданию, с базы приходит id
        this.id = Math.ceil(Math.random() * 5000)
    }

    // :TODO возврат объекта ( id уберу т.к. созхдаеться новый тест, сохраняеться в базе и из нее уже возвращаеться id )
    resultNewTest() {
        this.generationId();
        return this
    }

}

// массив доступных тестов
const tests = [
    {
        id: 2048, nameTest: "Тест по химии", settings: {assessment: "", time: {flag: true, time: "12:12"}},
        id: 2048,
        nameTest: "Тест по химии",
        settings: {assessment: "", time: {flag: true, time: "12:12"}},
        assessment: "",
        time: {flag: true, time: "12:12"},
        flag: true,
        time: "12:12",
        questId: [1, 2],
        0: 1,
        1: 2,
    }
];

app.get('/answers/all', (req, res) => {
    //Подготовка объекта по группам классификаторов и клиссификаторов
    let resClassifiersGroup = {};
    groupClassifiers.forEach(el => {
        resClassifiersGroup[el.name] = [];
        classifiersQuest.forEach(clFQuest => {
            if (clFQuest.group === el.id) {
                resClassifiersGroup[el.name].push(clFQuest)
            }
        })
    });
    ///////////////////////////
    res.send({
        answer: testAnswer,
        question: testQuest,
        classifiersQuest: resClassifiersGroup,
        allTest: tests
    })
});

// метод удаления варианта пока что из тестового массива
app.get('/testings/answer/delete', (req, res) => {
    testAnswer.forEach((el, i, arr) => {
        if (el.id === Number(req.query.id)) {
            arr.splice(i, 1)
        }
    });
    res.send({id: req.query.id, lengthAnswer: testAnswer.length})
});
// добавление нового варианта ответа
app.post('/testings/answer/add', (req, res) => {
    if (testAnswer.length === 0) {
        testAnswer.push({id: 1, description: req.body.description});
    } else {
        testAnswer.push({id: testAnswer[testAnswer.length - 1].id + 1, description: req.body.description});
    }
    res.send(testAnswer[testAnswer.length - 1]) // отправляю последний добавленный вариант
});
/////добавление новго вопроса
app.post('/question/add', (req, res) => {
    let counter = testQuest.length;
    testQuest.push(Object.assign({id: testQuest[testQuest.length - 1].id + 1}, req.body))
    if (counter === testQuest.length) {
        res.send({status: false})
    } else {
        res.send({status: true, question: testQuest[testQuest.length - 1]})
    }
});

/////////////////////Classifiers
// добавление новой группы классификаторов
app.post('/classifiers/group/add', (req, res) => {
    //:TODO написать проверку на существование уже такой группы
    groupClassifiers.push({id: groupClassifiers[groupClassifiers.length - 1].id + 1, name: req.body.name});
    //Подготовка объекта по группам классификаторов и клиссификаторов
    let resClassifiersGroup = {};
    groupClassifiers.forEach(el => {
        resClassifiersGroup[el.name] = [];
        classifiersQuest.forEach(clFQuest => {
            if (clFQuest.group === el.id) {
                resClassifiersGroup[el.name].push(clFQuest)
            }
        })
    });
    ///////////////////////////
    res.send({classifiersGroup: resClassifiersGroup})
});
/**
 * добавление нового классификатора в группу
 */
app.post('/classifiers/new', (req, res) => {
    classifiersQuest.push({
        id: classifiersQuest.length > 0 ? classifiersQuest[classifiersQuest.length - 1].id + 1 : Math.ceil(Math.random() * 10000),
        name: req.body.title,
        group: groupClassifiers.find(el => el.name === req.body.group).id
    });

    let resClassifiersGroup = {};
    groupClassifiers.forEach(el => {
        resClassifiersGroup[el.name] = [];
        classifiersQuest.forEach(clFQuest => {
            if (clFQuest.group === el.id) {
                resClassifiersGroup[el.name].push(clFQuest)
            }
        })
    });
    ///////////////////////////
    res.send({classifiersGroup: resClassifiersGroup})
});
/**
 * обработка удаления группы классификтаоров
 */
app.get('/classifiers/delete/group', (req, res) => {
    //:TODO при удалении группы, нужно сначала прогнать все классфикаторы по group id что бы изменить на другое и потом удалить сам группу
    if (req.query.group !== 'другое') {
        let idGroup = groupClassifiers.find(el => el.name === req.query.group).id; //нашел id группы
        classifiersQuest = classifiersQuest.map(el => {
            if (el.group === idGroup) {
                el.group = groupClassifiers.find(gr => gr.name === 'другое').id
            }
            return el
        });
        groupClassifiers.forEach((el, i, arr) => el.id === idGroup ? arr.splice(i, 1) : '');
    }
    //Подготовка объекта по группам классификаторов и клиссификаторов
    let resClassifiersGroup = {};
    groupClassifiers.forEach(el => {
        resClassifiersGroup[el.name] = [];
        classifiersQuest.forEach(clFQuest => {
            if (clFQuest.group === el.id) {
                resClassifiersGroup[el.name].push(clFQuest)
            }
        })
    });
    res.send({classifiersGroup: resClassifiersGroup})

});
/**
 * метод удаления классификтаора gj id
 */
app.get('/classifiers/delete', (req, res) => {
    console.log(classifiersQuest.length)
    classifiersQuest.forEach((el, i, arr) => {
        if (el.id === Number(req.query.id)) {
            arr.splice(i, 1)
        }
    });
    console.log(classifiersQuest.length)
    let resClassifiersGroup = {};
    groupClassifiers.forEach(el => {
        resClassifiersGroup[el.name] = [];
        classifiersQuest.forEach(clFQuest => {
            if (clFQuest.group === el.id) {
                resClassifiersGroup[el.name].push(clFQuest)
            }
        })
    });
    res.send({classifiersGroup: resClassifiersGroup})

});
app.post('/classifiers/transfer', (req, res) => {
    let neGroupId = groupClassifiers.find(el => el.name === req.body.groupName).id; //нашел id группы

    let resClassifiersGroup = {};
    groupClassifiers.forEach(el => {
        resClassifiersGroup[el.name] = [];
        classifiersQuest.forEach(clFQuest => {
            if (clFQuest.group === el.id) {
                resClassifiersGroup[el.name].push(clFQuest)
            }
        })
    });
    res.send({classifiersGroup: resClassifiersGroup})
});
//////////////////// новый тест
app.post('/testings/new/test', (req, res) => {
    let test = new NewTest(req.body.nameTest, req.body.settings, req.body.quest);
    tests.push(test.resultNewTest())
    res.send(tests)
})



///////////////////////////////////////////////////////////


app.listen(config.port, () => {
    console.log(`server start in port ${config.port}`)
})



