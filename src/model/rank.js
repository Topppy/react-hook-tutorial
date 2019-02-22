export const initialState = {
  data: [],
  pagination: {
    total: 0,
    pageSize: 10,
    showSizeChanger: true,
    current: 1,
  },
  loading: false,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'setRank':
      return {
        ...state,
        data: action.results,
        pagination: {
          ...state.pagination,
          total: action.total,
        },
        loading: false,
      };
    case 'startLoading':
      return {
        ...state,
        loading: true,
      };
    case 'changePage':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
      };
    default:
      throw new Error();
  }
}