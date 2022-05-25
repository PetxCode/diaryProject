import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	memories: [],
	bestMemories: [],
};

const GlobalState = createSlice({
	name: "authUser",
	initialState,
	reducers: {
		createUser: (state, { payload }) => {
			state.currentUser = payload;
		},

		addMomery: (state, { payload }) => {
			state.memories = payload;
		},

		addBestMemories: (state, { payload }) => {
			const checkData = state.bestMemories.findIndex(
				(el) => el.id === payload.id
			);

			if (checkData > 0) {
				state.bestMemories[checkData].Numb += 1;
			} else {
				state.bestMemories.push({ ...payload, Numb: 1 });
			}
		},

		removeBestMemories: (state, { payload }) => {
			state.bestMemories = state.bestMemories.filter(
				(el) => el.id !== payload.id
			);
		},

		signOut: (state) => {
			state.currentUser = null;
		},
	},
});

export const {
	createUser,
	signOut,
	addMomery,
	addBestMemories,
	removeBestMemories,
	addBest,
} = GlobalState.actions;

export default GlobalState.reducer;
