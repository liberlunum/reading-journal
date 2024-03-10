export interface FilterState {
  subject: string;
  first_publish_year: string;
}

export enum FiltersActionTypes {
  CHANGE_SUBJECT = 'CHANGE_SUBJECT',
  CHANGE_FIRST_PUBLISH_YEAR = 'CHANGE_FIRST_PUBLISH_YEAR',
  CHANGE_ALL_FILTERS = 'CHANGE_ALL_FILTERS',
  RESET_FILTERS = 'RESET_FILTERS',
}

interface ChangeSubjectAction {
  type: FiltersActionTypes.CHANGE_SUBJECT;
  payload: string;
}

interface ChangePublishYearAction {
  type: FiltersActionTypes.CHANGE_FIRST_PUBLISH_YEAR;
  payload: string;
}

interface ChangeAllFiltersAction {
  type: FiltersActionTypes.CHANGE_ALL_FILTERS;
  payload: FilterState;
}

interface ResetFiltersAction {
  type: FiltersActionTypes.RESET_FILTERS;
}

export type FilterAction =
  | ChangeAllFiltersAction
  | ChangeSubjectAction
  | ChangePublishYearAction
  | ResetFiltersAction;
