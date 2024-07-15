const {
  createAsyncThunk,
  createSlice,
  configureStore,
} = require("@reduxjs/toolkit");
const axios = require("axios");

//iniialState
//asyncreatethunk
//slice

//initialState...
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const API = "https://jsonplaceholder.typicode.com/posts";

//createAsyncThunk....
const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const res = await axios.get(API);
  return res.data;
});

//slice....
const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    //handle lifecycle --- pending, fulfilled , rejcted....

    //pending.....
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.pending = true;
    });

    //fulfilled...
    builder.addCase(fetchPosts.fulfilled, (state, aciton) => {
      (state.pending = false), (state.posts = aciton.payload);
    });

    //rejected....
    builder.addCase(fetchPosts.rejected, (state, action) => {
      (state.posts = []),
        (state.pending = false),
        (state.error = action.payload);
    });
  },
});

//no need of the action....
//reducer..
const postReducer = postSlice.reducer;

//store...

const store = configureStore({
  reducer: postReducer,
});

store.subscribe(() => {
  console.log(store.getState());
});

//dispatch action...
store.dispatch(fetchPosts());
