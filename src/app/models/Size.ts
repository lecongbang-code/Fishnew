export interface Size{
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    status: boolean;
}

export interface SizeProduct{
    id: number;
    product_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    status: boolean;
}