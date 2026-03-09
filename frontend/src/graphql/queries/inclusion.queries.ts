/**
 * Consultas GraphQL - Ámbito Inclusión / Panel PIE
 * Estructura alineada con el backend EscuelaViva.
 */

export const GET_ALERTAS_PIE = `
  query GetAlertasPIE {
    alertasPIE {
      id
      titulo
      sub
      tipo
      badge
    }
  }
`;
