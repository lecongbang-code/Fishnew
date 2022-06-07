export interface ListOrder{
    id: number;
    order_name: string;
    order_payments: string;
    order_transport_fee: string;
    order_total_price: string;
    order_total_price_old: string;
    order_prepay: number;
    bonuses: number;
    bonus_code: string;
    client_id: string;
    client_name: string;
    client_phone: string;
    client_address: string;
    client_note: string;
    created_at: string;
    updated_at: string;
    received_date: string;
    status: string;
}