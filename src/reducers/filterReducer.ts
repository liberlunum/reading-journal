import { FilterAction, FilterState, FiltersActionTypes } from '../types/filter';

export const initalFilterState: FilterState = {
  subject: '',
  first_publish_year: '',
};

export function filterReducer(
  state = initalFilterState,
  action: FilterAction
): FilterState {
  switch (action.type) {
    case FiltersActionTypes.CHANGE_ALL_FILTERS:
      return action.payload;
    case FiltersActionTypes.CHANGE_SUBJECT:
      return { ...state, subject: action.payload };
    case FiltersActionTypes.CHANGE_FIRST_PUBLISH_YEAR:
      return { ...state, first_publish_year: action.payload };
    case FiltersActionTypes.RESET_FILTERS:
      return initalFilterState;
    default:
      return state;
  }
}
