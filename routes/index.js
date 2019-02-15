module.exports = {
    onCreateShoe: (req, res, next) => {
        let body = req.body || {};
        let {name} = body;
        let requestBodyIsUnprocessable = typeof name !== 'string' || !name;
        let createShoeWithName = `INSERT INTO shoes (name) VALUES ($1);`;

        if (requestBodyIsUnprocessable) {
            return res.locals.sendResponse({
                status: 422,
                headers: {},
                body: {reason: 'Unprocessable Entity', message: 'Name MUST be a string.', name}
            });
        } else {
            return res.locals.database.query(createShoeWithName, [name], (error) => {
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
        let createShoeTrueToSizeCalculation = `INSERT INTO shoes_true_to_size_data (name, true_to_size) VALUES ($1, $2);`;

        if (requestBodyIsUnprocessable) {
            return res.locals.sendResponse({
                status: 422,
                headers: {},
                body: {reason: 'Unprocessable Entity', message: 'Size MUST be an integer [1 .. 5].', size}
            });
        } else {
            return res.locals.database.query(createShoeTrueToSizeCalculation, [name, size], (error) => {
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
        let {name} = res.locals.shoe;
        let toTotalOfSizes = (accumulatedSize, currentSize) => accumulatedSize + currentSize;
        let retrieveTrueToSizeDataForShoeResource = `SELECT * FROM shoes_true_to_size_data WHERE name=$1;`;

        return res.locals.database.query(retrieveTrueToSizeDataForShoeResource, [name], (error, results) => {
            if (error) {
                return next(error);
            } else {
                // TODO: Rewrite this to the original way of calculating on insertion and persisting proactively.
                let {rowCount, rows} = results;
                let true_to_sizes = rows.map(({true_to_size}) => true_to_size);
                let true_to_size_calculation = rowCount ? (true_to_sizes.reduce(toTotalOfSizes) / rowCount) : 0;

                return res.locals.sendResponse({status: 200, headers: {}, body: true_to_size_calculation});
            }
        });
    }
};
