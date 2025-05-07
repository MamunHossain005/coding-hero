export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-500">Page Not Found</h2>
        <p className="text-base font-medium mt-5">Could not find requested resource</p>
      </div>
    </div>
  );
}
