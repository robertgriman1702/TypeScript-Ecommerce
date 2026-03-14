import { useState } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { Dropdown } from "../shared/Dropdown";

// 1. Le decimos que va a recibir una función como propiedad
interface Props {
  onSearch: (searchTerm: string, category: string) => void;
}

export const ContainerFilter = ({ onSearch }: Props) => {
  const [category, setCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  // OJO: Estas categorías deben coincidir con las que guardaste en tu base de datos Supabase
  const categorias = ["Todas", "products", "combos"]; 

  const handleSearch = () => {
    // 2. Ejecuta la función enviando el texto y la categoría elegida
    onSearch(searchTerm, category);
  };

  return (
    <div className="flex w-full border border-gray-300 rounded-md bg-white shadow-sm overflow-visible">
      <Dropdown 
        label={category} 
        items={categorias} 
        onSelect={(item) => setCategory(item)} 
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Artículo o Marca"
        className="flex-1 px-4 py-3 text-sm text-gray-800 focus:outline-none"
      />

      <button onClick={handleSearch} className="bg-amber-400 hover:bg-neutral-700 text-white px-5 transition-colors">
        <HiOutlineSearch className="w-5 h-5" />
      </button>
    </div>
  );
};