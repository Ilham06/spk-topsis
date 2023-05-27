import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AlternativeType } from '../../model';

const initialState: AlternativeType[] = [
  {
    id: '',
    code: '',
    name: '',
    note: ''
  },
];

const alternative = createSlice({
  name: 'alternative',
  initialState,
  reducers: {
    addAlternative: (state, action: PayloadAction<AlternativeType>) => {
      state.push(action.payload);
    },
    deleteAlternative: (state, action: PayloadAction<string>) => {
      return state.filter(todo => todo.id != action.payload)
    },
    editAlternative: (state, action: PayloadAction<AlternativeType>) => {
      const newState = state.map((alternative) => {
        if (alternative.id == action.payload.id) {
          return action.payload
        } return alternative
      })
      return state = newState
    },
  },
});

export default alternative.reducer;
export const { addAlternative, deleteAlternative, editAlternative } = alternative.actions;