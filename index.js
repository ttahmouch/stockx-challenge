// noinspection ES6ConvertRequireIntoImport
let express = require('express');
let {
    host,
    port
} = require('./configuration.json');
let {
    onInitializeConvenienceResponseMethods,
    onRequestOrResponseMediaTypeIsUnsupported
} = require('./middleware');
let {
    onShoeResourceRequested
} = require('./params');
let {
    onShoeTrueToSizeCalculationCreated,
    onShoeTrueToSizeCalculationRequested
} = require('./routes');

// noinspection JSUnresolvedFunction
express()
    .use(express.static('static'))
    .use(onInitializeConvenienceResponseMethods)
    .use(onRequestOrResponseMediaTypeIsUnsupported)
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .param('shoe', onShoeResourceRequested)
    .post('/catalog/shoes/:shoe/true_to_size_calculation', onShoeTrueToSizeCalculationCreated)
    .get('/catalog/shoes/:shoe/true_to_size_calculation', onShoeTrueToSizeCalculationRequested)
    .listen(port, host, () => {
        console.log(`Catalog HTTP API running on http://${host}:${port}`);
    });
