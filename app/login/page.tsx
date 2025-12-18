'use client';

import { useState, useEffect } from 'react';
import { login, checkAuth } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth().then(res => {
      if (res.success) router.push('/dashboard');
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(form);
    setMsg(res.message);
    if (res.success) {
      router.push('/dashboard');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.btn}>Login</button>
      </form>
      <p>{msg}</p>
      <p>No account? <a href="/register">Register</a></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: '50px auto', textAlign: 'center' } as const,
  input: { display: 'block', width: '100%', margin: '10px 0', padding: 10 } as const,
  btn: { padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none' } as const,
};
