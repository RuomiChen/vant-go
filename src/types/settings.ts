export type SettingsList = ISettingGroup []
export type ISettingGroup = {
    children:ISettingsItem[]
}
export interface ISettingsItem{
    left:{
        icon?:string,
        label?:string
    },
    right?:{
        type?:string,
        model:string,
        onChange?:any
    },
    action?:()=>void
}
