export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold mb-4">404</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        La página no existe.
      </p>
      <a
        href="/"
        className="px-4 py-2 rounded-full bg-accent text-black font-semibold"
      >
        Volver al inicio
      </a>
    </div>
  );
}
