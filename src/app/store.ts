import {Action, configureStore} from '@reduxjs/toolkit'

interface DummyState {
    dumb: number
};

function dummyReducer(state: DummyState = {dumb: 0}, action: Action){
    switch(action.type){
        default: {
            return state;
        }
    }
}

export const store = configureStore({
    reducer: {
        dummy: dummyReducer
    }
});

// Friendly type exports for TypeScript
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
