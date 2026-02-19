const state = {
  title: 'Cadastro de Evento',
  description: 'Preencha os dados abaixo para participar do evento.',
  primaryColor: '#5b67f1',
  fields: [],
  selectedFieldId: null,
};

const id = () => Math.random().toString(36).slice(2, 9);

const preview = document.querySelector('#formPreview');
const fieldEditor = document.querySelector('#fieldEditor');
const previewWrapper = document.querySelector('#previewWrapper');

const formTitleInput = document.querySelector('#formTitle');
const formDescriptionInput = document.querySelector('#formDescription');
const primaryColorInput = document.querySelector('#primaryColor');

formTitleInput.addEventListener('input', (event) => {
  state.title = event.target.value;
  render();
});

formDescriptionInput.addEventListener('input', (event) => {
  state.description = event.target.value;
  render();
});

primaryColorInput.addEventListener('input', (event) => {
  state.primaryColor = event.target.value;
  document.documentElement.style.setProperty('--primary', state.primaryColor);
  render();
});

document.querySelectorAll('[data-type]').forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.dataset.type;
    const field = {
      id: id(),
      type,
      label: `Campo ${state.fields.length + 1}`,
      placeholder: type === 'file' ? '' : 'Digite aqui...',
      required: false,
      options: type === 'select' ? ['Opção 1', 'Opção 2'] : [],
      helpText: '',
      multiple: false,
      accept: '.pdf,.png,.jpg,.jpeg,.doc,.docx',
      maxSizeMB: 10,
    };

    if (type === 'email') {
      field.label = 'Seu e-mail';
      field.placeholder = 'nome@exemplo.com';
    }

    if (type === 'file') {
      field.label = 'Envie seu anexo';
      field.helpText = 'Tipos aceitos: PDF, imagens e documentos.';
    }

    state.fields.push(field);
    state.selectedFieldId = field.id;
    render();
  });
});

document.querySelectorAll('.device-toggle .btn-icon').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.device-toggle .btn-icon').forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    previewWrapper.classList.remove('device-desktop', 'device-tablet', 'device-mobile');
    previewWrapper.classList.add(`device-${button.dataset.device}`);
  });
});

document.querySelector('#saveTemplateBtn').addEventListener('click', () => {
  localStorage.setItem('formcraft-template', JSON.stringify(state));
  alert('Modelo salvo localmente com sucesso!');
});

document.querySelector('#publishBtn').addEventListener('click', () => {
  alert('Formulário publicado! (Demonstração)');
});

function renderFieldInput(field) {
  if (field.type === 'textarea') {
    return `<textarea placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>`;
  }

  if (field.type === 'select') {
    const options = field.options
      .map((option) => `<option value="${option}">${option}</option>`)
      .join('');
    return `<select ${field.required ? 'required' : ''}><option value="">Selecione...</option>${options}</select>`;
  }

  if (field.type === 'file') {
    return `<input type="file" ${field.multiple ? 'multiple' : ''} accept="${field.accept}" ${field.required ? 'required' : ''} />`;
  }

  return `<input type="${field.type}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''} />`;
}

