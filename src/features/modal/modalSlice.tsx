import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modalOpen: false,
  scroll: true
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state) => {
      state.modalOpen = !state.modalOpen;
      state.scroll = !state.scroll
    }

  }
})

export default modalSlice.reducer
export const { setModal } = modalSlice.actions
