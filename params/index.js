module.exports = {
    onShoeResourceRequested: (req, res, next, shoe) => {
        let retrieveAllShoeResourcesWithName = `SELECT * FROM shoes WHERE name='${shoe}';`;
        let retrieveTrueToSizeDataForShoeResource = `SELECT * FROM shoes_true_to_size_data WHERE name='${shoe}';`;

        return res.locals.database.query(retrieveAllShoeResourcesWithName, (error, {rowCount}) => {
            if (error) {
                return next(error);
            } else if (!rowCount) {
                return res.locals.sendResponse({
                    status: 404,
                    headers: {},
                    body: {reason: 'Not Found', message: `${shoe} could not be found.`}
                });
            } else {
                return res.locals.database.query(retrieveTrueToSizeDataForShoeResource, (error, {rows}) => {
                    if (error) {
                        return next(error);
                    } else {
                        res.locals.shoe = {name: shoe, true_to_sizes: rows.map(({true_to_size}) => true_to_size)};
                        return next();
                    }
                });
            }
        });
    }
};
