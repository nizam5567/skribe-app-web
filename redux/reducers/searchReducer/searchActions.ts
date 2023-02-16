import { GET_SEARCH_MATTER_ID, GET_SEARCH_TEXT, SAVE_SEARCH_MATTER_ID, SAVE_SEARCH_TEXT } from './searchTypes';

export const saveSearchText = (searchValue: string) => ({
  'type': SAVE_SEARCH_TEXT,
  'payload': searchValue
});

export const saveSearchMatterId = (matterId: number | null) => ({
  'type': SAVE_SEARCH_MATTER_ID,
  'payload': matterId
});

export const getSearchText = () => ({
  'type': GET_SEARCH_TEXT
});

export const getSearchMatterID = () => ({
  'type': GET_SEARCH_MATTER_ID
});
