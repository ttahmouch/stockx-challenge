const {expect} = require('chai');
const {onCreateShoe} = require('../../routes');

/*
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
 */

/*
    Build Up, i.e., mock dependencies, define expectations.
    Action, i.e., invoke the subject under test.
    Assertion, i.e., assert expectations are fulfilled.
    Tear Down, i.e., cleanup state that may be used by multiple tests.
 */

describe('Create Shoe Route', () => {
    it('Should return a 422 Unprocessable Entity to the client if the request body is malformed.', () => {
        let expectedStatusCode = 422;
        let actualStatusCode = 0;
        let mockRequest = {body: undefined};
        let mockResponse = {
            locals: {sendResponse: ({status}) => actualStatusCode = status}
        };
        let mockNext = () => {
        };

        onCreateShoe(mockRequest, mockResponse, mockNext);
        expect(actualStatusCode).to.equal(expectedStatusCode);
    });
});
