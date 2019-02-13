module.exports = {
    onInitializeConvenienceResponseMethods: (req, res, next) => {
        res.locals.sendResponse = ({status, headers, body}) => {
            let responseBodyInJson = JSON.stringify(body, null, 4);
            let responseBodyInHtml = `<pre>${responseBodyInJson}</pre>`;

            return res.status(status).set(headers).format({
                'application/json': () => res.send(responseBodyInJson),
                'text/html': () => res.send(responseBodyInHtml)
            });
        };
        return next();
    },
    onRequestOrResponseMediaTypeIsUnsupported: (req, res, next) => {
        let requestMediaTypes = ['application/json', 'application/x-www-form-urlencoded'];
        let responseMediaTypes = ['application/json', 'text/html'];
        let requestHasAMediaType = !!req.header('content-type');
        let requestAcceptsAMediaType = !!req.header('accept');
        let requestMediaTypeIsSupported = !!requestMediaTypes.filter((type) => req.is(type)).length;
        let responseMediaTypeIsSupported = !!req.accepts(responseMediaTypes);

        if (requestAcceptsAMediaType && !responseMediaTypeIsSupported) {
            return res.status(406).send();
        } else if (requestHasAMediaType && !requestMediaTypeIsSupported) {
            return res.locals.sendResponse({
                status: 415,
                headers: {},
                body: {reason: 'Unsupported Media Type'}
            });
        } else {
            return next();
        }
    }
};
