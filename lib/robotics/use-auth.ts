'use client';
import {useEffect,useState} from 'react';
import type {User} from '@supabase/supabase-js';
import {roboticsClient} from './supabase';
export function useRoboticsAuth(){
 const [user,setUser]=useState<User|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
 useEffect(()=>{let active=true;try{const client=roboticsClient();const {data:{subscription}}=client.auth.onAuthStateChange((_event,session)=>{if(active){setUser(session?.user??null);setLoading(false);}});client.auth.getSession().then(({data,error})=>{if(active){setUser(data.session?.user??null);if(error)setError(error.message);setLoading(false);}});return()=>{active=false;subscription.unsubscribe();};}catch(e){setError(e instanceof Error?e.message:'Chưa kết nối tài khoản.');setLoading(false);return()=>{active=false;};}},[]);
 return {user,loading,error};
}
