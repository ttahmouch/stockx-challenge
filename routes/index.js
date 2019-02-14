module.exports = {
    onCreateShoe: (req, res, next) => {
        let body = req.body || {};
        let {name} = body;
        let requestBodyIsUnprocessable = typeof name !== 'string' || !name;
        let createShoeWithName = `INSERT INTO shoes (name) VALUES ('${name}');`;

        if (requestBodyIsUnprocessable) {
            return res.locals.sendResponse({
                status: 422,
                headers: {},
                body: {reason: 'Unprocessable Entity', message: 'Name MUST be a string.', name}
            });
        } else {
            return res.locals.database.query(createShoeWithName, (error) => {
                if (error) {
                    return next(error);
                } else {
                    return res.locals.sendResponse({
                        status: 201,
                        headers: {location: `/catalog/shoes/${encodeURI(name)}`},
                        body: {reason: 'Created', name}
                    });
                }
            });
        }
    },
    onCreateShoeTrueToSizeCalculation: (req, res, next) => {
        let {name} = res.locals.shoe;
        let body = req.body || {};
        let size = Number(body.size);
        let requestBodyIsUnprocessable = !Number.isInteger(size) || size < 1 || size > 5;
        let createShoeTrueToSizeCalculation = `INSERT INTO shoes_true_to_size_data (name, true_to_size) VALUES ('${name}', ${size});`;

        if (requestBodyIsUnprocessable) {
            return res.locals.sendResponse({
                status: 422,
                headers: {},
                body: {reason: 'Unprocessable Entity', message: 'Size MUST be an integer [1 .. 5].', size}
            });
        } else {
            return res.locals.database.query(createShoeTrueToSizeCalculation, (error) => {
                if (error) {
                    return next(error);
                } else {
                    return res.locals.sendResponse({
                        status: 201,
                        headers: {location: `/catalog/shoes/${encodeURI(name)}/true_to_size_calculation`},
                        body: {reason: 'Created', name, size}
                    });
                }
            });
        }
    },
    onRetrieveShoeTrueToSizeCalculation: (req, res) => {
        let {true_to_sizes} = res.locals.shoe;
        let toTotalOfSizes = (accumulatedSize, currentSize) => accumulatedSize + currentSize;

        // There's an edge case regarding the sizes array being empty and being reduced.
        return res.locals.sendResponse({
            status: 200,
            headers: {},
            body: true_to_sizes.reduce(toTotalOfSizes) / true_to_sizes.length
        });
    }
};
