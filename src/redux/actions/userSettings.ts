import { USER_PREFERENCES } from "@/utils/constant";
import { createSlice } from "@reduxjs/toolkit";

export type UserSettingStateType = {
  showAdminInterface: boolean;
};

const initialState: UserSettingStateType = {
  showAdminInterface: false,
};

export const slice = createSlice({
  name: "user settings state",
  initialState,
  reducers: {
    alterPreference: (
      state: UserSettingStateType,
      action: {
        type: string;
        payload: {
          showAdminInterface?: boolean;
        };
      }
    ) => {
      if (action.payload.showAdminInterface !== undefined)
        state.showAdminInterface = action.payload.showAdminInterface!;
    },
  },
});

export const { alterPreference } = slice.actions;

export default slice.reducer;
