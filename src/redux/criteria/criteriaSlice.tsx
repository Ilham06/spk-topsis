import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CriteriaType } from '../../model';

const initialState: CriteriaType[] = [
  {
    id: '',
    code: '',
    name: '',
    note: '',
    weight: 0,
    attribute: 'benefit'
  },
];

const criteria = createSlice({
  name: 'criteria',
  initialState,
  reducers: {
    addCriteria: (state, action: PayloadAction<CriteriaType>) => {
      state.push(action.payload);
    },
    deleteCriteria: (state, action: PayloadAction<string>) => {
      return state.filter(todo => todo.id != action.payload)
    },
    editCriteria: (state, action: PayloadAction<CriteriaType>) => {
      const newState = state.map((criteria) => {
        if (criteria.id == action.payload.id) {
          return action.payload
        } return criteria
      })
      return state = newState
    },
  },
});

export default criteria.reducer;
export const { addCriteria, deleteCriteria, editCriteria } = criteria.actions;