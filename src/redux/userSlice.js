// import { createSlice } from "@reduxjs/toolkit";

// export const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     name: "john",
//     email: "john@email.com",
//   },
//   reducers: {
//     update: (state, action) => {
//       state.name = action.payload.name;
//       state.email = action.payload.email;
//     },
//     remove: (state) => {
//       state = null;
//     },
//     addHelloToName : (state, action) =>{
//       state.name = "Hello " + action.payload.name
//     }
//   },
// });

// export const { update, remove } = userSlice.actions;

// export default userSlice.reducer;

////////////////////////////////////////////////////////

// import { createSlice } from "@reduxjs/toolkit";

// export const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     userInfo: {
//       name: "john",
//       email: "john@email.com",
//     },
//     pending: false,
//     error: false,
//   },
//   reducers: {
//     updateStart: (state) => {
//       state.pending = true;
//     },
//     updateSuccess: (state, action) => {
//       state.pending = false;
//       state.userInfo = action.payload;
//     },
//     updateFailure: (state) => {
//       state.pending = false;
//       state.error = true;
//     },
//   },
// });

// export const { updateStart, updateSuccess, updateFailure } = userSlice.actions;

// export default userSlice.reducer;

// this page is our reducer and actions
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser2 = createAsyncThunk("users/update", async (user) => {
  const response = await axios.post(
    "http://localhost:8000/api/users/1/update",
    user
  );
  return response.data;
});

// export const deleteUser2 = createAsyncThunk("users/delete", async (user) => {
//   const response = await axios.post(
//     "http://localhost:8000/api/users/1/update",
//     user
//   );
//   return response.data;
// });

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "john",
      email: "john@email.com",
    },
    pending: null,
    error: null,
  },
  // non-api
  reducers: {
    remove: (state) => {
      state.userInfo.name = "";
      state.userInfo.email = "";
    },
  },
  // using api of updateUser2's createAsyncThunk
  // https://redux-toolkit.js.org/api/createAsyncThunk
  extraReducers: {
    [updateUser2.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [updateUser2.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
    },
    [updateUser2.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { updateStart, updateSuccess, updateFailure, remove } = userSlice.actions;

export default userSlice.reducer;
