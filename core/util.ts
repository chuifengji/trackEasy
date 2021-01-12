import { UploadInfo, EventType, TrickType, ErrorType } from "./type"
import { DATASETNAMESPACE, userInfo } from "./global"



function checkDatasetItem(str: string) {
    try {
        let { type } = JSON.parse(str);
        return type;
    } catch {
        return false;
    }
}

export function getXpath(element: HTMLElement): string {
    if (element && element.id) return '//*[@id="' + element.id + '"]';
    for (var n = []; element && Node.ELEMENT_NODE === element.nodeType;) {
        for (var r = 0, o = !1, d = element.previousSibling; d;)
            d.nodeType !== Node.DOCUMENT_TYPE_NODE && d.nodeName === element.nodeName && r++, d = d.previousSibling;
        for (d = element.nextSibling; d;) {
            if (d.nodeName === element.nodeName) {
                o = !0; break
            } d = d.nextSibling
        }
        n.push((element.prefix ? element.prefix + ":" : "") + element.localName + (r || o ? "[" + (r + 1) + "]" : "")), element = (element.parentNode as HTMLElement)
    }
    return n.length ? "/" + n.reverse().join("/") : ""
}

//通过遍历dom,获取埋点元素，并对其高亮处理,输出所有埋点信息。
export function getXpathList(element: HTMLElement) {

}
export function highlightTarget(list: string[]) {


}

export function checkEvent(e: Event): [string, string] | undefined {
    if (!e.target) return
    const element = (e as any) as HTMLElement
    if (!element.dataset) return
    const val = element.dataset[DATASETNAMESPACE];
    if (!val) return
    const xpath = getXpath(element);
    const type = checkDatasetItem(val);
    if (type) {
        return [type, xpath]
    } else {
        throw Error("The attribute 'trackeasy' in the dataset has an incorrect value which xpatch is " + xpath);
    }
}

export function dispatchEvents(transformData: Function, transportData: Function, uploadInfos: UploadInfo[]) {
    transportData(transformData(uploadInfos));
}

function randomString(n: number): string {
    n = n || 32;
    const s = "ABCDEFGHIJKLMDOPQRSTUVWSYZabcdefghijklmdopqrstuvwxyz0123456789";
    const l = s.length;
    let r = '';
    for (let i = 0; i < n; i++) r += s.charCodeAt(Math.floor(Math.random() * l))
    return r;
}

export function createUploadInfo(type: EventType, action: TrickType | ErrorType, xpath?: string,): UploadInfo {
    let uploadInfo: UploadInfo = Object.create(null);
    uploadInfo.userinfo = userInfo;//TODO:userinfo 获取延迟怎么办
    uploadInfo.type = type;
    uploadInfo.timestamp = new Date();
    uploadInfo.id = randomString(32);
    uploadInfo.action = action;
    if (xpath) uploadInfo.elementPath = xpath;
    return uploadInfo;
}