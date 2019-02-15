const {expect} = require('chai');
const {onCreateShoe} = require('../../routes');

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
            locals: {
                sendResponse: ({status}) => actualStatusCode = status
            }
        };
        let mockNext = () => {
        };

        onCreateShoe(mockRequest, mockResponse, mockNext);
        expect(actualStatusCode).to.equal(expectedStatusCode);
    });
    it('Should return a 422 Unprocessable Entity to the client if the request body is well-formed but missing a truthy `name` string.', () => {
        let expectedStatusCode = 422;
        let actualStatusCode = 0;
        let mockRequest = {body: {name: ''}};
        let mockResponse = {
            locals: {
                sendResponse: ({status}) => actualStatusCode = status
            }
        };
        let mockNext = () => {
        };

        onCreateShoe(mockRequest, mockResponse, mockNext);
        expect(actualStatusCode).to.equal(expectedStatusCode);
    });
    it('Should attempt to create a shoe resource in the database if the request body is well-formed with a truthy `name` string.', () => {
        let expectedShoeName = 'adidas Yeezy';
        let actualShoeName = '';
        let mockRequest = {body: {name: expectedShoeName}};
        let mockResponse = {
            locals: {
                database: {
                    query: (query, [name]) => actualShoeName = name
                }
            }
        };
        let mockNext = () => {
        };

        onCreateShoe(mockRequest, mockResponse, mockNext);
        expect(actualShoeName).to.equal(expectedShoeName);
    });
    it('Should return a 500 Internal Server Error to the client if a query to the database to create a shoe resource fails.', () => {
        let expectedDatabaseQueryError = {};
        let actualDatabaseQueryError = null;
        let mockRequest = {body: {name: 'adidas Yeezy'}};
        let mockResponse = {
            locals: {
                database: {
                    query: (query, [name], callback) => callback(expectedDatabaseQueryError)
                }
            }
        };
        let mockNext = (error) => actualDatabaseQueryError = error;

        onCreateShoe(mockRequest, mockResponse, mockNext);
        expect(actualDatabaseQueryError).to.equal(expectedDatabaseQueryError);
    });
    it('Should return a 201 Created to the client if a query to the database to create a shoe resource succeeds.', () => {
        let expectedStatusCode = 201;
        let actualStatusCode = 0;
        let mockRequest = {body: {name: 'adidas Yeezy'}};
        let mockResponse = {
            locals: {
                database: {
                    query: (query, [name], callback) => callback(null, {})
                },
                sendResponse: ({status}) => actualStatusCode = status
            }
        };
        let mockNext = (error) => {
        };

        onCreateShoe(mockRequest, mockResponse, mockNext);
        expect(actualStatusCode).to.equal(expectedStatusCode);
    });
    it('Should return a Location header of the newly created shoe resource to the client if a query to the database to create a shoe resource succeeds.', () => {
        let expectedResponseLocationHeader = true;
        let actualResponseLocationHeader = false;
        let mockRequest = {body: {name: 'adidas Yeezy'}};
        let mockResponse = {
            locals: {
                database: {
                    query: (query, [name], callback) => callback(null, {})
                },
                sendResponse: ({headers}) => {
                    let {location} = headers;
                    actualResponseLocationHeader = !!location;
                }
            }
        };
        let mockNext = (error) => {
        };

        onCreateShoe(mockRequest, mockResponse, mockNext);
        expect(actualResponseLocationHeader).to.equal(expectedResponseLocationHeader);
    });
});
