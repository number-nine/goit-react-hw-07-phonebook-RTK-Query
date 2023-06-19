import { createSelector } from '@reduxjs/toolkit';


const selfSelector = state => state;
export const selectFilter = state => state.filter;

export const selectAuth = createSelector([selfSelector], state => {
  return state.auth;
});

