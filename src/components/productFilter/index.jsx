import { useState } from "react";

export default function ProductFilter(props) {
  const [selectedSupplier, setSelectedSupplier] = useState("");

  return (
    <div className="flex gap-4 mt-3">
      <select
        className="p-2 bg-gray-200 rounded-md"
        value={selectedSupplier}
        onChange={(e) => setSelectedSupplier(e.target.value)}
      >
        <option value="">Selecione um fornecedor</option>
        {props.suppliers?.map((supplier) => (
          <option key={supplier._id} value={supplier.nome}>
            {supplier.nome}{" "}
          </option>
        ))}
      </select>
      <button
        className="p-2 bg-green-200 rounded-md"
        onClick={() => props.filter(selectedSupplier)}
      >
        Filtrar
      </button>
    </div>
  );
}
