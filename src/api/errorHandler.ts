export class ApiError extends Error {
  constructor(public statusCode: number, message: string, public details?: unknown) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): never {
  if (error && typeof error === 'object' && 'response' in error) {
    const resp = (error as any).response;
    throw new ApiError(resp.status, resp.data?.message || 'Unknown error', resp.data);
  }
  throw new ApiError(0, 'Network error');
}
