import { createSlice } from "@reduxjs/toolkit";

interface InitialStateTheme {
  theme: "light" | "dark";
}

const initialState: InitialStateTheme = {
  theme: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state) => {
      if (state.theme === "dark") {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    },
  },
});

export const { switchTheme } = themeSlice.actions;
