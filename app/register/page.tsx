'use client';

import { useState } from 'react';
import { register } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await register(form);

  // Check status code
  if (res.status === 201) {
    setMsg('Success! Redirecting to login...');
    setTimeout(() => router.push('/login'), 1000);
  } else if (res.status === 409) {
    setMsg('Error: ' + res.message); // "This email is already registered"
  } else if (res.status === 400) {
    setMsg('Error: ' + res.message); // Validation errors
  } else {
    setMsg('Error: Something went wrong');
  }
};

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={styles.input}
          required
        />
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
        <button type="submit" style={styles.btn}>Register</button>
      </form>
      <p>{msg}</p>
      
      <p>Have account? <a href="/login">Login</a></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: '50px auto', textAlign: 'center' } as const,
  input: { display: 'block', width: '100%', margin: '10px 0', padding: 10 } as const,
  btn: { padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none' } as const,
};
