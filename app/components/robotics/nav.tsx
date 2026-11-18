'use client';
import Link from 'next/link';
import {useRoboticsAuth} from '../../../lib/robotics/use-auth';
import styles from '../../library/library.module.css';
export default function RoboticsNav(){const {user}=useRoboticsAuth();return <header className={styles.nav}><Link href="/" aria-label="mindX Robotics"><img src="/mindx-logo-color-mark.png" alt="mindX"/><span>ROBOTICS LAB</span></Link><nav aria-label="Điều hướng Robotics"><Link href="/assembly/projects">Lắp ráp</Link><Link href="/simulation">Lập trình</Link><Link href="/robolab">RoboLab</Link><Link href="/account">{user?'Tài khoản':'Đăng nhập'}</Link></nav></header>;}
