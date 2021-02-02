const useValidator = () => {
  return {
    sameAs: (field: string, msg?: string) => ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue(field) === value) {
          return Promise.resolve()
        }
        return Promise.reject(msg || '密碼不同')
      },
    }),
    userPassword: { pattern: /^\w{4,12}$/, message: '4~12個英數字' },
  }
}

export default useValidator
