module.exports = {
    onShoeTrueToSizeCalculationCreated: (req, res) => {
        let body = req.body || {};
        let size = Number(body.size);
        let requestBodyIsUnprocessable = !Number.isInteger(size) || size < 1 || size > 5;

        if (requestBodyIsUnprocessable) {
            return res.locals.sendResponse({
                status: 422,
                headers: {},
                body: {
                    reason: 'Unprocessable Entity',
                    message: 'Size MUST be an integer between 1 and 5, inclusively.',
                    size
                }
            });
        } else {
            let {shoe} = res.locals;
            let {name, true_to_sizes} = shoe;
            let toTotalOfSizes = (accumulatedSize, currentSize) => accumulatedSize + currentSize;

            shoe.true_to_sizes = true_to_sizes.concat(size);
            shoe.true_to_size_calculation = shoe.true_to_sizes.reduce(toTotalOfSizes) / shoe.true_to_sizes.length;

            return res.locals.sendResponse({
                status: 201,
                headers: {location: `/catalog/shoes/${encodeURI(name)}/true_to_size_calculation`},
                body: {reason: 'Created', size, ...shoe}
            });
        }
    },
    onShoeTrueToSizeCalculationRequested: (req, res) => {
        return res.locals.sendResponse({
            status: 200,
            headers: {},
            body: res.locals.shoe.true_to_size_calculation
        });
    }
};
