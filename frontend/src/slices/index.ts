import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import CompanyRecord from '../types';

interface SearchState {
  searchText: string;
  filteredCompanies: CompanyRecord[];
}

const initialState: SearchState = {
  searchText: '',
  filteredCompanies: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText: (state: SearchState, action: PayloadAction<string>) => {
        state.searchText = action.payload;
      },
      setFilteredCompanies: (state: SearchState, action: PayloadAction<CompanyRecord[]>) => {
        state.filteredCompanies = action.payload;
      },
  },
});

export const { setSearchText, setFilteredCompanies } = searchSlice.actions;
export default searchSlice.reducer;
