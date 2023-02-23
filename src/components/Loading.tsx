export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-primary"></div>
      <p className="absolute text-primary">loading...</p>
    </div>
  );
}
