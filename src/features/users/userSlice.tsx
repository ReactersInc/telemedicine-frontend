import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  id: string;
  email: string;
  dob: string;
  exp: number;
  gender: string;
  name: string;
  photoUrl: string;
  state: string;
  timeStamp: string;
  phone: string;


  mobile_no: string;
  doctor_id: string;
  registration_no: string;
  specilization: string;
  rating: number;
} = {
  id: "",
  email: "",
  dob: "",
  exp: -1,
  gender: "",
  name: "",
  photoUrl: "",
  state: "",
  timeStamp: "",
  phone: "",
  mobile_no: "",
  doctor_id: "",
  registration_no: "",
  specilization: "",
  rating: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.dob = action.payload.dob;
      state.exp = action.payload.exp;
      state.gender = action.payload.gender;
      state.name = action.payload.name;
      state.photoUrl = action.payload.photoUrl;
      state.state = action.payload.state;
      state.timeStamp = action.payload.timeStamp;
      state.phone = action.payload.phone;
      state.mobile_no = action.payload.mobile_no;
      state.doctor_id = action.payload.doctor_id;
      state.registration_no = action.payload.registration_no;
      state.specilization = action.payload.specilization;
      state.rating = action.payload.rating;

    },
    userLogout: (state) => {
      state.id = "";
      state.email = "";
      state.dob = "";
      state.exp = -1;
      state.gender = "";
      state.name = "";
      state.photoUrl = "";
      state.state = "";
      state.timeStamp = "";
      state.phone = "";
    },
  },
});

export default userSlice.reducer;
export const { userLogin, userLogout } = userSlice.actions;
