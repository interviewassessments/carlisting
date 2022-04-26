import { configureStore } from '@reduxjs/toolkit';
import carListingsSlicer from './features/carListings/carListingsSlicer';
import testSlice from './features/test/testSlice';

export const store = configureStore({
    reducer: {
        carListings: carListingsSlicer,
        test: testSlice,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {test: TestState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch