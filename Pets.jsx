import PetForm from "../components/pets/PetForm";
import PetList from "../components/pets/PetList";

export default function Pets() {
  return (
    <div>
      <h2>Pets</h2>
      <PetForm refresh={() => window.location.reload()} />
      <PetList />
    </div>
  );
}