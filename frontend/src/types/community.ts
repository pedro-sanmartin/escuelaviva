/**
 * Tipos del dominio Community / EduComunidad.
 * Preparado para contrato GraphQL.
 */
import type { CommunityAvatar } from "./dashboard";

/** Datos de la tarjeta EduComunidad (descripción, avatares, etc.) */
export interface EduComunidadData {
  description: string;
  avatars: CommunityAvatar[];
  extraCount: number;
  actionLabel: string;
}
