const regeneratorRuntime =  require('regenerator-runtime');
const actionHelpers = require('../../actions/helpers');

window.localStorage = {
    getItem: jest.fn()
};

window.fetch = jest.fn()

test('pluckJson returns json attribute from object', () => {

    const obj = {
        a: 'b',
        json: 'd'
    };

    expect(actionHelpers.pluckJson(obj))
    .toEqual(obj.json);

});


test('serializeQueryString builds query string from query object', () => {

    const query = {
        a: 'b',
        c: 'd'
    };

    expect(actionHelpers.serializeQueryString(query))
    .toEqual('a=b&c=d');

});


test('dispatchApiCall fires request then success for successful promise calls', async () => {

    var res = [];

    const dispatch = (action) => {
        res.push(action);
    };

    const promise = new Promise((resolve, reject) => {
        resolve({json:{}, text:'abc', response: {
            headers: {
                get: (type) => {
                    if(type=='link') {
                        return '</page/next>; rel="next", </page/last>; rel="last"';
                    }
                }
            }
        }});
    });

    await actionHelpers.dispatchApiCall(dispatch, promise, {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE'
    });

    expect(res.length).toEqual(2);
    expect(res[0].type).toEqual('REQUEST');
    expect(res[1].type).toEqual('SUCCESS');

});


test('dispatchApiCall fires request then failure for rejected promise calls', async () => {

    var res = [];

    const dispatch = (action) => {
        res.push(action);
    };

    const promise = new Promise((resolve, reject) => {
        reject("ERROR");
    });

    await actionHelpers.dispatchApiCall(dispatch, promise, {
        request: 'REQUEST',
        success: 'SUCCESS',
        failure: 'FAILURE'
    });

    expect(res.length).toEqual(2);
    expect(res[0].type).toEqual('REQUEST');
    expect(res[1].type).toEqual('FAILURE');

});


test('fetchApi should reject failed responses', async () => {

    window.fetch
    .mockImplementationOnce((url, postData, options) => {
        return new Promise((resolve, reject) => {
            resolve({
                ok: false,
                headers: {
                    get: (type) => {
                        if(type=='Content-Type') {
                            return 'application/json';
                        }
                    }
                },
                json: () => {
                    return Promise.resolve({id: 5})
                }
            });
        })
    })

    const res = await actionHelpers.fetchApi('/api/resource')
    .catch((e) => {
        return 'ERROR'
    });

    expect(res).toEqual('ERROR');
});


test('fetchApi should return text responses when content type not json', async () => {

    window.fetch
    .mockImplementationOnce((url, postData, options) => {
        return new Promise((resolve, reject) => {
            resolve({
                ok: true,
                headers: {
                    get: (type) => {
                        if(type=='Content-Type') {
                            return 'application/text';
                        }
                    }
                },
                text: () => {
                    return Promise.resolve('TEXT123')
                }
            });
        })
    })

    const res = await actionHelpers.fetchApi('/api/resource');

    expect(res.text).toEqual('TEXT123');

});
