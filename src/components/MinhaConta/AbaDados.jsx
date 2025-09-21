import React from 'react';

const AbaDados = ({ currentUser, editMode, setEditMode, formData, handleChange, handleSave, handleCancel }) => {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Meus Dados Pessoais</h5>
        {!editMode ? (
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setEditMode(true)}
          >
            Editar
          </button>
        ) : (
          <div>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={handleSave}
            >
              Salvar
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Nome Completo</label>
            {editMode ? (
              <input
                type="text"
                className="form-control"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
            ) : (
              <p className="form-control-plaintext">{currentUser.nome}</p>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            {editMode ? (
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <p className="form-control-plaintext">{currentUser.email}</p>
            )}
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">CPF</label>
            {editMode ? (
              <input
                type="text"
                className="form-control"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
              />
            ) : (
              <p className="form-control-plaintext">{currentUser.cpf}</p>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Telefone</label>
            {editMode ? (
              <input
                type="tel"
                className="form-control"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            ) : (
              <p className="form-control-plaintext">
                {currentUser.telefone || 'Não informado'}
              </p>
            )}
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Data de Nascimento</label>
            {editMode ? (
              <input
                type="date"
                className="form-control"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
              />
            ) : (
              <p className="form-control-plaintext">
                {currentUser.dataNascimento 
                  ? new Date(currentUser.dataNascimento).toLocaleDateString('pt-BR')
                  : 'Não informada'
                }
              </p>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Data de Registro</label>
            <p className="form-control-plaintext">
              {new Date(currentUser.dataRegistro).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbaDados;