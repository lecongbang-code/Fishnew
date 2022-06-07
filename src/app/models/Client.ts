export interface Client{
    id: number;
    facebook_id: string;
    name: string;
    photoUrl: string;
    avatar: string;
    sex: boolean;
    phone: string;
    email: string;
    address: string;
    status: boolean;
}

export interface NewClient{
    id: number;
    facebook_id: string;
    name: string;
    authToken: string;
    password: string;
    avatar: string;
}