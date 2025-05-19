import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

export interface SecurityState {
    token: string
}

const initialState: SecurityState = {
    token: ""
}

const securitySlice = createSlice({
    name: 'security',
    initialState,
    reducers: {
        tokenFetched(state, action: PayloadAction<string>){
            state.token = action.payload;
        }
    }
})

// selectors
export const selectAccessToken = (state: RootState): string | null => state.security.token

// export the actions
export const {tokenFetched} = securitySlice.actions

// export the reducers
export default securitySlice.reducer

