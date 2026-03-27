/* ============================================================
   EduGuarda — App JS
   Arquitetura: SPA com roteamento client-side.
   Todos os dados são mockados. Para conectar ao banco,
   substitua as funções `getData()` / `postData()` / etc.
   por chamadas fetch() reais à sua API REST.
   ============================================================ */

/* ─── API STUB (substitua por fetch real) ─────────────────── */
/* ─── API REAL (Conectada ao Flask) ─────────────────── */
const API = {
  baseUrl: 'http://localhost:3000/api',

  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return [];
    }
  },

  async post(endpoint, body) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  },

  async put(endpoint, id, body) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return await response.json();
    } catch (error) {
      console.error("Erro no PUT:", error);
    }
  },

  async del(endpoint, id) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error("Erro no DELETE:", error);
    }
  }
};

/* ─── MOCK DATA ───────────────────────────────────────────── */
const mockData = {
  escola: [
    { id_escola: 1, nome: 'E.M. João XXIII', tipo: 'Municipal', endereco: 'Rua das Flores, 120', bairro: 'Centro', cidade: 'Juazeiro do Norte', telefone: '(88) 3512-1111' },
    { id_escola: 2, nome: 'E.E. Dom Quintino', tipo: 'Estadual', endereco: 'Av. Padre Cícero, 340', bairro: 'Pirajá', cidade: 'Juazeiro do Norte', telefone: '(88) 3512-2222' },
    { id_escola: 3, nome: 'E.M. Santos Dumont', tipo: 'Municipal', endereco: 'Rua São Pedro, 55', bairro: 'Franciscanos', cidade: 'Juazeiro do Norte', telefone: '(88) 3512-3333' },
  ],
  turma: [
    { id_turma: 1, ano_letivo: 2025, serie: '6º Ano', turno: 'Manhã', id_escola: 1, escola: 'E.M. João XXIII' },
    { id_turma: 2, ano_letivo: 2025, serie: '7º Ano', turno: 'Tarde', id_escola: 1, escola: 'E.M. João XXIII' },
    { id_turma: 3, ano_letivo: 2025, serie: '8º Ano', turno: 'Manhã', id_escola: 2, escola: 'E.E. Dom Quintino' },
    { id_turma: 4, ano_letivo: 2025, serie: '9º Ano', turno: 'Noite', id_escola: 2, escola: 'E.E. Dom Quintino' },
  ],
  aluno: [
    { id_aluno: 1, nome: 'Ana Clara Souza', data_nascimento: '2012-03-10', sexo: 'F', situacao_escolar: 'Regular', cpf: '***.***.***-01', id_familia: 1 },
    { id_aluno: 2, nome: 'Bruno Ferreira Lima', data_nascimento: '2011-07-22', sexo: 'M', situacao_escolar: 'Em risco', cpf: '***.***.***-02', id_familia: 2 },
    { id_aluno: 3, nome: 'Carla Melo Santos', data_nascimento: '2012-11-05', sexo: 'F', situacao_escolar: 'Regular', cpf: '***.***.***-03', id_familia: 3 },
    { id_aluno: 4, nome: 'Diego Oliveira Paz', data_nascimento: '2010-01-30', sexo: 'M', situacao_escolar: 'Evadido', cpf: '***.***.***-04', id_familia: 4 },
    { id_aluno: 5, nome: 'Eduarda Torres', data_nascimento: '2013-06-18', sexo: 'F', situacao_escolar: 'Regular', cpf: '***.***.***-05', id_familia: 5 },
  ],
  familia: [
    { id_familia: 1, renda_familiar: 'R$ 1.200,00', endereco: 'Rua A, 10', bairro: 'Centro', cidade: 'Juazeiro do Norte', telefone: '(88) 99801-1111' },
    { id_familia: 2, renda_familiar: 'R$ 600,00', endereco: 'Rua B, 22', bairro: 'Pirajá', cidade: 'Juazeiro do Norte', telefone: '(88) 99801-2222' },
    { id_familia: 3, renda_familiar: 'R$ 900,00', endereco: 'Rua C, 5', bairro: 'Salesiano', cidade: 'Juazeiro do Norte', telefone: '(88) 99801-3333' },
    { id_familia: 4, renda_familiar: 'R$ 412,00', endereco: 'Rua D, 88', bairro: 'Muriti', cidade: 'Juazeiro do Norte', telefone: '(88) 99801-4444' },
  ],
  frequencia: [
    { id: 1, id_aluno: 1, aluno: 'Ana Clara Souza', data_aula: '2025-03-10', hora_aula: '07:30', presente: true, justificativa: '' },
    { id: 2, id_aluno: 2, aluno: 'Bruno Ferreira Lima', data_aula: '2025-03-10', hora_aula: '07:30', presente: false, justificativa: 'Doença' },
    { id: 3, id_aluno: 3, aluno: 'Carla Melo Santos', data_aula: '2025-03-10', hora_aula: '07:30', presente: true, justificativa: '' },
    { id: 4, id_aluno: 4, aluno: 'Diego Oliveira Paz', data_aula: '2025-03-10', hora_aula: '07:30', presente: false, justificativa: '' },
    { id: 5, id_aluno: 5, aluno: 'Eduarda Torres', data_aula: '2025-03-10', hora_aula: '07:30', presente: true, justificativa: '' },
  ],
  avaliacao: [
    { id_avaliacao: 1, id_aluno: 1, aluno: 'Ana Clara Souza', id_turma: 1, disciplina: 'Matemática', nota: 8.5, periodo: '1º Bimestre', data_avaliacao: '2025-03-20' },
    { id_avaliacao: 2, id_aluno: 2, aluno: 'Bruno Ferreira Lima', id_turma: 2, disciplina: 'Português', nota: 5.0, periodo: '1º Bimestre', data_avaliacao: '2025-03-20' },
    { id_avaliacao: 3, id_aluno: 3, aluno: 'Carla Melo Santos', id_turma: 1, disciplina: 'Ciências', nota: 7.5, periodo: '1º Bimestre', data_avaliacao: '2025-03-21' },
    { id_avaliacao: 4, id_aluno: 4, aluno: 'Diego Oliveira Paz', id_turma: 3, disciplina: 'História', nota: 3.0, periodo: '1º Bimestre', data_avaliacao: '2025-03-21' },
  ],
  matricula: [
    { id_aluno: 1, aluno: 'Ana Clara Souza', id_turma: 1, turma: '6º Ano - Manhã', ano_letivo: 2025, data_matricula: '2025-02-01', status: 'Ativa' },
    { id_aluno: 2, aluno: 'Bruno Ferreira Lima', id_turma: 2, turma: '7º Ano - Tarde', ano_letivo: 2025, data_matricula: '2025-02-01', status: 'Ativa' },
    { id_aluno: 4, aluno: 'Diego Oliveira Paz', id_turma: 3, turma: '8º Ano - Manhã', ano_letivo: 2025, data_matricula: '2025-02-01', status: 'Cancelada' },
    { id_aluno: 5, aluno: 'Eduarda Torres', id_turma: 1, turma: '6º Ano - Manhã', ano_letivo: 2025, data_matricula: '2025-02-03', status: 'Ativa' },
  ],
  programa_social: [
    { id_programa: 1, nome: 'Bolsa Família', tipo: 'Federal', orgao_responsavel: 'MDS', descricao: 'Transferência de renda para famílias vulneráveis.' },
    { id_programa: 2, nome: 'PETI', tipo: 'Federal', orgao_responsavel: 'MDS', descricao: 'Programa de erradicação do trabalho infantil.' },
    { id_programa: 3, nome: 'BPC', tipo: 'Federal', orgao_responsavel: 'INSS', descricao: 'Benefício de Prestação Continuada.' },
  ],
  atendimento_social: [
    { id_atendimento: 1, id_familia: 1, familia: 'Família Souza', data_atendimento: '2025-03-05', tipo_atendimento: 'Acompanhamento', observacoes: 'Visita domiciliar realizada.', profissional: 'Dra. Mariana' },
    { id_atendimento: 2, id_familia: 2, familia: 'Família Lima', data_atendimento: '2025-03-07', tipo_atendimento: 'Orientação', observacoes: 'Orientação sobre programas disponíveis.', profissional: 'Sr. Carlos' },
    { id_atendimento: 3, id_familia: 4, familia: 'Família Paz', data_atendimento: '2025-03-10', tipo_atendimento: 'Emergência', observacoes: 'Situação de vulnerabilidade extrema.', profissional: 'Dra. Mariana' },
  ],
};