function renderEditor() {
  const field = state.fields.find((item) => item.id === state.selectedFieldId);

  if (!field) {
    fieldEditor.innerHTML = `
      <h3>Edição personalizada</h3>
      <p>Selecione um campo no preview para personalizá-lo.</p>
    `;
    return;
  }

  fieldEditor.innerHTML = `
    <h3>Edição personalizada</h3>
    <label>
      Nome do campo
      <input id="editLabel" type="text" value="${field.label}" />
    </label>
    <label>
      Texto de ajuda
      <input id="editHelpText" type="text" value="${field.helpText}" placeholder="Ex: Este campo é obrigatório" />
    </label>
    ${field.type !== 'file' ? `<label>Placeholder<input id="editPlaceholder" type="text" value="${field.placeholder}" /></label>` : ''}
    ${field.type === 'select' ? `<label>Opções (separadas por vírgula)<input id="editOptions" type="text" value="${field.options.join(', ')}" /></label>` : ''}
    ${field.type === 'file' ? `<label>Tipos aceitos<input id="editAccept" type="text" value="${field.accept}" /></label>
    <label>Tamanho máximo (MB)<input id="editMaxSize" type="number" min="1" max="100" value="${field.maxSizeMB}" /></label>
    <label><input id="editMultiple" type="checkbox" ${field.multiple ? 'checked' : ''} /> Permitir múltiplos arquivos</label>` : ''}
    <label>
      <input id="editRequired" type="checkbox" ${field.required ? 'checked' : ''} /> Obrigatório
    </label>
  `;

  document.querySelector('#editLabel').addEventListener('input', (event) => {
    field.label = event.target.value;
    render();
  });

  const helpInput = document.querySelector('#editHelpText');
  helpInput.addEventListener('input', (event) => {
    field.helpText = event.target.value;
    render();
  });

  const placeholderInput = document.querySelector('#editPlaceholder');
  if (placeholderInput) {
    placeholderInput.addEventListener('input', (event) => {
      field.placeholder = event.target.value;
      render();
    });
  }

  const optionsInput = document.querySelector('#editOptions');
  if (optionsInput) {
    optionsInput.addEventListener('input', (event) => {
      field.options = event.target.value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      render();
    });
  }

  const acceptInput = document.querySelector('#editAccept');
  if (acceptInput) {
    acceptInput.addEventListener('input', (event) => {
      field.accept = event.target.value;
      render();
    });
  }

  const maxSizeInput = document.querySelector('#editMaxSize');
  if (maxSizeInput) {
    maxSizeInput.addEventListener('input', (event) => {
      field.maxSizeMB = Number(event.target.value) || 1;
      render();
    });
  }

  const multipleInput = document.querySelector('#editMultiple');
  if (multipleInput) {
    multipleInput.addEventListener('change', (event) => {
      field.multiple = event.target.checked;
      render();
    });
  }

  document.querySelector('#editRequired').addEventListener('change', (event) => {
    field.required = event.target.checked;
    render();
  });
}

function render() {
  const fieldsHtml = state.fields
    .map((field) => {
      const selected = field.id === state.selectedFieldId ? 'selected' : '';

      return `
      <div class="form-field ${selected}" data-field-id="${field.id}">
        <div class="field-row">
          <label>${field.label}${field.required ? ' *' : ''}</label>
          <button class="remove-btn" data-remove-field-id="${field.id}" type="button">Remover</button>
        </div>
        ${field.helpText ? `<small class="hint">${field.helpText}</small>` : ''}
        ${renderFieldInput(field)}
        ${field.type === 'file' ? `<small class="hint">Max: ${field.maxSizeMB}MB</small>` : ''}
      </div>`;
    })
    .join('');

  const emptyStateHtml = document.querySelector('#emptyStateTemplate').innerHTML;

  preview.innerHTML = `
    <header class="form-head">
      <h2>${state.title || 'Sem título'}</h2>
      <p>${state.description || 'Sem descrição'}</p>
    </header>
    ${fieldsHtml || emptyStateHtml}
    <button class="btn btn-primary" type="submit">Enviar respostas</button>
  `;

  preview.querySelectorAll('[data-field-id]').forEach((element) => {
    element.addEventListener('click', () => {
      state.selectedFieldId = element.dataset.fieldId;
      render();
    });
  });

  preview.querySelectorAll('[data-remove-field-id]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const toRemove = button.dataset.removeFieldId;
      state.fields = state.fields.filter((field) => field.id !== toRemove);
      if (state.selectedFieldId === toRemove) {
        state.selectedFieldId = null;
      }
      render();
    });
  });

  preview.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Resposta enviada! (Demonstração)');
  });

  renderEditor();
}

render();
