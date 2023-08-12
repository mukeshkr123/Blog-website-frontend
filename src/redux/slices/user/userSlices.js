import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:5000";

//register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Login
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userData,
        config
      );
      //save user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// get profile details
export const ProfileUserAction = createAsyncThunk(
  "user/profile",
  async (userId, { rejectWithValue, getState }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    console.log(config);
    //http call
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/users/profile/${userId}`,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Log out Action
export const logOutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//upload profile ==> solve the error

export const uploadProfilePhotoAction = createAsyncThunk(
  "user/profile-photo",
  async (userImage, { rejectWithValue, getState }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const formData = new FormData();
      formData.append("image", userImage);
      const { data } = await axios.put(
        `${baseUrl}/api/users/profilephoto-upload`,
        config,
        formData
      );
      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

//update the profile

export const updateProfileAction = createAsyncThunk(
  "user/update",
  async (user, { rejectWithValue, getState }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(`${baseUrl}/api/users`, config, {
        lastName: user?.lastName,
        firstName: user?.firstName,
        bio: user?.bio,
        email: user?.email,
      });
      return data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

// follow

export const followUserAction = createAsyncThunk(
  "user/follow",
  async (userToFollowId, { rejectWithValue, getState }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/follow`,
        {
          followId: userToFollowId,
        },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);
// unnfollow

export const unFollowUserAction = createAsyncThunk(
  "user/unfollow",
  async (userToFollowId, { rejectWithValue, getState }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/unfollow`,
        {
          unfollowId: userToFollowId,
        },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

//update password
export const updatePaswordAction = createAsyncThunk(
  "user/upddate-password",
  async (updatePassword, { rejectWithValue, getState }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/password`,
        updatePassword,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //login
    builder.addCase(loginUserAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });

    //logout
    builder.addCase(logOutAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logOutAction.fulfilled, (state) => {
      state.userAuth = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logOutAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });

    //get the profile
    builder.addCase(ProfileUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ProfileUserAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(ProfileUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });

    // upload the profile Photo
    builder.addCase(uploadProfilePhotoAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadProfilePhotoAction.fulfilled, (state, action) => {
      state.profilePhoto = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(uploadProfilePhotoAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    // upload the profile
    builder.addCase(updateProfileAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfileAction.fulfilled, (state, action) => {
      state.userUpdated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    //follow
    builder.addCase(followUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.followed = action?.payload;
      state.unfollowed = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    // unfollow
    builder.addCase(unFollowUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(unFollowUserAction.fulfilled, (state, action) => {
      state.unfollowed = action?.payload;
      state.followed = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unFollowUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
    // update password
    builder.addCase(updatePaswordAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePaswordAction.fulfilled, (state, action) => {
      state.updatePassword = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updatePaswordAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.message;
    });
  },
});

export default usersSlices.reducer;