/* ─── RISK MOCK (calculado) ───────────────────────────────── */
const riskData = [
  { id: 4, nome: 'Diego Oliveira Paz', turma: '8º Ano - Manhã', escola: 'E.E. Dom Quintino', freq: 45, nota: 3.0, social: true, score: 92 },
  { id: 2, nome: 'Bruno Ferreira Lima', turma: '7º Ano - Tarde', escola: 'E.M. João XXIII', freq: 68, nota: 5.0, social: false, score: 61 },
  { id: 1, nome: 'Ana Clara Souza', turma: '6º Ano - Manhã', escola: 'E.M. João XXIII', freq: 95, nota: 8.5, social: false, score: 12 },
  { id: 3, nome: 'Carla Melo Santos', turma: '6º Ano - Manhã', escola: 'E.M. João XXIII', freq: 88, nota: 7.5, social: false, score: 18 },
  { id: 5, nome: 'Eduarda Torres', turma: '6º Ano - Manhã', escola: 'E.M. João XXIII', freq: 92, nota: 8.0, social: false, score: 8 },
];

/* ─── ROUTER ──────────────────────────────────────────────── */
const pages = {};

function registerPage(id, fn) { pages[id] = fn; }

async function navigate(pageId) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === pageId);
  });
  const titles = {
    dashboard: 'Dashboard',
    escola: 'Escolas',
    turma: 'Turmas',
    aluno: 'Alunos',
    familia: 'Famílias',
    frequencia: 'Frequência',
    avaliacao: 'Avaliações',
    matricula: 'Matrículas',
    programa_social: 'Programas Sociais',
    atendimento_social: 'Atendimentos Sociais',
    risco: 'Risco de Evasão',
  };
  document.getElementById('topbarTitle').textContent = titles[pageId] || pageId;
  const content = document.getElementById('pageContent');
  content.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-muted)">Carregando...</div>';
  if (pages[pageId]) {
    content.innerHTML = '';
    await pages[pageId](content);
  }
  // close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
}

/* ─── MODAL HELPERS ───────────────────────────────────────── */
function openModal(title, bodyHtml, onSave) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyHtml;
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('modalSave').onclick = () => {
    if (onSave()) { closeModal(); toast('Registro salvo com sucesso!', 'success'); }
  };
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }

