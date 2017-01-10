export function change(keyword = '') {
  return {
    type: 'CHANGE',
    keyword,
  }
}

export function changeSearchIndex(searchIndex) {
  return {
    type: 'CHANGE_SEARCH_INDEX',
    searchIndex,
  }
}

export function search(keyword = '', searchIndex, resultSet = []) {
  return {
    type: 'SEARCH',
    keyword,
    searchIndex,
    resultSet,
  }
}

export function error(keyword = '', searchIndex, message = '') {
  return {
    type: 'ERROR',
    keyword,
    searchIndex,
    message,
  }
}
