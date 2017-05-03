const keyValueArrayOntoObject = (arr, obj = {}) => {
    return {
        ...obj,
        [arr[0]]: arr[1]
    }
}

export const capitalize = str => str[0].toUpperCase() + str.slice(1)
export const getIdFromUrl = url => url.slice(url.lastIndexOf("/") + 1)
export const getCookie = (cookies, key) => {
    const match = cookies.split('; ')
    .map(pair => pair.split('='))
    .filter(pair => pair[0] === key)
    if (match.length) return match[0][1]
    else return null
}