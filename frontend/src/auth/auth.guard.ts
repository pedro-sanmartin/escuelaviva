/**
 * Guardia de autenticación y autorización por rol.
 * EscuelaViva - Documento Técnico: protección de rutas (Estudiante, Docente, PIE, etc.).
 */
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { ROL_ESTUDIANTE, ROL_DOCENTE, ROL_PIE, type Role } from "@/constants/roles";

const TOKEN_KEY = "token";
const ROLE_KEY = "userRole";

/** Meta extendida para rutas con control por rol */
export interface RouteMetaAuth {
  requiresAuth?: boolean;
  /** Roles permitidos; si está vacío o no definido, solo se exige auth */
  allowedRoles?: Role[];
}

/**
 * Obtiene el rol del usuario desde almacenamiento (en producción: token decoded o API).
 */
export function getStoredRole(): Role | null {
  const role = localStorage.getItem(ROLE_KEY);
  if (!role) return null;
  return role as Role;
}

/**
 * Guardia global: verifica token y, si la ruta tiene allowedRoles, que el usuario tenga uno de esos roles.
 */
export function createAuthGuard(
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const token = localStorage.getItem(TOKEN_KEY);
  const meta = _to.meta as RouteMetaAuth;
  const requiresAuth = meta.requiresAuth === true;
  const allowedRoles = (meta.allowedRoles ?? []) as Role[];

  if (requiresAuth && !token) {
    next({ name: "Login" });
    return;
  }

  if (_to.name === "Login" && token) {
    next({ name: "Dashboard" });
    return;
  }

  if (requiresAuth && allowedRoles.length > 0) {
    const userRole = getStoredRole();
    // Solo exigir rol si está definido; sesiones sin rol (p. ej. anteriores al refactor) se permiten
    if (userRole != null && !allowedRoles.includes(userRole)) {
      next({ name: "Login" });
      return;
    }
  }

  next();
}

/** Nombres de rol para uso en meta de rutas */
export const ROUTE_ROLES = {
  ESTUDIANTE: ROL_ESTUDIANTE,
  DOCENTE: ROL_DOCENTE,
  PIE: ROL_PIE,
} as const;
