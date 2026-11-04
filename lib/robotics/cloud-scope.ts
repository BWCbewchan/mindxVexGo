export function cloudScope(){try{return new URL(process.env.NEXT_PUBLIC_ROBOTICS_SUPABASE_URL||'').hostname.split('.')[0];}catch{return 'offline';}}
