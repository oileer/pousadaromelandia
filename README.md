# Pousada Romelândia — Site Institucional

Site institucional da Pousada Romelândia, localizada em Romelândia, SC. Desenvolvido para aumentar a presença digital da pousada e converter visitas em reservas via WhatsApp.

**Demo:** [pousadaromelandia.vercel.app](https://pousadaromelandia.vercel.app)

---

## Seções

- **Hero** — CTA direto para reserva via WhatsApp
- **Estatísticas** — 9 quartos, 4,5★ no Google, 60+ avaliações, desde 2018
- **Quartos** — cards com foto, capacidade e botão de reserva individualizado por quarto
- **Amenidades** — Wi-Fi, ar-condicionado, estacionamento, atendimento 24h
- **Depoimentos** — avaliações reais do Google
- **Localização** — link direto para o Google Maps
- **Contato** — WhatsApp e Instagram

---

## Stack

| | |
|--|--|
| Framework | Next.js 15 (App Router) |
| Estilo | Tailwind CSS |
| Tipografia | Cormorant Garamond + Inter |
| Paleta | Verde floresta + ouro (Warm Heritage) |
| Animações | IntersectionObserver via ScrollReveal |
| Deploy | Vercel |

---

## Como rodar localmente

```bash
git clone https://github.com/oileer/pousadaromelandia.git
cd pousadaromelandia
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Estrutura

```
pousadaromelandia/
├── app/
│   ├── page.tsx          # página principal com todas as seções
│   ├── layout.tsx        # metadata SEO e fontes
│   └── globals.css       # variáveis de cor e estilos base
├── components/
│   ├── Navbar.tsx        # navegação com link para reservas
│   ├── Footer.tsx        # rodapé com contatos e redes sociais
│   └── ScrollReveal.tsx  # animação de entrada ao scrollar
├── lib/
│   └── config.ts         # WhatsApp, Instagram e Google Maps da pousada
└── public/
    └── assets/           # fotos dos quartos organizadas por pasta
```

---

## Personalização

Para adaptar para outra pousada, edite `lib/config.ts`:

```ts
export const WHATSAPP = "55XXXXXXXXXXX"
export const INSTAGRAM = "https://www.instagram.com/seu_perfil/"
export const MAPS_URL = "https://maps.google.com/?q=Seu+Endereço"
```

---

## Licença

MIT

---

Feito por [@oileer](https://github.com/oileer)
