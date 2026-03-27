# 🎓 EduGuarda — Sistema de Proteção à Trajetória Escolar

> **Questão de Pesquisa:** Como um sistema pode reduzir a evasão escolar ao integrar dados de frequência, aprendizagem e assistência social do município?

Trabalho Prático 2 — Disciplina de Banco de Dados  
Curso de Bacharelado em Ciência da Computação — UFCA

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Pré-requisitos](#pré-requisitos)
- [Como Executar](#como-executar)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Banco de Dados](#banco-de-dados)
- [API REST — Endpoints](#api-rest--endpoints)
- [Interface Web](#interface-web)
- [Fluxo de Dados](#fluxo-de-dados)

---

## Sobre o Projeto

O **EduGuarda** é um sistema de monitoramento de trajetórias escolares desenvolvido para auxiliar gestores municipais de educação na identificação precoce de estudantes em risco de evasão. O sistema integra três dimensões de dados:

- **Frequência** — presença diária nas aulas
- **Aprendizagem** — notas por disciplina e bimestre
- **Assistência Social** — vínculo com programas sociais e atendimentos à família

A partir desses três eixos, o sistema calcula um **score de risco de evasão** para cada aluno, permitindo intervenções prioritárias e direcionadas.

---

## Estrutura do Repositório

```
EduGuarda - EvasaoEscolar/
│
├── server.py               # API REST (Flask + SQLite)
├── sistema.db              # Banco de dados SQLite
├── escola.sql              # Scripts SQL auxiliares
│
├── EvasaoEscolar/          # Frontend (interface web)
│   ├── index.html          # Página principal (SPA)
│   ├── style.css           # Estilos da interface
│   └── app.js              # Lógica client-side e comunicação com API
│
└── venv/                   # Ambiente virtual Python (não versionar*)
```

> ⚠️ **Atenção:** A pasta `venv/` não deve ser versionada. Adicione-a ao `.gitignore`.

---

## Pré-requisitos

- **Python 3.10+** instalado e disponível no PATH
- **pip** (gerenciador de pacotes Python)
- Navegador moderno (Chrome, Firefox, Edge)
- Não é necessário servidor web externo — o próprio Flask serve a API

---

## Como Executar

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd "EduGuarda - EvasaoEscolar"
```

### 2. Crie e ative o ambiente virtual

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux / macOS
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install flask flask-cors
```

### 4. Inicie o servidor

```bash
python server.py
```

Você verá uma saída semelhante a:

```
 * Running on http://127.0.0.1:3000
 * Debug mode: on
```

> O servidor ficará rodando em **http://localhost:3000**. Mantenha este terminal aberto.

### 5. Abra a interface web

Abra o arquivo `EvasaoEscolar/index.html` diretamente no navegador — basta dar duplo clique no arquivo ou arrastá-lo para a janela do navegador.

```
EvasaoEscolar/index.html  →  abrir no navegador
```

A interface se conectará automaticamente à API em `http://localhost:3000`.

> ℹ️ **Ordem obrigatória:** Sempre inicialize o `server.py` **antes** de abrir o `index.html`. Caso contrário, a interface não conseguirá buscar dados reais e exibirá dados de demonstração.

---

## Arquitetura do Sistema

O EduGuarda segue uma arquitetura cliente-servidor local simples, composta por duas camadas:

```
┌─────────────────────────────┐
│        NAVEGADOR            │
│                             │
│  index.html + style.css     │
│  app.js (SPA client-side)   │
│                             │
│  fetch() → localhost:3000   │
└────────────┬────────────────┘
             │ HTTP / JSON
             ▼
┌─────────────────────────────┐
│    SERVIDOR (server.py)     │
│                             │
│  Flask 3.x + Flask-CORS     │
│  API REST → /api/<recurso>  │
│                             │
└────────────┬────────────────┘
             │ sqlite3
             ▼
┌─────────────────────────────┐
│    BANCO (sistema.db)       │
│                             │
│  SQLite 3 — arquivo local   │
│  10 tabelas + 1 view        │
│                             │
└─────────────────────────────┘
```

**Tecnologias utilizadas:**

| Camada | Tecnologia |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend | Python 3, Flask 3.x, Flask-CORS |
| Banco de Dados | SQLite 3 |
| Comunicação | REST API / JSON |

---

## Banco de Dados

O banco `sistema.db` é um arquivo SQLite contendo o modelo relacional completo do projeto.

### Diagrama de Entidades (resumo)

```
ESCOLA (1) ──── (N) TURMA (1) ──── (N) MATRICULA (N) ──── (1) ALUNO
                                                                  │
                        ┌─────────────────────────────────────────┤
                        │                           │             │
                   FREQUENCIA               AVALIACAO      ATENDIMENTO_SOCIAL
                                                          (via id_aluno)
FAMILIA (1) ──── (N) ALUNO
    │
    └──── (N) PROGRAMA_SOCIAL

ALUNO (N) ──── (M) PROGRAMA_SOCIAL  (tabela: ALUNO_PROGRAMA_SOCIAL)
```

### Tabelas

| Tabela | Descrição | Chave Primária |
|---|---|---|
| `escola` | Instituições de ensino | `id_escola` |
| `turma` | Turmas por escola e ano | `id_turma` |
| `aluno` | Cadastro de estudantes | `id_aluno` |
| `familia` | Núcleos familiares | `id_familia` |
| `matricula` | Vínculo aluno × turma | `id_matricula` |
| `frequencia` | Registro de presença por aula | `id_frequencia` |
| `avaliacao` | Notas por disciplina e bimestre | `id_avaliacao` |
| `programa_social` | Programas de benefício vinculados às famílias | `id_programa` |
| `atendimento_social` | Registros de atendimento ao aluno | `id_atendimento` |
| `aluno_programa_social` | Relacionamento N:M aluno × programa | composta |

### View de Risco

```sql
-- v_risco_evasao
-- Calcula o score de risco de evasão combinando frequência, nota e assistência social.
-- Consumida pelo endpoint /api/evasao
```

---

## API REST — Endpoints

Todos os endpoints retornam e recebem JSON. A base é `http://localhost:3000/api`.

### Escolas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/escola` | Lista todas as escolas |
| POST | `/api/escola` | Cadastra nova escola |
| PUT | `/api/escola/<id>` | Atualiza escola existente |
| DELETE | `/api/escola/<id>` | Remove escola |

**Corpo esperado (POST / PUT):**
```json
{
  "nome": "E.M. João XXIII",
  "tipo": "Municipal",
  "endereco": "Rua das Flores, 120",
  "bairro": "Centro",
  "cidade": "Juazeiro do Norte",
  "telefone": "(88) 3512-1111",
  "risco_total": 0
}
```

### Alunos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/aluno` | Lista todos os alunos |
| POST | `/api/aluno` | Cadastra novo aluno |
| PUT | `/api/aluno/<id>` | Atualiza aluno |
| DELETE | `/api/aluno/<id>` | Remove aluno |

**Corpo esperado (POST / PUT):**
```json
{
  "nome": "Ana Clara Souza",
  "data_nascimento": "2012-03-10",
  "sexo": "F",
  "situacao_escolar": "Regular",
  "cpf": "000.000.000-00",
  "id_familia": 1
}
```

### Famílias

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/familia` | Lista todas as famílias |
| POST | `/api/familia` | Cadastra nova família |
| PUT | `/api/familia/<id>` | Atualiza família |
| DELETE | `/api/familia/<id>` | Remove família |

### Turmas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/turma` | Lista todas as turmas |
| POST | `/api/turma` | Cadastra nova turma |
| PUT | `/api/turma/<id>` | Atualiza turma |
| DELETE | `/api/turma/<id>` | Remove turma |

### Frequência

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/frequencia` | Lista presenças (com JOIN aluno) |
| POST | `/api/frequencia` | Registra presença |
| PUT | `/api/frequencia/<id>` | Atualiza registro |
| DELETE | `/api/frequencia/<id>` | Remove registro |

**Corpo esperado (POST):**
```json
{
  "id_aluno": 1,
  "data": "2025-03-10",
  "presenca": true
}
```

### Avaliações

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/avaliacao` | Lista notas (com JOIN aluno) |
| POST | `/api/avaliacao` | Registra avaliação |
| PUT | `/api/avaliacao/<id>` | Atualiza nota |
| DELETE | `/api/avaliacao/<id>` | Remove avaliação |

### Matrículas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/matricula` | Lista matrículas (com JOIN aluno + turma) |
| POST | `/api/matricula` | Registra matrícula |
| PUT | `/api/matricula/<id>` | Atualiza matrícula |
| DELETE | `/api/matricula/<id>` | Remove matrícula |

### Programas Sociais

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/programa_social` | Lista programas (com JOIN família) |
| POST | `/api/programa_social` | Cadastra programa |
| DELETE | `/api/programa_social/<id>` | Remove programa |

### Atendimentos Sociais

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/atendimento_social` | Lista atendimentos (com JOIN aluno) |
| POST | `/api/atendimento_social` | Registra atendimento |
| DELETE | `/api/atendimento_social/<id>` | Remove atendimento |

### Análise de Evasão

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/evasao` | Retorna score de risco de cada aluno via view `v_risco_evasao` |

---

## Interface Web

A interface é uma **SPA (Single Page Application)** construída sem frameworks, com navegação entre páginas via JavaScript puro.

### Páginas disponíveis

| Seção | Descrição |
|---|---|
| **Dashboard** | Painel geral com estatísticas, gráfico de frequência por turma, situação dos alunos e alertas recentes |
| **Escolas** | CRUD completo — listar, cadastrar, editar e excluir escolas |
| **Turmas** | CRUD — gestão de turmas por escola e ano letivo |
| **Alunos** | CRUD — cadastro de estudantes com situação escolar |
| **Famílias** | CRUD — núcleos familiares com renda e localização |
| **Frequência** | Registro e consulta de presenças por aula |
| **Avaliações** | Notas por aluno, disciplina e bimestre |
| **Matrículas** | Vínculo entre aluno, turma e ano letivo |
| **Programas Sociais** | Cadastro de benefícios (Bolsa Família, PETI, BPC etc.) |
| **Atendimentos** | Registros de atendimento social às famílias |
| **Risco de Evasão** | Score calculado por aluno com filtros por faixa de risco |

### Como a interface se conecta ao banco

No arquivo `EvasaoEscolar/app.js`, o objeto `API` centraliza todas as chamadas HTTP:

```javascript
const API = {
  baseUrl: 'http://localhost:3000/api',

  async get(endpoint) {
    return await fetch(`${this.baseUrl}/${endpoint}`).then(r => r.json());
  },
  async post(endpoint, body) {
    return await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(r => r.json());
  },
  // ... put, del
};
```

Cada página chama `API.get('escola')`, `API.post('aluno', dados)` etc. Para apontar para outro servidor (produção), basta alterar `baseUrl`.

---

## Fluxo de Dados

```
Usuário abre index.html
        │
        ▼
app.js chama API.get('escola') ──► fetch GET http://localhost:3000/api/escola
                                            │
                                            ▼
                                    server.py recebe a requisição
                                            │
                                            ▼
                                    query_db("SELECT * FROM escola")
                                            │
                                            ▼
                                    sistema.db retorna linhas
                                            │
                                            ▼
                                    jsonify([dict(row) for row in res])
                                            │
        ◄───────────────────────────────────┘
        │  JSON response
        ▼
app.js renderiza a tabela na página
```

---

## Consultas que o Sistema Responde

1. Quais alunos têm frequência abaixo de 75% no bimestre atual?
2. Quais famílias não possuem vínculo com nenhum programa social?
3. Qual a média de notas por turma em cada disciplina?
4. Quais alunos tiveram mais de 3 atendimentos sociais nos últimos 6 meses?
5. Qual é o ranking de risco de evasão dos alunos de uma determinada escola?

---


---

## Disciplina

**Banco de Dados** — Centro de Ciência e Tecnologia (CCT)  
Universidade Federal do Cariri — UFCA  
Período: 2025.1
