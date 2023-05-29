import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AlternativeCriteriaType } from '../../model';

const initialState: AlternativeCriteriaType[] = [
  {
    alternative_code: '',
    criteria_code: '',
    value: 0,
  },
];

interface AlternativeCriteriaPayload {
  alternative_code: string;
  criterias: AlternativeCriteriaType[]
}

const alternativeCriteria = createSlice({
  name: 'alternative',
  initialState,
  reducers: {
    addAlternativeCriteria: (state, action: PayloadAction<AlternativeCriteriaPayload>) => {
      let filtered = state.filter(todo => todo.alternative_code != action.payload.alternative_code);
      filtered.push(...action.payload.criterias)
      return state = filtered
      
    },
    clearAlternativeCriteria: (state) => {
      return state = [
        {
          alternative_code: '',
          criteria_code: '',
          value: 0,
        },
      ]
    }
  },
});

export default alternativeCriteria.reducer;
export const { addAlternativeCriteria, clearAlternativeCriteria } = alternativeCriteria.actions;