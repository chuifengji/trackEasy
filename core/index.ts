import { uploadInfos } from "./global";
import { ConfigurationType, ErrorType, EventType, TrickType } from "./type"
import { getUserInfo } from "./getUserInfo"
import { highlightTarget, checkEvent, dispatchEvents, createUploadInfo } from "./util"

export class TrackEasy {

    private transformData: Function | undefined;
    private transportData: Function | undefined;
    private highlightTarget: Function;
    private useHighlight: boolean | undefined;
    private useErrorWatcher: boolean | undefined;
    private cacheLen: number = 10;

    constructor(configuration: ConfigurationType) {

        this.handlerConfiguration(configuration);
        this.highlightTarget = highlightTarget;
        this.start();
    }

    public use(fns: Function[]): void {
        if (fns.length !== 2) throw new TypeError("");
        if (typeof fns[0] !== 'function' || typeof fns[1] !== 'function') throw new TypeError("transformData and transportData must be a function");
        this.transformData = fns[0];
        this.transportData = fns[1];
    }

    public start(): void {
        getUserInfo();
        if (this.useErrorWatcher) this.InitExposureTrick();
        if (this.useHighlight) this.highlightTarget();

    }
    public InitClickTrick(): void {
        window.addEventListener("click", this.handleClick)
    }

    public InitExposureTrick(): void {
        this.handleExposure()
    }

    private handlerConfiguration(configuration: ConfigurationType): void {
        let { useHighlight, useErrorWatcher, cacheLen } = configuration;
        this.cacheLen = cacheLen;
        this.useHighlight = useHighlight;
        this.useErrorWatcher = useErrorWatcher;
    }

    private handleClick(e: Event): void {
        const [xpath, type] = checkEvent(e) as [string, string];
        if (xpath && type.toLocaleLowerCase() === TrickType.Click) this.triggerEvent(xpath, EventType.Trick, TrickType.Click);
    }

    private handleExposure(): void {

    }

    private triggerEvent(xpath: string, type: EventType, action: TrickType | ErrorType): void {

        const uploadInfo = createUploadInfo(type, action, xpath);
        if (uploadInfos.length > this.cacheLen) {
            dispatchEvents(this.transformData as Function, this.transportData as Function, uploadInfos);
        }
        uploadInfos.splice(0, uploadInfos.length);
        uploadInfos.push(uploadInfo);
    }

}

