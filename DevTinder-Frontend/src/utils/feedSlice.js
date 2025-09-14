import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: 'feed',
  initialState:null,
  reducers: {
    addFeed: (state, action) => {
    return action.payload; // add one feed
    },
    removeFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload); 
      return newFeed; // remove one feed
    }
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
