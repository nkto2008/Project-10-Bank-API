import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    const data = await response.json();
    console.log("data: ", data)
    localStorage.setItem('token', data.body.token);  // Store the token properly
    return data;
});

export const getUserProfile = createAsyncThunk('auth/getUserProfile', async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }
    const data = await response.json();
    return data.body;
});

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.token = action.payload.body.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
