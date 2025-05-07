export const ErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : String(error);
};
