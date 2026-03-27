import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app) # Isso permite que seu HTML acesse o servidor local

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, 'sistema.db')

def query_db(query, args=(), one=False):
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row # Permite acessar colunas pelo nome
    cur = conn.cursor()
    cur.execute(query, args)
    rv = cur.fetchall()
    conn.commit()
    conn.close()
    return (rv[0] if rv else None) if one else rv

# Endpoint para listar escolas (GET)
@app.route('/api/escola', methods=['GET'])
def get_escolas():
    res = query_db("SELECT * FROM escola")
    # Converte os resultados para uma lista de dicionários para o JS entender
    return jsonify([dict(row) for row in res])

# Endpoint para adicionar escola (POST)
# Endpoint para adicionar escola (POST)
@app.route('/api/escola', methods=['POST'])
def add_escola():
    dados = request.json
    # A ordem aqui deve bater com os (?)
    query = "INSERT INTO escola (nome, cidade, tipo, risco_total, bairro, telefone, endereco) VALUES (?, ?, ?, ?, ?, ?, ?)"
    params = (
        dados.get('nome'), 
        dados.get('cidade'), 
        dados.get('tipo'), 
        dados.get('risco_total', 0), 
        dados.get('bairro'), 
        dados.get('telefone'), 
        dados.get('endereco')
    )
    query_db(query, params)
    return jsonify({"status": "sucesso"}), 201

@app.route('/api/escola/<int:id>', methods=['PUT'])
def update_escola(id):
    dados = request.json
    # O 'id' tem que ser o ÚLTIMO porque ele é o WHERE id_escola=?
    query = "UPDATE escola SET nome=?, cidade=?, tipo=?, risco_total=?, bairro=?, telefone=?, endereco=? WHERE id_escola=?"
    params = (
        dados.get('nome'), 
        dados.get('cidade'), 
        dados.get('tipo'), 
        dados.get('risco_total', 0), 
        dados.get('bairro'), 
        dados.get('telefone'), 
        dados.get('endereco'), 
        id # <--- ID NO FINAL
    )
    query_db(query, params)
    return jsonify({"status": "atualizado"})

# Endpoint para DELETAR (DELETE)
@app.route('/api/escola/<int:id>', methods=['DELETE'])
def delete_escola(id):
    query_db("DELETE FROM escola WHERE id_escola=?", (id,))
    return jsonify({"status": "removido"})

# --- ROTAS PARA ALUNOS ---

@app.route('/api/aluno', methods=['GET'])
def get_alunos():
    res = query_db("SELECT * FROM aluno")
    return jsonify([dict(row) for row in res])

@app.route('/api/aluno', methods=['POST'])
def add_aluno():
    dados = request.json
    query = """INSERT INTO aluno (nome, data_nascimento, sexo, situacao_escolar, cpf, id_familia) 
               VALUES (?, ?, ?, ?, ?, ?)"""
    params = (
        dados.get('nome'),
        dados.get('data_nascimento'),
        dados.get('sexo'),
        dados.get('situacao_escolar', 'Regular'),
        dados.get('cpf'),
        dados.get('id_familia')
    )
    query_db(query, params)
    return jsonify({"status": "sucesso"}), 201

@app.route('/api/aluno/<int:id>', methods=['PUT'])
def update_aluno(id):
    dados = request.json
    query = """UPDATE aluno SET nome=?, data_nascimento=?, sexo=?, situacao_escolar=?, cpf=?, id_familia=? 
               WHERE id_aluno=?"""
    params = (
        dados.get('nome'),
        dados.get('data_nascimento'),
        dados.get('sexo'),
        dados.get('situacao_escolar'),
        dados.get('cpf'),
        dados.get('id_familia'),
        id
    )
    query_db(query, params)
    return jsonify({"status": "atualizado"})

@app.route('/api/aluno/<int:id>', methods=['DELETE'])
def delete_aluno(id):
    query_db("DELETE FROM aluno WHERE id_aluno=?", (id,))
    return jsonify({"status": "removido"})

# --- ROTAS PARA FAMÍLIAS ---

@app.route('/api/familia', methods=['GET'])
def get_familias():
    res = query_db("SELECT * FROM familia")
    return jsonify([dict(row) for row in res])

@app.route('/api/familia', methods=['POST'])
def add_familia():
    dados = request.json
    query = """INSERT INTO familia (renda_familiar, endereco, bairro, cidade, telefone) 
               VALUES (?, ?, ?, ?, ?)"""
    params = (
        dados.get('renda_familiar'),
        dados.get('endereco'),
        dados.get('bairro'),
        dados.get('cidade'),
        dados.get('telefone')
    )
    query_db(query, params)
    return jsonify({"status": "sucesso"}), 201

