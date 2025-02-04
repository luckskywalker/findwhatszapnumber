import type {IUser} from "./user";


export interface IEnterprise {
    label: string,
    description: string,
    phoneNumber: string,
    category?: string,
    subCategory: string,
    address?: string,
    image?: {
        contentType: string,
        data: string
    },
    user: IUser
}