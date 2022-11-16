export interface StatusError {
  status: number;
}

export interface ApiError {
  code?: string;
  message?: string;
  data?: StatusError;
}

export default class WPError extends Error {
  private apiError: ApiError;

  constructor(apiError: ApiError) {
    super();
    this.apiError = apiError;
    this.message = apiError.message || 'There was an error';
  }

  toString():string {
    return this.message;
  }
}