@app.route('/api/familia/<int:id>', methods=['PUT'])
def update_familia(id):
    dados = request.json
    query = """UPDATE familia SET renda_familiar=?, endereco=?, bairro=?, cidade=?, telefone=? 
               WHERE id_familia=?"""
    params = (
        dados.get('renda_familiar'),
        dados.get('endereco'),
        dados.get('bairro'),
        dados.get('cidade'),
        dados.get('telefone'),
        id
    )
    query_db(query, params)
    return jsonify({"status": "atualizado"})

@app.route('/api/familia/<int:id>', methods=['DELETE'])
def delete_familia(id):
    query_db("DELETE FROM familia WHERE id_familia=?", (id,))
    return jsonify({"status": "removido"})

# --- ROTAS PARA TURMAS ---

@app.route('/api/turma', methods=['GET'])
def get_turmas():
    # Podemos usar um JOIN para trazer o nome da escola junto, se quiser
    res = query_db("SELECT * FROM turma")
    return jsonify([dict(row) for row in res])

@app.route('/api/turma', methods=['POST'])
def add_turma():
    dados = request.json
    query = "INSERT INTO turma (nome, periodo, ano, id_escola) VALUES (?, ?, ?, ?)"
    params = (
        dados.get('nome'),
        dados.get('periodo'),
        dados.get('ano'),
        dados.get('id_escola')
    )
    query_db(query, params)
    return jsonify({"status": "sucesso"}), 201

@app.route('/api/turma/<int:id>', methods=['PUT'])
def update_turma(id):
    dados = request.json
    query = "UPDATE turma SET nome=?, periodo=?, ano=?, id_escola=? WHERE id_turma=?"
    params = (
        dados.get('nome'),
        dados.get('periodo'),
        dados.get('ano'),
        dados.get('id_escola'),
        id
    )
    query_db(query, params)
    return jsonify({"status": "atualizado"})

@app.route('/api/turma/<int:id>', methods=['DELETE'])
def delete_turma(id):
    query_db("DELETE FROM turma WHERE id_turma=?", (id,))
    return jsonify({"status": "removido"})

# --- ROTAS PARA FREQUÊNCIA ---

@app.route('/api/frequencia', methods=['GET'])
def get_frequencia():
    # Retorna a lista de presenças com o nome do aluno
    query = """
        SELECT f.*, a.nome as nome_aluno 
        FROM frequencia f 
        JOIN aluno a ON f.id_aluno = a.id_aluno
    """
    res = query_db(query)
    return jsonify([dict(row) for row in res])

@app.route('/api/frequencia', methods=['POST'])
def add_frequencia():
    dados = request.json
    query = "INSERT INTO frequencia (id_aluno, data, presenca) VALUES (?, ?, ?)"
    params = (
        dados.get('id_aluno'),
        dados.get('data'),
        dados.get('presenca')
    )
    query_db(query, params)
    return jsonify({"status": "sucesso"}), 201

@app.route('/api/frequencia/<int:id>', methods=['DELETE'])
def delete_frequencia(id):
    query_db("DELETE FROM frequencia WHERE id_frequencia=?", (id,))
    return jsonify({"status": "removido"})

# Exemplo para Frequência (Repita o padrão para os outros)
@app.route('/api/frequencia/<int:id>', methods=['PUT'])
def update_frequencia(id):
    dados = request.json
    query = "UPDATE frequencia SET id_aluno=?, data=?, presenca=? WHERE id_frequencia=?"
    params = (dados.get('id_aluno'), dados.get('data'), dados.get('presenca'), id)
    query_db(query, params)
    return jsonify({"status": "atualizado"})

# --- ROTAS PARA AVALIAÇÕES ---

@app.route('/api/avaliacao', methods=['GET'])
def get_avaliacoes():
    # Retorna as notas com o nome do aluno para a tabela
    query = """
        SELECT av.*, a.nome as nome_aluno 
        FROM avaliacao av 
        JOIN aluno a ON av.id_aluno = a.id_aluno
    """
    res = query_db(query)
    return jsonify([dict(row) for row in res])

@app.route('/api/avaliacao', methods=['POST'])
def add_avaliacao():
    dados = request.json
    query = "INSERT INTO avaliacao (id_aluno, disciplina, nota, bimestre, data_avaliacao) VALUES (?, ?, ?, ?, ?)"
    params = (
        dados.get('id_aluno'),
        dados.get('disciplina'),
        dados.get('nota'),
        dados.get('bimestre'),
        dados.get('data_avaliacao')
    )
    query_db(query, params)
    return jsonify({"status": "sucesso"}), 201

@app.route('/api/avaliacao/<int:id>', methods=['DELETE'])
def delete_avaliacao(id):
    query_db("DELETE FROM avaliacao WHERE id_avaliacao=?", (id,))
    return jsonify({"status": "removido"})

