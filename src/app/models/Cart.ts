export interface Cart{
    id: number;
    order_id: number;
    product_id: number;
    product_name: string;
    product_image_path: string;
    product_sex: string;
    product_size: string;
    product_color: string;
    product_number: number;
    product_old_price: string;
    product_dis_price: string;
    product_new_price: string;
    product_total_price: string;
    created_at: string;
    updated_at: string;
    status: string;
}