function toast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${msg}</span>`;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

/* ─── GENERIC TABLE PAGE BUILDER ─────────────────────────── */
function buildTablePage(container, { title, subtitle, cols, rows, onNew, onEdit, onDelete }) {
  const ph = document.createElement('div');
  ph.innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">${title}</div>
        <div class="page-subtitle">${subtitle}</div>
      </div>
      <div class="search-bar">
        <input class="search-input" id="searchInput" placeholder="Buscar..."/>
        <button class="btn btn-primary" id="btnNovo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Novo
        </button>
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>${cols.map(c => `<th>${c.label}</th>`).join('')}<th>Ações</th></tr></thead>
        <tbody id="tbody"></tbody>
      </table>
      <div class="pagination">
        <span id="pgInfo"></span>
        <div class="pag-btns">
          <button class="pag-btn active">1</button>
        </div>
      </div>
    </div>
  `;
  container.appendChild(ph);

  function render(data) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = data.length
      ? data.map(row => `
          <tr>
            ${cols.map(c => `<td>${c.render ? c.render(row) : (row[c.key] ?? '—')}</td>`).join('')}
            <td>
              <div class="action-btns">
                <button class="action-btn" data-id="${row[cols[0].key]}" title="Editar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="action-btn del" data-id="${row[cols[0].key]}" title="Excluir">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                </button>
              </div>
            </td>
          </tr>`).join('')
      : `<tr><td colspan="${cols.length + 1}" style="text-align:center;padding:32px;color:var(--text-muted)">Nenhum registro encontrado.</td></tr>`;

    document.getElementById('pgInfo').textContent = `${data.length} registro(s)`;

    tbody.querySelectorAll('.action-btn:not(.del)').forEach(btn => {
      btn.addEventListener('click', () => {
        const rec = data.find(r => String(r[cols[0].key]) === btn.dataset.id);
        if (rec && onEdit) onEdit(rec);
      });
    });
    tbody.querySelectorAll('.action-btn.del').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Confirmar exclusão?')) {
          if (onDelete) onDelete(btn.dataset.id);
          toast('Registro excluído.', 'warn');
        }
      });
    });
  }

  render(rows);

  document.getElementById('btnNovo').addEventListener('click', () => { if (onNew) onNew(); });
  document.getElementById('searchInput').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    render(rows.filter(r => JSON.stringify(r).toLowerCase().includes(q)));
  });
}

/* ═══════════════════════════════════════════════════════════
   PAGES
═══════════════════════════════════════════════════════════ */

/* ─── DASHBOARD ───────────────────────────────────────────── */
registerPage('dashboard', async (c) => {
  c.innerHTML = `
    <div class="page-title">Painel de Monitoramento</div>
    <div class="page-subtitle">Visão geral — Sistema de Proteção à Trajetória Escolar · ${new Date().toLocaleDateString('pt-BR')}</div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Alunos Matriculados</div>
        <div class="stat-value">1.284</div>
        <div class="stat-delta"><span class="up">↑ 3%</span> vs. ano anterior</div>
      </div>
      <div class="stat-card warn">
        <div class="stat-label">Em Risco de Evasão</div>
        <div class="stat-value">87</div>
        <div class="stat-delta"><span class="dn">↑ 12%</span> vs. mês anterior</div>
      </div>
      <div class="stat-card danger">
        <div class="stat-label">Evadidos (2025)</div>
        <div class="stat-value">23</div>
        <div class="stat-delta"><span class="dn">↑ 5</span> este bimestre</div>
      </div>
      <div class="stat-card info">
        <div class="stat-label">Programas Sociais</div>
        <div class="stat-value">3</div>
        <div class="stat-delta">612 alunos beneficiados</div>
      </div>
      <div class="stat-card cyan">
        <div class="stat-label">Frequência Média</div>
        <div class="stat-value">82%</div>
        <div class="stat-delta"><span class="up">↑ 1.2%</span> esta semana</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Média de Notas</div>
        <div class="stat-value">6.4</div>
        <div class="stat-delta">Bimestre atual</div>
      </div>
    </div>

    <div class="grid-3">
      <div class="card">
        <div class="card-title">Frequência por Turma (%) <a href="#">Ver todos</a></div>
        <div class="chart-bars">
          ${[['6A', 92], [' 7A', 78], [' 8A', 85], [' 9A', 65], [' 6B', 88], [' 7B', 72], [' 8B', 80]].map(([l, v]) => `
            <div class="bar-wrap">
              <div class="bar ${v < 70 ? 'danger' : v < 80 ? 'warn' : ''}" style="height:${v}%"></div>
              <span class="bar-label">${l}</span>
            </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-title">Situação dos Alunos</div>
        <div class="donut-wrap">
          <svg class="donut-svg" width="100" height="100" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--surface2)" stroke-width="4"/>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--accent)" stroke-width="4" stroke-dasharray="72 28" stroke-dashoffset="25" transform="rotate(-90 18 18)"/>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--warn)" stroke-width="4" stroke-dasharray="18 82" stroke-dashoffset="-47" transform="rotate(-90 18 18)"/>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--danger)" stroke-width="4" stroke-dasharray="10 90" stroke-dashoffset="-65" transform="rotate(-90 18 18)"/>
          </svg>
          <div class="donut-legend">
            <div class="legend-item"><div class="legend-dot" style="background:var(--accent)"></div> Regular (72%)</div>
            <div class="legend-item"><div class="legend-dot" style="background:var(--warn)"></div> Em risco (18%)</div>
            <div class="legend-item"><div class="legend-dot" style="background:var(--danger)"></div> Evadido (10%)</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">Alertas Recentes — Risco Alto</div>
        <div class="alert-list">
          <div class="alert-row">
            <div>
              <div class="alert-name">Diego Oliveira Paz</div>
              <div class="alert-detail">8º Ano · Frequência: 45%</div>
            </div>
            <div class="alert-badge">Crítico</div>
          </div>
          <div class="alert-row warn">
            <div>
              <div class="alert-name">Bruno Ferreira Lima</div>
              <div class="alert-detail">7º Ano · Nota média: 5.0</div>
            </div>
            <div class="alert-badge warn">Atenção</div>
          </div>
          <div class="alert-row warn">
            <div>
              <div class="alert-name">Família Lima (id 2)</div>
              <div class="alert-detail">Renda familiar: R$ 600,00</div>
            </div>
            <div class="alert-badge warn">Social</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Atendimentos Sociais — Recentes</div>
        <div class="alert-list">
          ${mockData.atendimento_social.map(a => `
            <div class="alert-row info" style="border-color:var(--info)">
              <div>
                <div class="alert-name">${a.familia}</div>
                <div class="alert-detail">${a.tipo_atendimento} · ${a.data_atendimento} · ${a.profissional}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>
  `;
});

