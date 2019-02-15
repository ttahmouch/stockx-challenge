module.exports = {
    onShoeResourceRequested: (req, res, next, shoe) => {
        let retrieveAllShoeResourcesWithName = `SELECT * FROM shoes WHERE name=$1;`;

        return res.locals.database.query(retrieveAllShoeResourcesWithName, [shoe], (error, results) => {
            if (error) {
                return next(error);
            } else if (!results.rowCount) {
                return res.locals.sendResponse({
                    status: 404,
                    headers: {},
                    body: {reason: 'Not Found', message: `${shoe} could not be found.`}
                });
            } else {
                res.locals.shoe = {name: shoe};
                return next();
            }
        });
    }
};
