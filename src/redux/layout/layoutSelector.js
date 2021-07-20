import { createSelector } from 'reselect'

export const showLoading = createSelector(
  [ state => state.layout.loading ],
  (loading) => loading > 0
)