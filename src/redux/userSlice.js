import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchUsers = createAsyncThunk(
  "user/searchUsers",
  async (query, { rejectWithValue, getState }) => {
    try {
      const { users } = getState().userReducer;
      const filteredData = users.filter((user) =>
        user.displayName.toLowerCase().includes(query.toLowerCase())
      );
      return filteredData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    searchedUsers: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {})
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchedUsers = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {});
  },
});

export const userReducer = userSlice.reducer;
export const { setUsers } = userSlice.actions;
export const userSelector = (state) => state.userReducer;
