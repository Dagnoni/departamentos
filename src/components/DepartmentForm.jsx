import { useState } from 'react';

export default function DepartmentForm({ onCadastrar }) {
  const [name, setName] = useState('');
  const [acronym, setAcronym] = useState('');
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novosErros = {};
    if (!name.trim()) novosErros.name = 'Informe o nome do departamento';
    if (!/^[A-Za-z]{2,5}$/.test(acronym)) novosErros.acronym = 'A sigla deve ter de 2 a 5 letras';
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    try {
      await onCadastrar({ name: name.trim(), acronym: acronym.toUpperCase() });
      setName('');
      setAcronym('');
    } catch {
      setErros({ envio: 'Não foi possível cadastrar. Verifique se o JSON Server está rodando.' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="card card-body" onSubmit={handleSubmit} noValidate>
      {erros.envio && <div className="alert alert-danger">{erros.envio}</div>}

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nome do Departamento</label>
        <input
          id="name"
          type="text"
          className={`form-control ${erros.name ? 'is-invalid' : ''}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {erros.name && <div className="invalid-feedback">{erros.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="acronym" className="form-label">Sigla</label>
        <input
          id="acronym"
          type="text"
          maxLength="5"
          className={`form-control ${erros.acronym ? 'is-invalid' : ''}`}
          value={acronym}
          onChange={(e) => setAcronym(e.target.value)}
        />
        {erros.acronym && <div className="invalid-feedback">{erros.acronym}</div>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Cadastrar'}
      </button>
    </form>
  );
}
