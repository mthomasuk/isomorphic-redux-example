const regeneratorRuntime =  require('regenerator-runtime');
const actions = require('../../actions');
const types = require('../../constants/ActionTypes');

window.localStorage = {
    getItem: jest.fn()
};

window.fetch = jest.fn();

test('getCharityInfo should fire CHARITIES_SUCCESS with charities on success', async () => {

    var res = [];

    const dispatch = (action) => {
        res.push(action);
    };

    window.fetch
    .mockImplementationOnce((url, options) => {
        return new Promise((resolve, reject) => {
            resolve({
                ok: true,
                headers: {
                    get: (type) => {
                        if(type == 'Content-Type') {
                            return 'application/json';
                        }
                    }
                },
                json: () => {
                    return Promise.resolve({id: 1})
                }
            });
        })
    })

    const getState = () => {}
    const actionResult = await actions.getCharityInfo()(dispatch, getState);

    expect(actionResult.type).toBe(types.CHARITIES_SUCCESS);
    expect(actionResult.data.id).toBe(1);

});

test('getCharityDonationInfo should fire DONATIONS_SUCCESS with charities on success', async () => {

    var res = [];

    const dispatch = (action) => {
        res.push(action);
    };

    window.fetch
    .mockImplementationOnce((url, options) => {
        return new Promise((resolve, reject) => {
            resolve({
                ok: true,
                headers: {
                    get: (type) => {
                        if(type == 'Content-Type') {
                            return 'application/json';
                        }
                    }
                },
                json: () => {
                    return Promise.resolve({id: 2})
                }
            });
        })
    })

    const getState = () => {}
    const actionResult = await actions.getCharityDonationInfo()(dispatch, getState);

    expect(actionResult.type).toBe(types.DONATIONS_SUCCESS);
    expect(actionResult.data.id).toBe(2);

});
