'use client';

import { useState, useEffect } from 'react';
import { checkAuth, logout, User } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth().then(res => {
      if (res.success && res.user) {
        setUser(res.user);
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={handleLogout} style={{ padding: 10, background: 'red', color: 'white', border: 'none' }}>
        Logout
      </button>
    </div>
  );
}
