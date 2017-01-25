require('es6-promise').polyfill();
require('isomorphic-fetch');

export const fetchApi = (url, options = {}) => {

    const defaultHeaders = {
        'Accept':'application/json',
        'Content-Type': 'application/json'
    };

    return fetch(url, Object.assign({}, options, {
        headers: Object.assign({}, defaultHeaders, options.headers)
    })).then((response) => {
        const responseType = response.headers.get('Content-Type');

        if(responseType.indexOf('application/json') > -1) {
            return response.json().then(json => ({ json, response }));
        } else{
            return response.text().then(text => ({ text, response }));
        }

    }).then(({ json, text, response }) => {
        if (!response.ok) {
            return Promise.reject({
                status: response.status,
                body: json || text
            });
        }
        return {json, text, response};
    });
};

export const dispatchApiCall = (dispatch, promise, actions, additionalData = {}) => {
    if(actions.request) {
        dispatch(Object.assign({},
            additionalData,{
                type: actions.request,
                list: actions.list,
                fetching: true
            }
        ));
    }
    return promise
    .then(({json, text, response}) => {
        if(actions.success) {
            var result = Object.assign({},
                additionalData,
                actions,
                {type: actions.success, data:json || text}
            );
            dispatch(result);
            return result;
        }
    }).catch((err) => {
        if(actions.failure && !!dispatch) {
            dispatch({type: actions.failure, error:err});
        }
    });
};

export const pluckJson = (obj) => obj.json;

export const serializeQueryString = function(obj) {
    var str = [];
    for(var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    return str.join('&');
};
