export interface FieldError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  fieldErrors: FieldError[];
  status?: number;
}

interface FastApiValidationDetail {
  loc?: Array<string | number>;
  msg?: string;
}

export function extractApiError(err: unknown): ApiError {
  const axiosError = err as {
    response?: { status?: number; data?: unknown };
    message?: string;
  };

  const detail = axiosError?.response?.data as unknown;

  if (Array.isArray(detail)) {
    const fieldErrors = (detail as FastApiValidationDetail[])
      .filter((item) => item?.msg)
      .map((item) => ({
        field: typeof item.loc?.[1] === "string" ? item.loc[1] : "form",
        message: item.msg as string,
      }));
    const message = fieldErrors.map((f) => f.message).join(". ");
    return {
      message: message || "Please check the highlighted fields.",
      fieldErrors,
      status: axiosError?.response?.status,
    };
  }

  if (detail && typeof detail === "object") {
    const detailObj = detail as { detail?: unknown; msg?: string };
    if (typeof detailObj.detail === "string") {
      return { message: detailObj.detail, fieldErrors: [], status: axiosError?.response?.status };
    }
    if (typeof detailObj.msg === "string") {
      return { message: detailObj.msg, fieldErrors: [], status: axiosError?.response?.status };
    }
  }

  if (typeof detail === "string") {
    return { message: detail, fieldErrors: [], status: axiosError?.response?.status };
  }

  if (axiosError?.message) {
    return { message: axiosError.message, fieldErrors: [], status: axiosError?.response?.status };
  }

  return { message: "Something went wrong. Please try again.", fieldErrors: [] };
}
