const TEMPORARY_SHOE_DATABASE = {
    'adidas Yeezy': {
        'name': 'adidas Yeezy',
        'true_to_sizes': [],
        'true_to_size_calculation': 0
    }
};

module.exports = {
    onShoeResourceRequested: (req, res, next, shoe) => {
        let entry = TEMPORARY_SHOE_DATABASE[shoe];

        if (!entry) {
            return res.locals.sendResponse({
                status: 404,
                headers: {},
                body: {reason: 'Not Found'}
            });
        } else {
            res.locals.shoe = entry;
            return next();
        }
    }
};
