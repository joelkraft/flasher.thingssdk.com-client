import { apiUrl } from './config'

export const capitalize = str => str[0].toUpperCase() + str.slice(1)
export const getIdFromUrl = url => url.slice(url.lastIndexOf("/") + 1)
export const getUrlFromId = id => `${apiUrl.root}/manifests/${id}`