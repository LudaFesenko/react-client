export const ErrorMessage = ({ error = "" }: { error: string }) => {
  return error && <p className="text-red-500 text-small mt-2 mb-5">{error}</p>
}
