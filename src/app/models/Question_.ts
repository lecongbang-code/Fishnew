export interface Question_{
    id: number;
    client_id: string;
    client_name: string;
    avatar: string;
    product_id: number;
    product_img: string;
    product_name: string;
    content: string;
    reply_status: boolean;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export interface ReplyQuestion{
    id: number;
    question_id: number;
    client_id: string;
    client_name: string;
    product_id: number;
    avatar: string;
    content: string;
    reply_status: boolean;
    status: boolean;
    created_at: string;
}