# Exemplo para Avaliação
@app.route('/api/avaliacao/<int:id>', methods=['PUT'])
def update_avaliacao(id):
    dados = request.json
    query = "UPDATE avaliacao SET id_aluno=?, disciplina=?, nota=?, bimestre=? WHERE id_avaliacao=?"
    params = (dados.get('id_aluno'), dados.get('disciplina'), dados.get('nota'), dados.get('bimestre'), id)
    query_db(query, params)
    return jsonify({"status": "atualizado"})

# --- ROTAS PARA MATRÍCULAS ---

@app.route('/api/matricula', methods=['GET'])
def get_matriculas():
    query = """
        SELECT m.*, a.nome as nome_aluno, t.nome as nome_turma 
        FROM matricula m
        JOIN aluno a ON m.id_aluno = a.id_aluno
        JOIN turma t ON m.id_turma = t.id_turma
    """
    res = query_db(query)
    return jsonify([dict(row) for row in res])

@app.route('/api/matricula', methods=['POST'])
def add_matricula():
    dados = request.json
    query = "INSERT INTO matricula (id_aluno, id_turma, data_matricula, status) VALUES (?, ?, ?, ?)"
    params = (
        dados.get('id_aluno'),
        dados.get('id_turma'),
        dados.get('data_matricula', '2026-03-25'),
        dados.get('status', 'Ativo')
    )
    query_db(query, params)
    return jsonify({"status": "sucesso"}), 201

@app.route('/api/matricula/<int:id>', methods=['DELETE'])
def delete_matricula(id):
    query_db("DELETE FROM matricula WHERE id_matricula=?", (id,))
    return jsonify({"status": "removido"})

@app.route('/api/matricula/<int:id>', methods=['PUT'])
def update_matricula(id):
    dados = request.json
    # Importante: O WHERE usa id_matricula para garantir a atualização correta
    query = """
        UPDATE matricula 
        SET id_aluno = ?, id_turma = ?, data_matricula = ?, status = ? 
        WHERE id_matricula = ?
    """
    params = (
        dados.get('id_aluno'),
        dados.get('id_turma'),
        dados.get('data_matricula'),
        dados.get('status'),
        id
    )
    query_db(query, params)
    return jsonify({"status": "atualizado"})

# --- ROTAS PARA PROGRAMAS SOCIAIS ---

@app.route('/api/programa_social', methods=['GET'])
def get_programas():
    # Retorna o programa e o ID da família associada
    query = """
        SELECT p.*, f.renda_familiar 
        FROM programa_social p
        JOIN familia f ON p.id_familia = f.id_familia
    """
    res = query_db(query)
    return jsonify([dict(row) for row in res])

@app.route('/api/programa_social', methods=['POST'])
def add_programa():
    dados = request.json
    query = "INSERT INTO programa_social (id_familia, nome_programa, valor_beneficio, data_adesao) VALUES (?, ?, ?, ?)"
    params = (
        dados.get('id_familia'),
        dados.get('nome_programa'),
        dados.get('valor_beneficio'),
        dados.get('data_adesao')
    )
    query_db(query, params)
    return jsonify({"status": "sucesso"}), 201

@app.route('/api/programa_social/<int:id>', methods=['DELETE'])
def delete_programa(id):
    query_db("DELETE FROM programa_social WHERE id_programa=?", (id,))
    return jsonify({"status": "removido"})

# --- ROTAS PARA ATENDIMENTO SOCIAL ---

@app.route('/api/atendimento_social', methods=['GET'])
def get_atendimentos():
    query = """
        SELECT at.*, a.nome as nome_aluno 
        FROM atendimento_social at
        JOIN aluno a ON at.id_aluno = a.id_aluno
    """
    res = query_db(query)
    return jsonify([dict(row) for row in res])

@app.route('/api/atendimento_social', methods=['POST'])
def add_atendimento():
    dados = request.json
    query = """INSERT INTO atendimento_social 
               (id_aluno, data_atendimento, tecnico_responsavel, assunto, parecer_tecnico, proximos_passos) 
               VALUES (?, ?, ?, ?, ?, ?)"""
    params = (
        dados.get('id_aluno'),
        dados.get('data_atendimento'),
        dados.get('tecnico_responsavel'),
        dados.get('assunto'),
        dados.get('parecer_tecnico'),
        dados.get('proximos_passos')
    )
    query_db(query, params)
    return jsonify({"status": "sucesso"}), 201

@app.route('/api/atendimento_social/<int:id>', methods=['DELETE'])
def delete_atendimento(id):
    query_db("DELETE FROM atendimento_social WHERE id_atendimento=?", (id,))
    return jsonify({"status": "removido"})

# --- ROTA DE ANÁLISE DE EVASÃO ---

@app.route('/api/evasao', methods=['GET'])
def get_evasao():
    # Buscamos os dados da nossa View de risco
    res = query_db("SELECT * FROM v_risco_evasao")
    return jsonify([dict(row) for row in res])

if __name__ == '__main__':
    app.run(port=3000, debug=True)