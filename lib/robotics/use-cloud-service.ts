'use client';
import {useEffect,useState} from 'react';
import {serviceRestricted} from './cloud-transport';
export function useCloudServiceRestriction(){const [restricted,setRestricted]=useState(false);useEffect(()=>{const update=()=>setRestricted(serviceRestricted());update();window.addEventListener('robotics-service-status',update);return()=>window.removeEventListener('robotics-service-status',update);},[]);return restricted;}
