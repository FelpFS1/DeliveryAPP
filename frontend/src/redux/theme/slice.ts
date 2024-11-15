import { createSlice } from "@reduxjs/toolkit";

interface InitialStateTheme {
  theme: string | null;
}

const initialState: InitialStateTheme = {
  theme: localStorage.getItem("app-delivey-theme"),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state) => {
      if (state.theme === "dark") {
        state.theme = "light";
        localStorage.setItem("app-delivey-theme", state.theme);
      } else {
        state.theme = "dark";
        localStorage.setItem("app-delivey-theme", state.theme);
      }
    },
  },
});

export const { switchTheme } = themeSlice.actions;