/* ─── ESCOLA ──────────────────────────────────────────────── */
registerPage('escola', async (c) => {
  const rows = await API.get('escola');
  function escolaForm(rec = {}) {
    return `<div class="form-grid">
      <div class="form-group form-full"><label class="form-label">Nome da Escola *</label><input class="form-control" id="f_nome" value="${rec.nome || ''}"/></div>
      <div class="form-group"><label class="form-label">Tipo</label>
        <select class="form-control" id="f_tipo">
          ${['Municipal', 'Estadual', 'Federal', 'Privada'].map(t => `<option ${rec.tipo === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label class="form-label">Telefone</label><input class="form-control" id="f_tel" value="${rec.telefone || ''}"/></div>
      <div class="form-group form-full"><label class="form-label">Endereço</label><input class="form-control" id="f_end" value="${rec.endereco || ''}"/></div>
      <div class="form-group"><label class="form-label">Bairro</label><input class="form-control" id="f_bairro" value="${rec.bairro || ''}"/></div>
      <div class="form-group"><label class="form-label">Cidade</label><input class="form-control" id="f_cidade" value="${rec.cidade || 'Juazeiro do Norte'}"/></div>
    </div>`;
  }
  buildTablePage(c, {
    title: 'Escolas', subtitle: 'Instituições de ensino cadastradas no sistema.',
    cols: [
      { key: 'id_escola', label: 'ID' },
      { key: 'nome', label: 'Nome' },
      { key: 'tipo', label: 'Tipo', render: r => `<span class="chip chip-blue">${r.tipo}</span>` },
      { key: 'bairro', label: 'Bairro' },
      { key: 'cidade', label: 'Cidade' },
      { key: 'telefone', label: 'Telefone' },
    ],
    rows,

    onNew: () => openModal('Nova Escola', escolaForm(), async () => {
      // Captura todos os campos do modal
      const payload = {
        nome: document.getElementById('f_nome').value,
        tipo: document.getElementById('f_tipo').value,
        telefone: document.getElementById('f_tel').value,
        endereco: document.getElementById('f_end').value,
        bairro: document.getElementById('f_bairro').value,
        cidade: document.getElementById('f_cidade').value,
        risco_total: 0
      };

      if (!payload.nome) { toast('Nome obrigatório.', 'error'); return false; }

      await API.post('escola', payload);
      navigate('escola'); // Recarrega a página para mostrar o dado novo
      return true;
    }),

    onEdit: rec => openModal('Editar Escola', escolaForm(rec), async () => {
      const payload = {
        nome: document.getElementById('f_nome').value,
        tipo: document.getElementById('f_tipo').value,
        telefone: document.getElementById('f_tel').value,
        endereco: document.getElementById('f_end').value,
        bairro: document.getElementById('f_bairro').value,
        cidade: document.getElementById('f_cidade').value,
        risco_total: rec.risco_total || 0
      };

      await API.put('escola', rec.id_escola, payload);
      navigate('escola'); // Recarrega a página
      return true;
    }),

    // onNew: () => openModal('Nova Escola', escolaForm(), () => {
    //   const nome = document.getElementById('f_nome').value;
    //   if (!nome) { toast('Nome obrigatório.','error'); return false; }
    //   API.post('escola', { nome, tipo: document.getElementById('f_tipo').value });
    //   return true;
    // }),
    // onEdit: rec => openModal('Editar Escola', escolaForm(rec), () => {
    //   API.put('escola', rec.id_escola, {});
    //   return true;
    // }),
    onDelete: id => API.del('escola', id),
  });
});

/* ─── TURMA ───────────────────────────────────────────────── */
registerPage('turma', async (c) => {
  const rows = await API.get('turma');
  const escolas = await API.get('escola');
  function turmaForm(rec = {}, escolas = []) {
    // Criamos as opções do Select baseadas nas escolas vindas do banco
    const opcoesEscolas = escolas.map(esc =>
      `<option value="${esc.id_escola}" ${rec.id_escola == esc.id_escola ? 'selected' : ''}>
      ${esc.nome}
    </option>`
    ).join('');

    return `
    <div class="form-grid">
      <div class="form-group form-full">
        <label class="form-label">Nome da Turma *</label>
        <input class="form-control" id="f_nome" value="${rec.nome || ''}" placeholder="Ex: 9º Ano A" />
      </div>
      <div class="form-group">
        <label class="form-label">Escola</label>
        <select class="form-control" id="f_escola">
          <option value="">Selecione uma escola...</option>
          ${opcoesEscolas}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Período</label>
        <select class="form-control" id="f_periodo">
          ${['Manhã', 'Tarde', 'Noite', 'Integral'].map(p =>
      `<option ${rec.periodo === p ? 'selected' : ''}>${p}</option>`
    ).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Ano Letivo</label>
        <input class="form-control" type="number" id="f_ano" value="${rec.ano || new Date().getFullYear()}" />
      </div>
    </div>`;
  }
  buildTablePage(c, {
    title: 'Turmas',
    subtitle: 'Gerenciamento de turmas e períodos.',
    cols: [
      { key: 'id_turma', label: 'ID' },
      { key: 'nome', label: 'Turma' },
      { key: 'periodo', label: 'Período' },
      { key: 'ano', label: 'Ano' },
      { key: 'id_escola', label: 'ID Escola' } // Depois podemos trocar para o nome da escola
    ],
    rows,
    onNew: () => openModal('Nova Turma', turmaForm({}, escolas), async () => {
      const payload = {
        nome: document.getElementById('f_nome').value,
        id_escola: document.getElementById('f_escola').value,
        periodo: document.getElementById('f_periodo').value,
        ano: document.getElementById('f_ano').value
      };

      if (!payload.nome || !payload.id_escola) {
        toast('Nome e Escola são obrigatórios!', 'error');
        return false;
      }

      await API.post('turma', payload);
      navigate('turma');
      return true;
    }),
    onEdit: (rec) => openModal('Editar Turma', turmaForm(rec, escolas), async () => {
      const payload = {
        nome: document.getElementById('f_nome').value,
        id_escola: document.getElementById('f_escola').value,
        periodo: document.getElementById('f_periodo').value,
        ano: document.getElementById('f_ano').value
      };

      await API.put('turma', rec.id_turma, payload);
      navigate('turma');
      return true;
    }),
    onDelete: id => API.del('turma', id)
  });
});

/* ─── ALUNO ───────────────────────────────────────────────── */
registerPage('aluno', async (c) => {
  const rows = await API.get('aluno');
  const situacaoChip = { 'Regular': 'chip-green', 'Em risco': 'chip-yellow', 'Evadido': 'chip-red' };
  function alunoForm(rec = {}) {
    return `<div class="form-grid">
      <div class="form-group form-full"><label class="form-label">Nome Completo *</label><input class="form-control" id="f_nome" value="${rec.nome || ''}"/></div>
      <div class="form-group"><label class="form-label">Data de Nascimento *</label><input class="form-control" id="f_nasc" type="date" value="${rec.data_nascimento || ''}"/></div>
      <div class="form-group"><label class="form-label">Sexo</label>
        <select class="form-control" id="f_sexo">
          <option value="M" ${rec.sexo === 'M' ? 'selected' : ''}>Masculino</option>
          <option value="F" ${rec.sexo === 'F' ? 'selected' : ''}>Feminino</option>
          <option value="O" ${rec.sexo === 'O' ? 'selected' : ''}>Outro</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">CPF</label><input class="form-control" id="f_cpf" placeholder="___.___.___-__" value="${rec.cpf || ''}"/></div>
      <div class="form-group"><label class="form-label">Situação Escolar</label>
        <select class="form-control" id="f_sit">
          ${['Regular', 'Em risco', 'Evadido'].map(s => `<option ${rec.situacao_escolar === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label class="form-label">Família (id)</label>
        <select class="form-control" id="f_fam">
          ${mockData.familia.map(f => `<option value="${f.id_familia}" ${rec.id_familia === f.id_familia ? 'selected' : ''}>Família #${f.id_familia} — ${f.bairro}</option>`).join('')}
        </select>
      </div>
    </div>`;
  }
  buildTablePage(c, {
    title: 'Alunos', subtitle: 'Cadastro de estudantes.',
    cols: [
      { key: 'id_aluno', label: 'ID' },
      { key: 'nome', label: 'Nome' },
      { key: 'data_nascimento', label: 'Nascimento' },
      { key: 'sexo', label: 'Sexo' },
      { key: 'situacao_escolar', label: 'Situação', render: r => `<span class="chip ${situacaoChip[r.situacao_escolar] || 'chip-blue'}">${r.situacao_escolar}</span>` },
    ],
    rows,

    onNew: () => openModal('Novo Aluno', alunoForm(), async () => {
      const payload = {
        nome: document.getElementById('f_nome').value,
        data_nascimento: document.getElementById('f_nasc').value,
        sexo: document.getElementById('f_sexo').value,
        cpf: document.getElementById('f_cpf').value,
        situacao_escolar: document.getElementById('f_sit').value,
        id_familia: document.getElementById('f_fam').value
      };

      if (!payload.nome) { toast('Nome obrigatório!', 'error'); return false; }

      await API.post('aluno', payload);
      navigate('aluno'); // Recarrega a lista
      return true;
    }),

    onEdit: rec => openModal('Editar Aluno', alunoForm(rec), async () => {
      const payload = {
        nome: document.getElementById('f_nome').value,
        data_nascimento: document.getElementById('f_nasc').value,
        sexo: document.getElementById('f_sexo').value,
        cpf: document.getElementById('f_cpf').value,
        situacao_escolar: document.getElementById('f_sit').value,
        id_familia: document.getElementById('f_fam').value
      };

      await API.put('aluno', rec.id_aluno, payload);
      navigate('aluno');
      return true;
    }),
    onDelete: id => API.del('aluno', id),
  });
});

/* ─── FAMÍLIA ─────────────────────────────────────────────── */
registerPage('familia', async (c) => {
  const rows = await API.get('familia');
  function familiaForm(rec = {}) {
    return `<div class="form-grid">
      <div class="form-group"><label class="form-label">Renda Familiar</label><input class="form-control" id="f_renda" placeholder="R$ 0,00" value="${rec.renda_familiar || ''}"/></div>
      <div class="form-group"><label class="form-label">Telefone</label><input class="form-control" id="f_tel" value="${rec.telefone || ''}"/></div>
      <div class="form-group form-full"><label class="form-label">Endereço</label><input class="form-control" id="f_end" value="${rec.endereco || ''}"/></div>
      <div class="form-group"><label class="form-label">Bairro</label><input class="form-control" id="f_bairro" value="${rec.bairro || ''}"/></div>
      <div class="form-group"><label class="form-label">Cidade</label><input class="form-control" id="f_cidade" value="${rec.cidade || 'Juazeiro do Norte'}"/></div>
    </div>`;
  }
  buildTablePage(c, {
    title: 'Famílias', subtitle: 'Cadastro de núcleos familiares.',
    cols: [
      { key: 'id_familia', label: 'ID' },
      { key: 'renda_familiar', label: 'Renda' },
      { key: 'bairro', label: 'Bairro' },
      { key: 'cidade', label: 'Cidade' },
      { key: 'telefone', label: 'Telefone' },
    ],
    rows,

    onNew: () => openModal('Nova Família', familiaForm(), async () => {
      const payload = {
        renda_familiar: document.getElementById('f_renda').value,
        telefone: document.getElementById('f_tel').value,
        endereco: document.getElementById('f_end').value,
        bairro: document.getElementById('f_bairro').value,
        cidade: document.getElementById('f_cidade').value
      };

      // Validação simples (opcional)
      if (!payload.renda_familiar) { toast('Informe a renda.', 'warn'); }

      await API.post('familia', payload);
      navigate('familia'); // Recarrega a tabela
      return true;
    }),

    onEdit: rec => openModal('Editar Família', familiaForm(rec), async () => {
      const payload = {
        renda_familiar: document.getElementById('f_renda').value,
        telefone: document.getElementById('f_tel').value,
        endereco: document.getElementById('f_end').value,
        bairro: document.getElementById('f_bairro').value,
        cidade: document.getElementById('f_cidade').value
      };

      await API.put('familia', rec.id_familia, payload);
      navigate('familia');
      return true;
    }),
    onDelete: id => API.del('familia', id),
  });
});

/* ─── FREQUÊNCIA ──────────────────────────────────────────── */
// Adicione ou atualize a página de frequência no app.js
registerPage('frequencia', async (c) => {
  const rows = await API.get('frequencia');
  const alunos = await API.get('aluno');

  buildTablePage(c, {
    title: 'Frequência Escolar',
    subtitle: 'Registo diário de presença dos alunos.',
    cols: [
      { key: 'id_frequencia', label: 'ID' },
      { key: 'nome_aluno', label: 'Aluno' },
      { key: 'data', label: 'Data' },
      {
        key: 'presenca',
        label: 'Status',
        render: r => r.presenca == 1
          ? `<span class="chip chip-green">Presente</span>`
          : `<span class="chip chip-danger">Falta</span>`
      }
    ],
    rows,
    onNew: () => openModal('Registar Presença/Falta', frequenciaForm({}, alunos), async () => {
      const payload = {
        id_aluno: document.getElementById('f_aluno').value,
        data: document.getElementById('f_data').value,
        presenca: document.getElementById('f_presenca').value // 1 ou 0
      };

      if (!payload.id_aluno) { toast('Selecione um aluno!', 'error'); return false; }

      await API.post('frequencia', payload);
      navigate('frequencia');
      return true;
    }),
    onEdit: (rec) => openModal('Editar Registro', frequenciaForm(rec, alunos), async () => {
      const payload = { id_aluno: document.getElementById('f_aluno').value, data: document.getElementById('f_data').value, presenca: document.getElementById('f_presenca').value };
      await API.put('frequencia', rec.id_frequencia, payload);
      navigate('frequencia');
      return true;
    }),
    onDelete: id => API.del('frequencia', id)
  });
});

function frequenciaForm(rec = {}, alunos = []) {
  return `
    <div class="form-grid">
      <div class="form-group form-full">
        <label class="form-label">Aluno</label>
        <select class="form-control" id="f_aluno">
          ${alunos.map(a => `<option value="${a.id_aluno}">${a.nome}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Data</label>
        <input class="form-control" type="date" id="f_data" value="${new Date().toISOString().split('T')[0]}">
      </div>
      <div class="form-group">
        <label class="form-label">Presença</label>
        <select class="form-control" id="f_presenca">
          <option value="1">Presente</option>
          <option value="0">Falta</option>
        </select>
      </div>
    </div>
  `;
}

/* ─── AVALIAÇÃO ───────────────────────────────────────────── */
registerPage('avaliacao', async (c) => {
  const rows = await API.get('avaliacao');
  const alunos = await API.get('aluno');

  buildTablePage(c, {
    title: 'Avaliações e Notas',
    subtitle: 'Registo de desempenho académico por disciplina.',
    cols: [
      { key: 'id_avaliacao', label: 'ID' },
      { key: 'nome_aluno', label: 'Aluno' },
      { key: 'disciplina', label: 'Disciplina' },
      { key: 'nota', label: 'Nota' },
      { key: 'bimestre', label: 'Bimestre' }
    ],
    rows,
    onNew: () => openModal('Lançar Nota', avaliacaoForm({}, alunos), async () => {
      const payload = {
        id_aluno: document.getElementById('f_aluno').value,
        disciplina: document.getElementById('f_disc').value,
        nota: document.getElementById('f_nota').value,
        bimestre: document.getElementById('f_bim').value,
        data_avaliacao: new Date().toISOString().split('T')[0]
      };

      if (!payload.id_aluno || !payload.nota) {
        toast('Aluno e Nota são obrigatórios!', 'error');
        return false;
      }

      await API.post('avaliacao', payload);
      navigate('avaliacao');
      return true;
    }),
    onEdit: (rec) => openModal('Editar Nota', avaliacaoForm(rec, alunos), async () => {
      const payload = { id_aluno: document.getElementById('f_aluno').value, disciplina: document.getElementById('f_disc').value, nota: document.getElementById('f_nota').value, bimestre: document.getElementById('f_bim').value };
      await API.put('avaliacao', rec.id_avaliacao, payload);
      navigate('avaliacao'); return true;
    }),
    onDelete: id => API.del('avaliacao', id)
  });
});

function avaliacaoForm(rec = {}, alunos = []) {
  return `
    <div class="form-grid">
      <div class="form-group form-full">
        <label class="form-label">Aluno</label>
        <select class="form-control" id="f_aluno">
          ${alunos.map(a => `<option value="${a.id_aluno}">${a.nome}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Disciplina</label>
        <input class="form-control" id="f_disc" placeholder="Ex: Matemática" value="${rec.disciplina || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Nota</label>
        <input class="form-control" type="number" step="0.1" id="f_nota" value="${rec.nota || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Bimestre</label>
        <select class="form-control" id="f_bim">
          <option>1º Bimestre</option>
          <option>2º Bimestre</option>
          <option>3º Bimestre</option>
          <option>4º Bimestre</option>
        </select>
      </div>
    </div>
  `;
}

/* ─── MATRÍCULA ───────────────────────────────────────────── */
registerPage('matricula', async (c) => {
  const rows = await API.get('matricula');
  const alunos = await API.get('aluno');
  const turmas = await API.get('turma');

  buildTablePage(c, {
    title: 'Matrículas',
    subtitle: 'Vínculo de alunos às turmas e anos letivos.',
    cols: [
      { key: 'id_matricula', label: 'ID' },
      { key: 'nome_aluno', label: 'Aluno' },
      { key: 'nome_turma', label: 'Turma' },
      { key: 'data_matricula', label: 'Data' },
      { key: 'status', label: 'Status' }
    ],
    rows,
    onNew: () => openModal('Nova Matrícula', matriculaForm({}, alunos, turmas), async () => {
      const payload = {
        id_aluno: document.getElementById('f_aluno').value,
        id_turma: document.getElementById('f_turma').value,
        data_matricula: document.getElementById('f_data').value,
        status: document.getElementById('f_status').value
      };

      if (!payload.id_aluno || !payload.id_turma) {
        toast('Aluno e Turma são obrigatórios!', 'error');
        return false;
      }

      await API.post('matricula', payload);
      navigate('matricula');
      return true;
    }),
    onEdit: (rec) => openModal('Editar Matrícula', matriculaForm(rec, alunos, turmas), async () => {
      const payload = { id_aluno: document.getElementById('f_aluno').value, id_turma: document.getElementById('f_turma').value, data_matricula: document.getElementById('f_data').value, status: document.getElementById('f_status').value };
      await API.put('matricula', rec.id_matricula, payload);
      navigate('matricula'); return true;
    }),
    onDelete: id => API.del('matricula', id)
  });
});

function matriculaForm(rec = {}, alunos = [], turmas = []) {
  return `
    <div class="form-grid">
      <div class="form-group form-full">
        <label class="form-label">Aluno</label>
        <select class="form-control" id="f_aluno">
          <option value="">Selecione o aluno...</option>
          ${alunos.map(a => `<option value="${a.id_aluno}">${a.nome}</option>`).join('')}
        </select>
      </div>
      <div class="form-group form-full">
        <label class="form-label">Turma</label>
        <select class="form-control" id="f_turma">
          <option value="">Selecione a turma...</option>
          ${turmas.map(t => `<option value="${t.id_turma}">${t.nome}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Data da Matrícula</label>
        <input class="form-control" type="date" id="f_data" value="${new Date().toISOString().split('T')[0]}">
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-control" id="f_status">
          <option>Ativo</option>
          <option>Transferido</option>
          <option>Desistente</option>
        </select>
      </div>
    </div>
  `;
}

/* ─── PROGRAMA SOCIAL ─────────────────────────────────────── */
registerPage('programa_social', async (c) => {
  const rows = await API.get('programa_social');
  const familias = await API.get('familia');

  buildTablePage(c, {
    title: 'Programas Sociais',
    subtitle: 'Gestão de benefícios e auxílios governamentais.',
    cols: [
      { key: 'id_programa', label: 'ID' },
      { key: 'id_familia', label: 'ID Família' },
      { key: 'nome_programa', label: 'Programa' },
      { key: 'valor_beneficio', label: 'Valor (R$)' },
      { key: 'data_adesao', label: 'Data de Adesão' }
    ],
    rows,
    onNew: () => openModal('Registar Benefício', programaForm({}, familias), async () => {
      const payload = {
        id_familia: document.getElementById('f_familia').value,
        nome_programa: document.getElementById('f_nome').value,
        valor_beneficio: document.getElementById('f_valor').value,
        data_adesao: document.getElementById('f_data').value
      };

      if (!payload.id_familia || !payload.nome_programa) {
        toast('Família e Nome do Programa são obrigatórios!', 'error');
        return false;
      }

      await API.post('programa_social', payload);
      navigate('programa_social');
      return true;
    }),
    onDelete: id => API.del('programa_social', id)
  });
});

function programaForm(rec={}, familias=[]) {
  return `
    <div class="form-grid">
      <div class="form-group form-full">
        <label class="form-label">Família (ID / Responsável)</label>
        <select class="form-control" id="f_familia">
          <option value="">Selecione a família...</option>
          ${familias.map(f => `<option value="${f.id_familia}">Família #${f.id_familia} - Bairro: ${f.bairro}</option>`).join('')}
        </select>
      </div>
      <div class="form-group form-full">
        <label class="form-label">Nome do Programa</label>
        <input class="form-control" id="f_nome" placeholder="Ex: Bolsa Família" value="${rec.nome_programa||''}">
      </div>
      <div class="form-group">
        <label class="form-label">Valor Mensal</label>
        <input class="form-control" type="number" step="0.01" id="f_valor" value="${rec.valor_beneficio||''}">
      </div>
      <div class="form-group">
        <label class="form-label">Data de Adesão</label>
        <input class="form-control" type="date" id="f_data" value="${rec.data_adesao||new Date().toISOString().split('T')[0]}">
      </div>
    </div>
  `;
}

/* ─── ATENDIMENTO SOCIAL ──────────────────────────────────── */
registerPage('atendimento_social', async (c) => {
  const rows = await API.get('atendimento_social');
  const alunos = await API.get('aluno');

  buildTablePage(c, {
    title: 'Atendimento Social',
    subtitle: 'Registo de intervenções, visitas e acompanhamento técnico.',
    cols: [
      { key: 'id_atendimento', label: 'ID' },
      { key: 'nome_aluno', label: 'Aluno' },
      { key: 'data_atendimento', label: 'Data' },
      { key: 'assunto', label: 'Assunto' },
      { key: 'tecnico_responsavel', label: 'Técnico' }
    ],
    rows,
    onNew: () => openModal('Novo Atendimento', atendimentoForm({}, alunos), async () => {
      const payload = {
        id_aluno: document.getElementById('f_aluno').value,
        data_atendimento: document.getElementById('f_data').value,
        tecnico_responsavel: document.getElementById('f_tecnico').value,
        assunto: document.getElementById('f_assunto').value,
        parecer_tecnico: document.getElementById('f_parecer').value,
        proximos_passos: document.getElementById('f_passos').value
      };

      if (!payload.id_aluno || !payload.assunto) {
        toast('Aluno e Assunto são obrigatórios!', 'error');
        return false;
      }

      await API.post('atendimento_social', payload);
      navigate('atendimento_social');
      return true;
    }),
    onDelete: id => API.del('atendimento_social', id)
  });
});

function atendimentoForm(rec={}, alunos=[]) {
  return `
    <div class="form-grid">
      <div class="form-group form-full">
        <label class="form-label">Aluno</label>
        <select class="form-control" id="f_aluno">
          <option value="">Selecione o aluno...</option>
          ${alunos.map(a => `<option value="${a.id_aluno}">${a.nome}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Data</label>
        <input class="form-control" type="date" id="f_data" value="${new Date().toISOString().split('T')[0]}">
      </div>
      <div class="form-group">
        <label class="form-label">Técnico Responsável</label>
        <input class="form-control" id="f_tecnico" placeholder="Nome do técnico" value="${rec.tecnico_responsavel||''}">
      </div>
      <div class="form-group form-full">
        <label class="form-label">Assunto Principal</label>
        <input class="form-control" id="f_assunto" placeholder="Ex: Mediação familiar" value="${rec.assunto||''}">
      </div>
      <div class="form-group form-full">
        <label class="form-label">Parecer Técnico</label>
        <textarea class="form-control" id="f_parecer" rows="3">${rec.parecer_tecnico||''}</textarea>
      </div>
      <div class="form-group form-full">
        <label class="form-label">Próximos Passos</label>
        <textarea class="form-control" id="f_passos" rows="2">${rec.proximos_passos||''}</textarea>
      </div>
    </div>
  `;
}

/* ─── RISCO DE EVASÃO ─────────────────────────────────────── */
registerPage('risco', async (c) => {
  // 1. Busca os dados reais calculados pela VIEW no SQLite
  const riskData = await API.get('evasao'); 
  let currentFilter = 'all';

  function render() {
    const filtered = riskData.filter(r => {
      const s = r.score || 0;
      if (currentFilter === 'alto') return s >= 70;
      if (currentFilter === 'medio') return s >= 40 && s < 70;
      if (currentFilter === 'baixo') return s < 40;
      return true;
    }).sort((a, b) => (b.score || 0) - (a.score || 0));

    const list = document.getElementById('riskList');
    if (!list) return;

    list.innerHTML = filtered.map(r => {
      // Definições de estilo baseadas nos valores reais
      const sc = r.score >= 70 ? 'high' : r.score >= 40 ? 'med' : 'low';
      const initials = r.nome ? r.nome.split(' ').slice(0, 2).map(n => n[0]).join('') : '??';
      
      // Lógica de cores das barras (mesma do seu design original)
      const freqClass = r.freq < 75 ? 'critical' : r.freq < 90 ? 'low' : '';
      const notaClass = r.nota < 5 ? 'critical' : r.nota < 7 ? 'low' : '';
      const socialClass = r.social > 0 ? '' : 'critical'; // Sem auxílio = Crítico

      return `
        <div class="risk-card">
          <div class="risk-avatar">${initials}</div>
          <div class="risk-info">
            <div class="risk-name">${r.nome}</div>
            <div class="risk-meta">${r.turma || 'Sem Turma'} · ${r.escola || 'EduGuarda'}</div>
          </div>
          <div class="risk-bars">
            <div class="risk-bar-row">
              <span style="width:52px">Frequência</span>
              <div class="risk-bar-track">
                <div class="risk-bar-fill ${freqClass}" style="width:${r.freq || 0}%"></div>
              </div>
              <span>${r.freq || 0}%</span>
            </div>
            <div class="risk-bar-row">
              <span style="width:52px">Nota</span>
              <div class="risk-bar-track">
                <div class="risk-bar-fill ${notaClass}" style="width:${(r.nota || 0) * 10}%"></div>
              </div>
              <span>${Number(r.nota || 0).toFixed(1)}</span>
            </div>
            <div class="risk-bar-row">
              <span style="width:52px">Social</span>
              <div class="risk-bar-track">
                <div class="risk-bar-fill ${socialClass}" style="width:${r.social > 0 ? 20 : 90}%"></div>
              </div>
              <span>${r.social > 0 ? 'Protegido' : 'Vulnerável'}</span>
            </div>
          </div>
          <div class="risk-score ${sc}">${r.score || 0}</div>
        </div>`;
    }).join('') || `<div style="text-align:center;padding:32px;color:var(--text-muted)">Nenhum aluno identificado.</div>`;
  }

  // Estrutura principal da página (Mantendo seu Título e Filtros originais)
  c.innerHTML = `
    <div class="page-title">Risco de Evasão</div>
    <div class="page-subtitle">Score calculado com base em frequência, notas e contexto social. (0-100)</div>
    
    <div class="risk-filters">
      <button class="filter-btn active" data-f="all">Todos (${riskData.length})</button>
      <button class="filter-btn danger" data-f="alto">Risco Alto ≥70</button>
      <button class="filter-btn warn" data-f="medio">Risco Médio 40-69</button>
      <button class="filter-btn ok" data-f="baixo">Baixo Risco <40</button>
    </div>
    
    <div id="riskList"></div>
  `;

  render();

  // Listeners dos botões (sem quebrar o estilo)
  c.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      c.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.f;
      render();
    });
  });
});

/* ─── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Nav clicks
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); navigate(el.dataset.page); });
  });

  // Modal close
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Mobile menu
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Start on dashboard
  navigate('dashboard');
});
