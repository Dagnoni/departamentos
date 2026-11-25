import { useState, useEffect } from 'react';
import DepartmentForm from './components/DepartmentForm';
import DepartmentList from './components/DepartmentList';

const API_URL = 'http://localhost:3000/departments';

export default function App() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  // GET inicial: roda uma única vez, na montagem
  useEffect(() => {
    fetch(API_URL)
      .then((resp) => {
        if (!resp.ok) throw new Error('Falha no GET');
        return resp.json();
      })
      .then((dados) => setDepartments(dados))
      .catch(() => setErro('Não foi possível carregar os departamentos. Verifique se o JSON Server está rodando.'))
      .finally(() => setLoading(false));
  }, []);

  // POST: se der certo, acrescenta direto no state, sem novo GET
  const cadastrar = async (departamento) => {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(departamento),
    });
    if (!resp.ok) throw new Error('Falha no POST');
    const novoDepartamento = await resp.json();
    setDepartments((prev) => [...prev, novoDepartamento]);
  };

  return (
    <main className="container py-4">
      <h1 className="h3 mb-4">Cadastro de Departamentos</h1>

      <DepartmentForm onCadastrar={cadastrar} />

      <h2 className="h5 mt-5 mb-3">Departamentos</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}
      {loading ? (
        <p>Carregando departamentos...</p>
      ) : (
        <DepartmentList departments={departments} />
      )}
    </main>
  );
}
