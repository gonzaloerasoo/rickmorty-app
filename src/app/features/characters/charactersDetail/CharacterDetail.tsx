import { useParams, useNavigate } from "react-router-dom";
import { useCharacterDetail } from "./useCharacterDetail";
import DetailSkeleton from "./DetailSkeleton";

export default function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useCharacterDetail(id!);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <DetailSkeleton />;
  if (error) return <p className="text-center mt-10">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-4">{data!.name}</h1>

      <img src={data!.image} className="mx-auto rounded-2xl shadow mb-6 w-64" />

      <p className="text-gray-500 dark:text-gray-400 mb-2">{data!.species}</p>
      <p className="text-gray-500 dark:text-gray-400 mb-2">{data!.status}</p>
      <p className="text-gray-500 dark:text-gray-400 mb-2">
        Origen: {data!.origin.name}
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-2">
        Ubicación: {data!.location.name}
      </p>

      <button
        onClick={handleBack}
        className="mt-6 px-4 py-2 rounded-full bg-accent text-white"
      >
        Volver
      </button>
    </div>
  );
}
