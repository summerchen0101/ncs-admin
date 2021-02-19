export const numberPattern = {
  pattern: /^[0-9]*.?[0-9]+$/,
  message: '须为数字格式',
}
export const intgerPattern = {
  pattern: /^[0-9]*$/,
  message: '须为整数格式',
}

export const twPhonePattern = {
  pattern: /^09\d{2}(\d{6}|-\d{3}-\d{3})$/,
  message: '须为台湾手机格式09xxxxxxxx',
}
export const passPattern = {
  pattern: /^\w{4,12}$/,
  message: '须为4~12码',
}

export const adminAccPattern = {
  pattern: /^\w{4,12}$/,
  message: '4~12个英数字',
}
