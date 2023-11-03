import { createSlice } from '@reduxjs/toolkit'

const initialState: { email:string, dob:string, exp:number, gender:string, name:string, photoUrl:string, state:string, timeStamp: string } = {
  email:"",
  dob:"",
  exp:-1,
  gender:"",
  name:"",
  photoUrl:"",
  state:"",
  timeStamp:""

}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.email = action.payload.email;
      state.dob = action.payload.dob;
      state.exp = action.payload.exp;
      state.gender = action.payload.gender;
      state.name = action.payload.name;
      state.photoUrl = action.payload.photoUrl;
      state.state = action.payload.state;
      state.timeStamp = action.payload.timeStamp;
    },
    userLogout: (state)=>{
      state.email = ""
      state.dob = ""
      state.exp = -1
      state.gender = ""
      state.name = ""
      state.photoUrl = ""
      state.state = ""
      state.timeStamp = ""
    }
  }
})

export default userSlice.reducer
export const { userLogin, userLogout } = userSlice.actions
