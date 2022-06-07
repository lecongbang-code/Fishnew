export interface Product
{
    id: number;
    category_id: number;
    image_path_1: string;
    image_path_2: string;
    image_path_3: string;
    image_path_4: string;
    video_path: string;
    name: string;
    description: string;
    discount: number;
    old_price: string;
    new_price: string;
    sex: number;
    size: number;
    color: number;
    amount: number;
    amount_total: number;
    ratings: number;
    question_status: boolean;
    comment_status: boolean;
    all_sizes_status: boolean;
    banner_status: boolean;
    status: boolean;
    created_at: string;
}