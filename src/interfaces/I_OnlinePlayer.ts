interface I_OnlinePlayer {
    id: number;                     
    user_id: string          
    socket_id: string;               
    last_active: Date;               
    created_at: Date;                
    updated_at: Date;  
}

export default I_OnlinePlayer