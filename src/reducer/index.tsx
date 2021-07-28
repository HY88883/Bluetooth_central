export interface InitialState{
list:any[];
}

export const initialState: InitialState = {
    list: []
}

export const ADD_DEVICE = 'connectedDevice/addDevice'
export const MINUS_DEVICE = 'connectedDevice/minusDevice'
export const MINUS_CLEAN = 'connectedDevice/cleanAll'

export function reducer(state: InitialState = initialState, {type, payload}) {
    switch (type) {
        case ADD_DEVICE: {
            let { list } = state
            list = [...list, payload]
            return { ...state, list }
        }
        case MINUS_DEVICE: {
            let { list } = state
            list=list.filter(item=>item.id!==payload.id)
            return { ...state, list }
        }
        case MINUS_CLEAN:{
            return initialState
        }
        default:
            return state
    }
}
