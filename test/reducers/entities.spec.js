const entities = require('../../reducers/entities');

test('should add one entity', () => {
    const state = entities.default({
        element:{}
    },{
        type: 'SUCCESS',
        entity: 'element',
        data: {
            id: 1,
            name: 'Test1'
        }
    });
    expect(state.element['1'].name).toBe('Test1');
});

test('should add multiple entities', () => {
    const state = entities.default({
        element:{}
    },{
        type: 'SUCCESS',
        entity: 'element',
        data: [{
            id: 1,
            name: 'Test1'
        },{
            id: 2,
            name: 'Test2'
        }]
    });
    expect(state.element['1'].name).toBe('Test1');
    expect(state.element['2'].name).toBe('Test2');
});

test('should update entity', () => {
    const state = entities.default({
        element:{
            '1': {
                id: 1,
                name: 'Test1'
            }
        }
    },{
        type: 'SUCCESS',
        entity: 'element',
        data: {
            id: 1,
            name: 'Test1 UPDATED'
        }
    });
    expect(state.element['1'].name).toBe('Test1 UPDATED');
});

test('should update multiple entities', () => {
    const state = entities.default({
        element:{
            '1': {
                id: 1,
                name: 'Test1'
            },
            '2': {
                id: 2,
                name: 'Test2'
            }
        }
    },{
        type: 'SUCCESS',
        entity: 'element',
        data: [{
            id: 1,
            name: 'Test1 UPDATED'
        },{
            id: 2,
            name: 'Test2 UPDATED'
        }]
    });
    expect(state.element['1'].name).toBe('Test1 UPDATED');
    expect(state.element['2'].name).toBe('Test2 UPDATED');
});

test('should remove entity', () => {
    const state = entities.default({
        element:{
            '1': {
                id: 1,
                name: 'Test1'
            }
        }
    },{
        type: 'SUCCESS',
        entity: 'element',
        remove: true,
        data: {
            id: 1,
            name: 'Test1 UPDATED'
        }
    });
    expect(state.element['1']).toBeUndefined();
});

test('should return default entities if action is undefined', () => {
    const state = entities.default(undefined,{
        type: 'UNKNOWN'
    });
    expect(state).toEqual({'charities': {}, 'donations': {}});
});
