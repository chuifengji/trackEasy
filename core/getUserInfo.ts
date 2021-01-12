import { userInfo } from "./global"

export function getUserInfo() {
    userInfo.lang = navigator.language;
    userInfo.location = navigator.geolocation;
    userInfo.screen = window.screen;
    userInfo.referrer = document.referrer;
    userInfo.userAgent = navigator.userAgent;
}

