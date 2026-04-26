"use client"
import { useState, useEffect } from "react"
import { WA_URL } from "@/lib/config"

export default function WhatsAppFAB() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href={WA_URL("Olá! Gostaria de informações sobre hospedagem na Pousada Romelândia.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9000,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "pointer",
      }}
    >
      {/* WhatsApp SVG oficial */}
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2C8.268 2 2 8.268 2 16c0 2.44.658 4.73 1.806 6.706L2 30l7.52-1.774A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
          fill="#fff"
        />
        <path
          d="M23.5 20.27c-.3-.15-1.77-.875-2.045-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.466-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.018-.462.132-.61.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.585-.49-.505-.675-.515-.175-.008-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.115 3.225 5.125 4.525.716.31 1.275.495 1.71.633.718.229 1.372.196 1.888.119.576-.086 1.77-.724 2.02-1.424.25-.7.25-1.3.175-1.424-.075-.125-.275-.2-.575-.35z"
          fill="#25D366"
        />
      </svg>

      {/* Pulse ring */}
      <span style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        border: "2px solid #25D366",
        animation: "wa-pulse 2s ease-out infinite",
        pointerEvents: "none",
      }} />

      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0; }
        }
      `}</style>
    </a>
  )
}
