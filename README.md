# Criador de Formulário (teste rápido)

Este repositório contém um criador de formulário simples em JavaScript com testes automatizados.

## Rodando os testes

```bash
node --test
```

## Exemplo de uso

```js
import { createForm } from './src/formCreator.js';

const html = createForm({
  id: 'contato',
  fields: [
    { name: 'nome', label: 'Nome', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'mensagem', label: 'Mensagem', type: 'textarea' }
  ]
});

console.log(html);
```
