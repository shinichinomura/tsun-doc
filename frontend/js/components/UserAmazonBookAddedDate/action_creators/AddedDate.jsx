export function selectDate(date) {
  return {
    type: 'SELECT_DATE',
    date,
  }
}

export function changeDate(date) {
  return {
    type: 'CHANGE_DATE',
    date
  }
}

export function showInputForm() {
  return {
    type: 'SHOW_INPUT_FORM'
  }
}
