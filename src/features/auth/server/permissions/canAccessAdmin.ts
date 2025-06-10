import { User, UserRole } from "@prisma/client"

export function canAccessAdmin(user: User) {
  return user.role === UserRole.ADMIN
}
