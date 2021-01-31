export const numberPattern = {
  pattern: new RegExp('^[0-9]*.?[0-9]+$'),
  message: '須為數字格式',
}
export const intgerPattern = {
  pattern: new RegExp('^[0-9]*$'),
  message: '須為整數格式',
}

export const twPhonePattern = {
  pattern: /^09\d{2}(\d{6}|-\d{3}-\d{3})$/,
  message: '須為台灣手機格式09xxxxxxxx',
}
export const passPattern = {
  pattern: /^\w{4,12}$/,
  message: '須為4~12碼',
}

export const adminAccPattern = {
  pattern: /^\w{4,12}$/,
  message: '4~12個英數字',
}
