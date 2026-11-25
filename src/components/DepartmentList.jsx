export default function DepartmentList({ departments }) {
  if (departments.length === 0) {
    return <div className="alert alert-info">Nenhum departamento cadastrado.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nome</th>
            <th>Sigla</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.acronym}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
