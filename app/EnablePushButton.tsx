'use client';
import { useState } from 'react';
import { enablePush } from '@/lib/push';

export default function EnablePushButton() {
  const [status, setStatus] = useState<'idle'|'working'|'ok'|'err'>('idle');

  const onClick = async () => {
    setStatus('working');
    try {
      await enablePush();
      setStatus('ok');
      alert('Push enabled!');
    } catch (e) {
      console.error(e);
      setStatus('err');
      alert(`Enable failed: ${(e as Error).message}`);
    }
  };

  return (
    <button onClick={onClick} disabled={status==='working'}>
      {status === 'working' ? 'Enabling…' : 'Enable Push'}
    </button>
  );
}
