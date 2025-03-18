export enum MsalCookieStrategy {
    // no cookies will be stores
    None = "None",
    // authentication cookie will be stored for all browsers
    Full = "Full",
    // authentication cookie will be stored only for IE and old Edge browsers
    OnlyIE = "OnlyIE"
}