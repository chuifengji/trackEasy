export interface ConfigurationType {
    useHighlight: boolean,
    useErrorWatcher: boolean,
    cacheLen: number,
}

export interface UserInfo {
    lang: Navigator["language"]
    screen: Window["screen"] //屏幕信息
    referrer: Document['referrer']//用户来源
    userAgent: Navigator["userAgent"] //浏览器信息
    location?: Navigator['geolocation']//用户地理位置信息，该项需要权限
    appid?: string //设备id
}
export interface UploadInfo {
    id: string//事件id,hash 生成 唯一值。
    type: string//上报类型
    userinfo: UserInfo//用户信息
    timestamp: Date//上报时间
    action?: string//上报事件类型
    elementPath?: string//触发上报的元素信息,埋点类型才有
}


export enum EventType {
    Error = 'error',
    Trick = 'trick'
}
export enum TrickType {
    Click = "click",
    Exposure = "exposure",
}

export enum ErrorType {
    Http = 'http',
    PageLoad = 'pageload',
    Router = 'router',
    Common = 'common'
}