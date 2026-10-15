# SEO — Pousada Romelândia

Plano e checklist do site público. Base: guia oficial do Google (SEO e busca com IA são o mesmo trabalho: conteúdo útil, site rápido e rastreável, sinais locais). Não usamos `llms.txt`, nem schema "especial para IA": o Google diz que não precisa.

Atualizado em 15/10/2026.

---

## 1. Diagnóstico (o que encontramos)

| Problema | Gravidade | Situação |
|---|---|---|
| **Todo o SEO apontava para `www.pousadaromelandia.com.br`, domínio que NÃO está registrado** (consulta no Registro.br: "No match"). Canonical, sitemap, robots e schema mandavam o Google para um site que não existe. | Crítica | Corrigido: tudo usa o endereço real do site e troca com uma variável (ver seção 3). |
| Título e descrição iguais em todas as páginas internas | Alta | Corrigido: cada página tem título e descrição próprios. |
| Páginas dos quartos sem metadata nem schema | Alta | Corrigido: título, descrição, canonical, `HotelRoom` e `BreadcrumbList`. |
| Imagem de compartilhamento em formato retrato (1200×1600) | Média | Corrigido: nova imagem 1200×630 gerada com a marca nova. |
| Sitemap com data "agora" a cada visita | Média | Corrigido: datas fixas, atualizadas só quando o conteúdo muda. |
| FAQ sem marcação para o Google | Média | Corrigido: schema `FAQPage` na home. |
| Textos alternativos das fotos sem acento ou genéricos | Baixa | Corrigido nas fotos principais. |
| Rota de cadastro indexável | Baixa | Corrigido: `noindex` e bloqueada no `robots.txt`. |

## 2. O que já está no site

- **Home:** título "Pousada em Romelândia SC | Hotel Pousada Romelândia"; descrição com cidade, diferenciais e nota do Google; schema `LodgingBusiness` completo (endereço, telefone, geolocalização, horário 24h, formas de pagamento, avaliação, Instagram, mapa) e `FAQPage`.
- **/quartos, /galeria, /reservas, /contato:** título, descrição, canonical e Open Graph próprios.
- **/quartos/q5 … q9:** título e descrição por quarto, `HotelRoom` com fotos, capacidade e comodidades, e migalhas de pão.
- **robots.txt** e **sitemap.xml** (10 URLs) usando o endereço real.
- **Imagem de compartilhamento** no WhatsApp/Facebook/Google com a marca nova.
- Um único `h1` por página, textos alternativos descritivos, canonical por página.

## 3. Domínio (a decisão mais importante)

Hoje o site responde em `pousadaromelandia.nexoraos.io`. Para SEO local o ideal é um **domínio próprio** (`pousadaromelandia.com.br`):

1. Registrar o domínio no Registro.br (cerca de R$ 40 por ano). Ele está livre.
2. Apontar para o servidor (peça para o Claude fazer: túnel + DNS).
3. No servidor, definir `NEXT_PUBLIC_SITE_URL=https://pousadaromelandia.com.br` e refazer o build. Canonical, sitemap, robots e schema mudam sozinhos.
4. Deixar o endereço antigo redirecionando (301) para o novo.

Enquanto isso, o site funciona normalmente com o endereço atual.

## 4. Google Meu Negócio (o que mais traz hóspede local)

A ficha da pousada no Google vale mais que qualquer ajuste no site para a busca "pousada em Romelândia".

- [ ] Ficha **verificada** e com o mesmo nome, endereço e telefone do site: Hotel Pousada Romelândia, R. Doze de Outubro, 798, Romelândia SC, (49) 98400-8534.
- [ ] Categoria principal "Pousada"; adicionar "Hotel" e "Hospedaria" como secundárias.
- [ ] Link do site e link de reserva apontando para `/reservar` ou para a home.
- [ ] 15 a 25 fotos reais (fachada, quartos, café da manhã, estacionamento), com a nova marca.
- [ ] Horário 24 horas, comodidades marcadas (Wi-Fi, ar-condicionado, estacionamento, café da manhã).
- [ ] **Responder todas as avaliações** (positivas e negativas) em até 48 horas.
- [ ] Pedir avaliação a cada hóspede, com link curto da ficha, por WhatsApp no check-out. Meta: sair de 60 para 100+ avaliações.
- [ ] Postar 1 novidade por semana (foto, promoção de baixa temporada, evento da cidade).
- [ ] Perguntas e respostas da ficha: copiar as 5 do FAQ do site.

