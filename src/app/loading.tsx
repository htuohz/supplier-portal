export default function Loading() {
  return (
    <div className="min-h-[60vh] grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading...</h2>
        <p className="mt-2 text-sm text-gray-600">Please wait while we fetch the content.</p>
      </div>
    </div>
  );
}
