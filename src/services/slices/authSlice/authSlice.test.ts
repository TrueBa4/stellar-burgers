import {
  authSlice,
  loginUser,
  registerUser,
  getUser,
  updateUser,
  logout,
  authInitialState
} from '@slices';

describe('Проверяем редьюсер authSlice', () => {
  const testUser = {
    email: 'email@em.ail',
    name: 'name'
  };

  it('Проверяем обработку loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: testUser }
    };

    const state = authSlice.reducer(authInitialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(testUser);
  });

  it('Проверяем обработку registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: testUser }
    };

    const state = authSlice.reducer(authInitialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(testUser);
  });

  it('Проверяем обработку getUser.fulfilled', () => {
    const payload = { user: testUser };

    const action = {
      type: getUser.fulfilled.type,
      payload: payload
    };

    const state = authSlice.reducer(authInitialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(payload.user);
  });

  it('Проверяем обработку updateUser.fulfilled', () => {
    const initialStateUser = {
      ...authInitialState,
      isAuth: true,
      user: {
        email: 'previous@pre.vios',
        name: 'previous'
      }
    };

    const updatedUser = {
      email: 'new@n.ew',
      name: 'new'
    };

    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser }
    };

    const state = authSlice.reducer(initialStateUser, action);

    expect(state.user).toEqual(updatedUser);
  });

  it('Проверяем обработку logout.fulfilled', () => {
    const initialStateUser = {
      ...authInitialState,
      isAuth: true,
      user: testUser
    };

    const action = { type: logout.fulfilled.type };
    const state = authSlice.reducer(initialStateUser, action);

    expect(state.isAuth).toBe(false);
    expect(state.user).toBeUndefined();
  });
});
