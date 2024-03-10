import { FilterAction, FilterState, FiltersActionTypes } from '../types/filter';

export const ChangeSubject = (subject: string): FilterAction => ({
  type: FiltersActionTypes.CHANGE_SUBJECT,
  payload: subject,
});
export const ChangePublishYear = (
  first_publish_year: string
): FilterAction => ({
  type: FiltersActionTypes.CHANGE_FIRST_PUBLISH_YEAR,
  payload: first_publish_year,
});
export const ChangeAllFilters = (filters: FilterState): FilterAction => ({
  type: FiltersActionTypes.CHANGE_ALL_FILTERS,
  payload: filters,
});
export const ResetFilters = (): FilterAction => ({
  type: FiltersActionTypes.RESET_FILTERS,
});
