// noinspection ES6ConvertRequireIntoImport
let express = require('express');
let {Pool} = require('pg');
let {stockx_challenge, postgres} = require('./configuration');
let {
    onInitializeConvenienceResponseMethods,
    onRequestOrResponseMediaTypeIsUnsupported,
    onInternalServerError
} = require('./middleware');
let {onShoeResourceRequested} = require('./params');
let {
    onCreateShoe,
    onCreateShoeTrueToSizeCalculation,
    onRetrieveShoeTrueToSizeCalculation
} = require('./routes');

let {host, port} = stockx_challenge;
let pool = new Pool(postgres);

let onInitializeDatabase = (req, res, next) => {
    res.locals.database = pool;
    return next();
};

// noinspection JSUnresolvedFunction
express()
    .use(express.static('static'))
    .use(onInitializeDatabase)
    .use(onInitializeConvenienceResponseMethods)
    .use(onRequestOrResponseMediaTypeIsUnsupported)
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .param('shoe', onShoeResourceRequested)
    .post('/catalog/shoes', onCreateShoe)
    .post('/catalog/shoes/:shoe/true_to_size_calculation', onCreateShoeTrueToSizeCalculation)
    .get('/catalog/shoes/:shoe/true_to_size_calculation', onRetrieveShoeTrueToSizeCalculation)
    .use(onInternalServerError)
    .listen(port, host, () => {
        console.log(`Catalog HTTP API running on http://${host}:${port}`);
    });
