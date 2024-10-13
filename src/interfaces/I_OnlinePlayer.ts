interface I_OnlinePlayer {
    id: number;                     
    device_id: string;               
    user_id: number | null;          
    socket_id: string;               
    last_active: Date;               
    created_at: Date;                
    updated_at: Date;  
}

export default I_OnlinePlayer