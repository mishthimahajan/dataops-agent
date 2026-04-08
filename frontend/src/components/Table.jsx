export default function Table({ data }) {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row.name ?? "N/A"}</td>
            <td>{row.age}</td>
            <td>{row.salary ?? "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const tableStyle = {
  margin: "auto",
  borderCollapse: "collapse",
  width: "70%",
  background: "rgba(30,41,59,0.8)",
  borderRadius: "10px",
  overflow: "hidden",
  color: "white"
};