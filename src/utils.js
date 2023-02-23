export const NAVIGATION = Object.freeze({
    HOME: 0,
    PERSONAL: 1,
    PROJECT: 2,
    CONTACT: 3,
    GAME: 4,
    STOCK: 5
})

const regexEmailFormat = /^(([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)]))$/

export function validateEmail (email) {
    return regexEmailFormat.test(email)
}

export function yyyymmdd (date) {
    const mm = date.getMonth()+1
    const dd = date.getDate()
    return [date.getFullYear(), (mm > 9? '' : '0') + mm, (dd > 9? '' : '0') + dd].join('')
}

// export const STOCK_INFO_API = "/stock/api/getStockInfo.jsp"
export const STOCK_INFO_API = "https://mis.twse.com.tw/exchangeReport/STOCK_DAY"
export async function fetchStockInfo (code) {
    const apiUrl = STOCK_INFO_API + `?ex_ch=tse_${code}.tw&json=1&delay=0`
    return await fetch(apiUrl)
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(res => {
        return { ok: true, data: res.msgArray[0] }
    }).catch(e => {
        console.error(e)
        return { ok: false, data: null }
    })
}

// export const STOCK_EXCHANGE_API = "/exchangeReport/STOCK_DAY"
export const STOCK_EXCHANGE_API = "https://www.twse.com.tw/exchangeReport/STOCK_DAY"
export async function fetchStockExchange (date, code) {
    return await fetch(STOCK_EXCHANGE_API + `?response=json&date=${date}&stockNo=${code}`)
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(res => {
        return { ok: true, data: { values: res.data, fields: res.fields} }
    }).catch(e => {
        console.error(e)
        return { ok: false, data: null }
    })
}