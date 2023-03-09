export const NAVIGATION = Object.freeze({
    HOME: 0,
    PERSONAL: 1,
    PROJECT: 2,
    CONTACT: 3,
    GAME: 4,
    TRACK: 5,
    STOCK: 6
})

const regexEmailFormat = /^(([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)]))$/

export function validateEmail (email) {
    return regexEmailFormat.test(email)
}

export function yyyymmdd (date, composer = '') {
    const mm = date.getMonth()+1
    const dd = date.getDate()
    return [date.getFullYear(), (mm > 9? '' : '0') + mm, (dd > 9? '' : '0') + dd].join(composer)
}

export function str2Num (str) {
    try {
        return Number(str)
    } catch (error) {
        return 0
    }
}

export function isStockUpdateInterval () {
    const today = new Date()
    if (today.getHours() < 9 || today.getHours() > 14) return false
    if (today.getHours() === 13 && today.getMinutes() > 30) return false
    return true
}

/***
 * From sheet.best
 */
const TRACKING_SHEET_URL = "https://sheet.best/api/sheets/9f33dfea-7b70-4a16-a8d4-e192ac71be0c"
export async function setTrack (data) {
    return await fetch(TRACKING_SHEET_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        return { ok: res.ok, data: res.ok? res.json():res.statusText }
    })
}
export async function getTrack () {
    return await fetch(TRACKING_SHEET_URL)
    .then(res => {
        return { ok: res.ok, data: res.ok? res.json():res.statusText }
    })
}

const STOCK_REALTIME_INFO_URL = "https://script.google.com/macros/s/AKfycbxBjGB5nFcZbXNJyj_L9tDuUM_fzilLpONPQp0fCeZAKl_1E55XnzALhuuBflIkTSr-Xg/exec?stockNo="
export async function getStockInfo (code = "2330") {
    return await fetch(STOCK_REALTIME_INFO_URL + code)
    .then(async res => ({ ok: res.ok, data: res.ok? await res.json():res.statusText }))
    .then(async res => {
        return { ok: res.ok, data: await res.data.msgArray? await res.data.msgArray[0]:[] }
    })
}

const STOCK_EXCHANGE_DATA_URL = "https://script.google.com/macros/s/AKfycbzOnMGQO8p3dZ-FvgrHcJTklElTtBRePnnugMvr7twtk4T-RHdlrhSmEWAk4QwdOBBz/exec"
export async function getStockExchangeData (date = yyyymmdd(new Date(), '/'), code = "2330") {
    return await fetch(STOCK_EXCHANGE_DATA_URL + `?response=json&date=${date}&stockNo=${code}`)
    .then(async res => {
        return { ok: res.ok, data: res.ok? await res.json():res.statusText }
    })
}