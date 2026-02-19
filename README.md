# FormCraft Studio

Aplicação web estática para criação de formulários com preview responsivo.

## Rodar localmente

```bash
python3 -m http.server 4173
```

Acesse: `http://localhost:4173`

## Deploy na Vercel (evitar erro 404)

Se aparecer `404: NOT_FOUND`, geralmente o projeto foi publicado com **Root Directory** incorreto ou sem rota padrão para `index.html`.

Este repositório já inclui `vercel.json` com fallback para `index.html`.

Passos recomendados:

1. Importar repositório na Vercel.
2. Em **Project Settings → General**:
   - Framework Preset: `Other`
   - Root Directory: `/` (raiz do repositório)
3. Em **Build and Output Settings**:
   - Build Command: *(vazio)*
   - Output Directory: *(vazio)*
4. Fazer **Redeploy**.

Após isso, a rota `/` deve abrir normalmente.
