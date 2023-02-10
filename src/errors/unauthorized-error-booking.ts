import { ApplicationError } from "@/protocols";

export function unauthorizedErrorBooking(): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: "You must have a paid ticket and registration for an in-person event including hotel",
  };
}
