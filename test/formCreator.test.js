import test from 'node:test';
import assert from 'node:assert/strict';
import { createForm, escapeHtml } from '../src/formCreator.js';

test('createForm gera HTML de formulário com campos básicos', () => {
  const html = createForm({
    id: 'contato',
    method: 'post',
    action: '/enviar',
    submitLabel: 'Mandar',
    fields: [
      { name: 'nome', label: 'Nome', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'mensagem', label: 'Mensagem', type: 'textarea' }
    ]
  });

  assert.match(html, /<form id="contato" method="post" action="\/enviar">/);
  assert.match(html, /<input id="nome" name="nome" type="text" required \/>/);
  assert.match(html, /<textarea id="mensagem" name="mensagem"><\/textarea>/);
  assert.match(html, /<button type="submit">Mandar<\/button><\/form>/);
});

test('createForm lança erro quando fields é vazio', () => {
  assert.throws(() => createForm({ fields: [] }), /fields não vazio/);
});

test('escapeHtml escapa caracteres perigosos', () => {
  assert.equal(escapeHtml('<script>alert("x")</script>'), '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
});

test('createForm lança erro quando campo não tem name', () => {
  assert.throws(
    () => createForm({ fields: [{ label: 'Sem nome' }] }),
    /precisa ter "name"/
  );
});
