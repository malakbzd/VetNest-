import { useState } from "react";

export default function PetForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    age: "",
    ownerName: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPet(form);
    setForm({ name: "", type: "", age: "", ownerName: "" });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name}
        onChange={(e) => setForm({...form, name: e.target.value})} />

      <input placeholder="Type" value={form.type}
        onChange={(e) => setForm({...form, type: e.target.value})} />

      <input placeholder="Age" value={form.age}
        onChange={(e) => setForm({...form, age: e.target.value})} />

      <input placeholder="Owner" value={form.ownerName}
        onChange={(e) => setForm({...form, ownerName: e.target.value})} />

      <button>Add Pet</button>
    </form>
  );
}