/**
 * Consultas GraphQL - Ámbito Académico / Dashboard
 * Estructura alineada con el backend EscuelaViva (Apollo/GraphQL).
 */

export const GET_DASHBOARD_DATA = `
  query GetDashboardData {
    dashboardData {
      microcursos {
        id
        nombre
        pct
        icon
        color
        desc
        img
      }
      recursosRecientes {
        id
        nombre
        size
        icon
        color
      }
      rutaIA {
        progress
        nextRouteName
        nextRouteLine1
        nextRouteLine2
      }
    }
  }
`;
