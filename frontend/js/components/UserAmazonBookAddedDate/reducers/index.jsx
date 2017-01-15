export default function reduce(state, action) {
  switch (action.type) {
    case 'SELECT_DATE':
      return Object.assign({}, state, {
        date: action.date,
        showInputForm: false
      })
    case 'CHANGE_DATE':
      return Object.assign({}, state, {
        date: action.date
      })
    case 'SHOW_INPUT_FORM':
      return Object.assign({}, state, {
        showInputForm: true
      })
    default:
      return state;
  }
}