## 5. Palavras-chave (termos-alvo; validar volume no Search Console)

| Prioridade | Termo | Onde usar |
|---|---|---|
| 1 | pousada em Romelândia | Home (título), ficha do Google |
| 1 | hotel em Romelândia SC | Home, descrição |
| 2 | hospedagem Romelândia | Home, /quartos |
| 2 | onde ficar em Romelândia | Conteúdo novo (seção 6) |
| 2 | pousada com café da manhã Romelândia | Home, FAQ |
| 3 | pousada com ar-condicionado Romelândia | /quartos, páginas dos quartos |
| 3 | hospedagem para trabalho/empresa Romelândia | Conteúdo novo |
| 3 | pousada com estacionamento Romelândia | FAQ, /quartos |

Validar volume e posição real no Search Console depois de 3 a 4 semanas no ar.

## 6. Conteúdo a produzir (1 página por mês, sempre com fotos reais)

1. **Onde ficar em Romelândia SC** (guia curto: centro, o que tem perto, quando reservar).
2. **O que fazer em Romelândia** (pontos de visita, restaurantes, hamburguerias parceiras da pousada).
3. **Hospedagem para quem viaja a trabalho** (Wi-Fi, estacionamento, café cedo, nota fiscal).
4. **Café colonial da pousada** (a Kátia é o diferencial: foto e história).
5. **A história da pousada** (família, mais de 5 anos, como começou). Reforça confiança (E-E-A-T).

Cada página: um título claro, 400 a 800 palavras úteis, 3 a 6 fotos com texto alternativo, link para `/quartos` e botão de reserva.

## 7. Autoridade (links e menções)

- [ ] Perfil no **Booking** e no **Google Maps** com o mesmo nome, endereço e telefone.
- [ ] Prefeitura e secretaria de turismo de Romelândia: pedir para listar a pousada.
- [ ] Associações comerciais da região e empresas que enviam visitantes (parceiros locais): pedir link para o site.
- [ ] Instagram com link do site na bio (`@pousadaromelandia_`).
- [ ] Citar a pousada em guias locais e blogs de turismo do Oeste Catarinense.

## 8. Medição

- [ ] **Search Console**: adicionar o site, enviar `https://<endereço>/sitemap.xml` e solicitar indexação da home, `/quartos` e das 5 páginas de quarto.
- [ ] Mesmo envio no **Bing Webmaster Tools** (alimenta também o ChatGPT e outros buscadores).
- [ ] Ver no Search Console, a cada 15 dias: consultas, páginas, posição média e o relatório de desempenho em recursos de IA.
- [ ] Core Web Vitals no PageSpeed (meta: LCP < 2,5 s, INP < 200 ms, CLS < 0,1).
- [ ] Análise de resultados em 30, 60 e 90 dias.

## 9. Técnico (já feito / a fazer)

- [x] Canonical por página, sem duplicidade
- [x] `robots.txt` e `sitemap.xml` corretos
- [x] Dados estruturados validados (LodgingBusiness, HotelRoom, FAQPage, BreadcrumbList)
- [x] Imagem de compartilhamento 1200×630
- [x] Fontes e cores da marca nova
- [ ] Comprimir as fotos (as 28 fotos pesam 3,8 MB; converter para WebP e definir `sizes` melhora a velocidade no celular)
- [ ] Definir se são **9 ou 11 quartos** e ajustar o texto e o schema (`numberOfRooms`) para o número certo
- [ ] Testar os dados estruturados no Teste de Resultados Aprimorados do Google depois que o domínio definitivo estiver no ar

## 10. Ordem de execução sugerida

| Quando | Ação | Quem |
|---|---|---|
| Esta semana | Registrar o domínio `.com.br` e apontar | Euller + Claude |
| Esta semana | Verificar e completar a ficha do Google | Família |
| Esta semana | Search Console + Bing: enviar sitemap | Euller |
| Semana 2 | Fotos novas na ficha e peça avaliações | Família |
| Semana 2-3 | Comprimir fotos e conferir o número de quartos | Claude |
| Mês 1 em diante | 1 conteúdo novo por mês + 1 post semanal na ficha | Família + Claude |
| Dia 30 / 60 / 90 | Revisar o Search Console e ajustar títulos | Claude |
