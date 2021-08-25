export const validatePositiveNumbers = (newValue, preValue) => {
    if (Number(newValue) >= 0 || null) {
        return newValue
    } else {
        return preValue
    }
}