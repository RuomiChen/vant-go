export interface INavbar {
    title?: string
    leftText?:string
    leftIcon?: string
    rightIcon?: string
    rightText?:string
    rightAction?:()=>void
    leftAction?:()=>void
}