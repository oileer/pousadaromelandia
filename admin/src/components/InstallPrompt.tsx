'use client';

import { useEffect, useState } from 'react';

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const KEY = 'pwa-install-dismissed';
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;

/** Pede para instalar o app no celular com um toque (Android/Chrome) ou explica o passo no iPhone. */
export default function InstallPrompt({ name, color = '#0B1F3A' }: { name: string; color?: string }) {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});

    const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone;
    const mobile = window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 900;
    let snoozed = false;
    try { snoozed = Date.now() - Number(localStorage.getItem(KEY) || 0) < SNOOZE_MS; } catch { /* sem storage */ }
    if (standalone || !mobile || snoozed) return;

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) && !/crios|fxios/i.test(navigator.userAgent);
    if (isIos) { setIos(true); setVisible(true); return; }

    const onPrompt = (e: Event) => { e.preventDefault(); setEvt(e as BIPEvent); setVisible(true); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', () => setVisible(false));
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(KEY, String(Date.now())); } catch { /* sem storage */ }
  };

  const install = async () => {
    if (!evt) return;
    await evt.prompt();
    const { outcome } = await evt.userChoice;
    setEvt(null);
    if (outcome === 'accepted') setVisible(false); else dismiss();
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Instalar aplicativo" style={{
      position: 'fixed', left: 12, right: 12, bottom: 12, zIndex: 9999, background: '#fff', color: '#0B1F3A',
      border: '1px solid #DDD5C4', borderRadius: 12, padding: '14px 14px 14px 16px', boxShadow: '0 12px 40px rgba(31,27,22,.25)',
      display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'Lato, Arial, sans-serif',
    }}>
      <img src="/icon-192.png" alt="" width={44} height={44} style={{ borderRadius: 10, flex: 'none' }} />
      <div style={{ flex: 1, fontSize: 13.5, lineHeight: 1.35 }}>
        <strong style={{ display: 'block', fontSize: 14 }}>Instalar {name}</strong>
        {ios
          ? <span>Toque em <b>Compartilhar</b> e depois em <b>Adicionar à Tela de Início</b>.</span>
          : <span>Adicione à tela inicial para abrir com um toque.</span>}
      </div>
      {!ios && (
        <button onClick={install} style={{ background: color, color: '#fff', border: 0, borderRadius: 8, padding: '10px 14px', fontWeight: 700, fontSize: 13, flex: 'none' }}>
          Instalar
        </button>
      )}
      <button onClick={dismiss} aria-label="Agora não" style={{ background: 'none', border: 0, fontSize: 22, lineHeight: 1, color: '#566178', flex: 'none', padding: 4 }}>×</button>
    </div>
  );
}
