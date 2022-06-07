export interface Color{
    id: number;
    name: string;
    color_code: string;
    created_at: string;
    updated_at: string;
    status: boolean;
}

export interface ColorProduct{
    id: number;
    product_id: number;
    name: string;
    color_code: string;
    created_at: string;
    updated_at: string;
    status: boolean;
}