// API Access Constants
const DEV_API_KEY = 'XIOVIJJihFrKFeGH6KwxT3ve2Y1Bxnta'
const PRODUCTION_API_KEY = 'HXZO1nlg9qD4tfCcSSqdcjxq3pGaF0eU'
export const API_KEY = (__API_ENV__ === 'development') ? DEV_API_KEY : PRODUCTION_API_KEY

// Event Tracking Constants
export const PURCHASE_SUCCESS_ACTION = "Successfully purchased"
export const ACCOUNT_MODAL_CLICK = "Clicked account modal"
export const USER_MENU_OPEN = "Opened user menu"
export const USER_MENU_CLOSE = "Closed user menu"
