/**
 * Tipos del dominio Dashboard / EscuelaViva
 * Reutilizables en vistas y componentes shared.
 */

export type AlertTipo = "urgente" | "pendiente";

export interface Alert {
  id: number;
  titulo: string;
  sub: string;
  tipo: AlertTipo;
  badge: string;
}

export type LogroColor = "gold" | "primary";

export interface Logro {
  id: number;
  nombre: string;
  sub: string;
  icon: string;
  color: LogroColor;
}

export type RecursoColor = "red" | "blue";

export interface Recurso {
  id: number;
  nombre: string;
  size: string;
  icon: string;
  color: RecursoColor;
}

export type CursoColor = "orange" | "blue" | "green" | "purple";

export interface Curso {
  id: number;
  nombre: string;
  pct: number;
  icon: string;
  color: CursoColor;
  desc: string;
  img: string;
}

export interface CommunityAvatar {
  id: number;
  img: string;
}
