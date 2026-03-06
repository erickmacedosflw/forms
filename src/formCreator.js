function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderField(field) {
  const name = escapeHtml(field.name ?? '');
  const label = escapeHtml(field.label ?? field.name ?? 'Campo');
  const required = field.required ? ' required' : '';

  if (!name) {
    throw new Error('Cada campo precisa ter "name".');
  }

  if (field.type === 'textarea') {
    return `<label for="${name}">${label}</label><textarea id="${name}" name="${name}"${required}></textarea>`;
  }

  const type = escapeHtml(field.type ?? 'text');
  return `<label for="${name}">${label}</label><input id="${name}" name="${name}" type="${type}"${required} />`;
}

export function createForm(config) {
  if (!config || !Array.isArray(config.fields) || config.fields.length === 0) {
    throw new Error('Configuração inválida: forneça fields não vazio.');
  }

  const formId = escapeHtml(config.id ?? 'form-gerado');
  const method = escapeHtml(config.method ?? 'post');
  const action = escapeHtml(config.action ?? '#');
  const submitLabel = escapeHtml(config.submitLabel ?? 'Enviar');

  const content = config.fields.map(renderField).join('');

  return `<form id="${formId}" method="${method}" action="${action}">${content}<button type="submit">${submitLabel}</button></form>`;
}

export { escapeHtml };
