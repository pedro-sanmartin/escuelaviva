/**
 * Placeholder para el cliente GraphQL (Apollo Client).
 * EscuelaViva - Documento Técnico de Arquitectura v1.0
 *
 * En producción:
 * - Crear ApolloClient con link HTTP (y/o WebSocket)
 * - Configurar cache (InMemoryCache)
 * - Integrar con app.config (VITE_GRAPHQL_URI)
 * - Soporte modo offline / persistencia para PWA y Capacitor
 */
// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

export function createApolloClient(/* graphqlUri: string */) {
  // const link = createHttpLink({ uri: graphqlUri });
  // return new ApolloClient({ link, cache: new InMemoryCache() });
  return null;
}
