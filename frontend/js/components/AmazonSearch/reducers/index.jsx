export default function inputForm(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return {
        keyword: action.keyword,
        searchIndex: state.searchIndex,
        resultSet: state.resultSet,
        error_message: '',
      }
    case 'CHANGE_SEARCH_INDEX':
      return {
        keyword: state.keyword,
        searchIndex: action.searchIndex,
        resultSet: state.resultSet,
        error_message: '',
      }
    case 'SEARCH':
      return {
        keyword: action.keyword,
        searchIndex: action.searchIndex,
        resultSet: action.resultSet,
        error_message: '',
      }
    case 'ERROR':
      return {
        keyword: action.keyword,
        searchIndex: action.searchIndex,
        resultSet: [],
        error_message: action.message,
      }
    case 'SELECT_ITEM':
      return {
        keyword: '',
        searchIndex: state.searchIndex,
        resultSet: [],
        error_message: '',
      }
    case 'CLOSE_RESULT_SET':
      return Object.assign({}, state, {
        resultSet: []
      });
    default:
      return {
        keyword: '',
        searchIndex: 'KindleStore',
        resultSet: [],
        error_message: '',
      }
  }
}
