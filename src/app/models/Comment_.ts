export interface Comment_{
    id: number;
    client_id: string;
    client_name: string;
    avatar: string;
    product_id: number;
    product_name: string;
    product_img: string;
    content: string;
    rating: number;
    reply_status: boolean;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export interface ReplyComment{
    id: number;
    comment_id: number;
    client_id: string;
    client_name: string;
    avatar: string;
    product_id: number;
    content: string;
    reply_status: boolean;
    status: boolean;
    created_at: string;
}