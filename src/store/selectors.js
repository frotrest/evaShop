import { createSelector } from '@reduxjs/toolkit';

const selectProductsSlice = (state) => state.products;
const selectOtherProductsSlice = (state) => state.otherProducts;

const selectBaseProducts = (state) => state.products.items;
const selectOtherProducts = (state) => state.otherProducts.items;
const selectEntireOtherProducts = (state) => state.otherProducts;

export const selectAllProducts = createSelector(
  [selectBaseProducts, selectOtherProducts],
  (base, other) => [...base, ...other],
);

export const selectProductsLoadingState = createSelector(
  [selectProductsSlice, selectOtherProductsSlice],
  (base, other) => ({
    bothLoaded: base.status === 'succeeded' && other.status === 'succeeded',
    eitherLoading:
      base.status === 'loading' ||
      base.status === 'idle' ||
      other.status === 'loading' ||
      other.status === 'idle',
    hasError: base.status === 'failed' || other.status === 'failed',
    error: base.error || other.error,
    baseStatus: base.status,
    otherStatus: other.status,
  }),
);

export const makeSelectProductById = () =>
  createSelector(
    [selectAllProducts, (_state, id) => id],
    (products, id) => products.find((item) => String(item.id ?? item._id) === String(id)) || null,
  );

export const selectFilters = (state) => state.filters.filters;

export const selectOtherProductsState = createSelector(
  [selectEntireOtherProducts],
  (selectOtherProductsStates) => ({
    products: selectOtherProductsStates.items,
    status: selectOtherProductsStates.status,
    error: selectOtherProductsStates.error,
  }),
);

const blogState = (state) => state.blogsSlice;

export const blogDataFetchState = createSelector([blogState], (blogs) => ({
  blogDataFetch: blogs.blogDataFetch,
  filterBlogResult: blogs.filterBlogResult,
}));

const loginState = (state) => state.loginSlice;

export const selectLogin = createSelector([loginState], (login) => ({
  login: login.login,
  user: login.user,
}));

export const selectCurrentUser = createSelector([loginState], (login) => {
  const user = login.user;
  return Array.isArray(user) ? user[0] : user;
});

export const selectProduct = createSelector([selectProductsSlice], (products) => ({
  products: products.items,
  status: products.status,
  error: products.error,
  filters: products.filters,
  sortBy: products.sortBy,
  itemsToShow: products.itemsToShow,
}));

export const selectNotifications = (state) => state.notification;
