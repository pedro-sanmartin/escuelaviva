# Informe de Diagnóstico: Arquitectura EscuelaViva

**Referencia:** Documento Técnico – Arquitectura de EscuelaViva (Versión 1.0, Abril 2025)  
**Alcance:** Frontend Vue 3 + Vite (estructura base, plugins, auth, services, composables, types, config)  
**Fecha:** Febrero 2025  
**Rol:** Principal Software Architect & Security Auditor  

---

## 1. Fidelidad arquitectónica

**Criterio:** “Una base de código, múltiples plataformas” (PWA, Mobile, Desktop).

### Fortalezas

- **Estructura alineada con el documento:** `plugins/`, `auth/`, `services/`, `composables/`, `types/`, `config/` están presentes y separados. `main.ts` delega en `registerPlugins(app)`, lo que facilita variantes por plataforma (Capacitor/Electron) sin tocar el núcleo.
- **Tecnología:** Vue 3 (Composition API), Vite, PrimeVue, Tailwind y Pinia coinciden con lo definido en el documento.
- **Config centralizada:** `app.config.ts` concentra `apiBaseUrl`, `graphqlUri` e indicadores de entorno; la capa de datos (`api/axios.ts`) usa `appConfig.apiBaseUrl`, lo que permite cambiar base por plataforma en un solo punto.
- **Placeholder Apollo:** `plugins/apollo.ts` está preparado para integrar el cliente GraphQL sin reestructurar; el documento indica GraphQL (Apollo Server) en backend y “una base de código” en front.

### Riesgos

- **PWA no implementada:** No hay `vite-plugin-pwa`, ni `manifest.json`, ni Service Worker (Workbox). El documento indica que “el PWA es la base de todo el sistema” y que las apps móvil y escritorio se construyen sobre esa base. **Riesgo alto:** la base actual no es aún “PWA first”.
- **Rutas no alineadas con el documento:** El documento especifica rutas por rol (`/estudiante/dashboard`, `/docente/planificaciones`, `/pie/seguimiento/123`). Hoy solo existe `/dashboard` con `meta.allowedRoles`; no hay prefijos por rol ni lazy loading explícito en el router. Escalar a módulos Directivo/PIE con rutas propias exigirá refactor de rutas.
- **Capacitor/Electron:** No hay configuración ni scripts para Capacitor o Electron. La estructura de código es compatible, pero no existe aún la “capa” de empaquetado (documento: Capas 2 y 3).

### Conclusión (fidelidad)

La **organización del código** respeta el principio de una base única y está bien preparada para múltiples plataformas. La **fidelidad completa** al documento exige implementar PWA, definir rutas por rol y, más adelante, añadir Capacitor/Electron.

---

## 2. Separación de responsabilidades (SoC)

**Criterio:** Lógica de negocio fuera de vistas; composables no asumen tareas de services/utils.

### Fortalezas

- **Servicios como origen de datos:** `academic.service.ts`, `inclusion.service.ts` y `community.service.ts` exponen funciones (`fetchDashboardData`, `fetchAlertasPIE`, etc.) que devuelven datos tipados. Los composables (`useAcademic`, `useInclusion`, `useCommunity`) solo orquestan llamadas, estado reactivo (loading/error) y delegación al servicio. No hay lógica de negocio (reglas, cálculos) dentro de los servicios mock más allá de la simulación de latencia.
- **DashboardView.vue:** La vista usa exclusivamente composables y componentes presentacionales. No llama a servicios directamente ni contiene reglas de negocio; solo ensambla datos (p. ej. `welcome`) y eventos (`onExploreRecursos`, `onVerMicrocursos`). El patrón Vista → Composable → Servicio se cumple.
- **Utils y formatters:** `utils/formatters.ts` contiene solo funciones puras de formateo (fechas, texto); no dependen de Vue ni de servicios.

### Riesgos

- **Datos “welcome” hardcodeados en la vista:** El objeto `welcome` (userName, role, summary, ctaLabel, imageUrl) está definido en `DashboardView.vue`. Según el documento, Pinia debe gestionar “sesión, roles, datos del perfil”. **Riesgo medio:** al crecer, esto debería provenir del store (auth/perfil) o de un composable `useWelcome()` que lea del store y/o de un servicio.
- **Navegación comentada:** `onExploreRecursos` y `onVerMicrocursos` solo tienen comentarios (`// router.push(...)`). La decisión de a qué ruta ir podría considerarse “orquestación” de la vista; si las rutas por rol se complejizan, conviene centralizar en un composable o en el router (p. ej. redirección por rol tras login).
- **Composables con lógica de UI:** Los composables exponen `loading` y `error` y manejan try/catch. Esto es adecuado para “estado de carga/error de la fuente de datos”. No hay mezcla con lógica de negocio; el único punto a vigilar es que no se añadan validaciones o reglas de dominio dentro del composable en lugar del servicio o de `utils/validators` (aún inexistente).

### Conclusión (SoC)

SoC está bien aplicada: servicios = datos, composables = orquestación y estado de carga, vista = presentación. La mejora prioritaria es sacar `welcome` de la vista y alimentarlo desde store/servicio.

---

## 3. Consistencia de tipado

**Criterio:** Interfaces en `src/types/` usadas de punta a punta (Servicio → Composable → Componente); sin `any` implícitos ni definiciones duplicadas.

### Fortalezas

- **Tipos centralizados:** `types/dashboard.ts` define `Alert`, `Logro`, `Recurso`, `Curso`, `CommunityAvatar` y tipos auxiliares; `types/index.ts` reexporta todo. Servicios y composables importan desde `@/types`. Los componentes shared importan desde `@/types`. Cadena Servicio → Composable → Componente respetada para los dominios actuales.
- **Poca presencia de `any`:** Solo aparece en `vue-shims.d.ts` (`DefineComponent<{}, {}, any>`), típico de declaraciones de componentes Vue; no en lógica de negocio ni en servicios.
- **Store auth:** Uso de `Role` desde `@/constants/roles` y tipado explícito de `response.data` en login; el guard usa `RouteMetaAuth` y `Role[]`.

### Riesgos

- **Definición duplicada de “ruta IA”:** En `academic.service.ts`, la interfaz `DashboardAcademicData` define `rutaIA` en línea (`progress`, `nextRouteName`, `nextRouteLine1`, `nextRouteLine2`). En `useAcademic.ts` existe `RutaIAState` con la misma forma. No hay un tipo único en `types/` (p. ej. `types/dashboard.ts` o `types/academic.ts`). **Riesgo bajo:** mantenimiento doble y posible desincronización si el contrato GraphQL cambia.
- **Tipado de respuesta de login:** Se usa `response.data as { access_token: string; role?: Role }`. Funcionalmente correcto; si el backend devuelve más campos (perfil, permisos), convendría una interfaz en `types/` (p. ej. `LoginResponse`) para no repetir el cast en varios sitios.
- **`user: null as unknown` en auth store:** El estado `user` está tipado como `unknown`; si más adelante se guarda el perfil, será necesario un tipo explícito (p. ej. `User` o `UserProfile` en `types/`).

### Conclusión (tipado)

El tipado es sólido y consistente en la mayor parte del flujo. Mejoras recomendadas: unificar el tipo de “ruta IA” en `types/` y definir `LoginResponse`/`User` para auth cuando se amplíe el perfil.

---

## 4. Preparación para GraphQL y offline

**Criterio:** Servicios preparados para cambiar de mocks a Apollo de forma transparente; estructura que permita persistencia en IndexedDB para modo offline.

### Fortalezas

- **Contrato de servicios:** Los servicios exportan funciones que devuelven `Promise<...>` con tipos claros (`DashboardAcademicData`, `Alert[]`, etc.). Sustituir el cuerpo por una llamada a `client.query({ query: GET_DASHBOARD_DATA })` y mapear la respuesta mantiene la misma firma; los composables no necesitan cambiar.
- **GraphQL ya esbozado:** Existen `graphql/queries/academic.queries.ts` e `inclusion.queries.ts` con consultas alineadas a la estructura de los mocks. El paso a Apollo será principalmente en la capa de servicio (inyección de cliente o módulo que llame a Apollo).
- **Placeholder Apollo:** `plugins/apollo.ts` y `app.config.ts` (`graphqlUri`) dejan claro dónde conectar el cliente. No hay ataduras a REST para los datos de dashboard/inclusión/comunidad.

### Riesgos

- **Sin capa de abstracción “data source”:** Los servicios hoy son a la vez “origen de datos” y “mock”. Para offline, el documento indica IndexedDB (navegador), Capacitor Storage (móvil) y FileSystem (escritorio). No existe aún:
  - Un módulo o capa que decida “leer desde red (Apollo) o desde almacenamiento local (IndexedDB)”.
  - Una API única (p. ej. `getDashboardData()`) que internamente use Apollo cuando hay red y IndexedDB cuando no, con cola de sincronización.
  **Riesgo alto:** cuando se implemente offline, podría acabarse duplicando lógica en cada servicio o acoplando Apollo + IndexedDB en el mismo archivo. Recomendación: introducir una capa “data source” o “repository” por dominio (academic, inclusion, community) que abstraiga “origen” (Apollo vs local) y que los servicios actuales consuman o se conviertan en esa capa.
- **Sin IndexedDB ni PWA:** No hay uso de IndexedDB, ni Service Worker, ni estrategia de caché. El documento enumera “contenidos descargables, mensajes, formularios PII/PACI, reportes, microcursos” como datos que deben funcionar offline. La estructura de carpetas no incluye aún `storage/`, `sync/` o similar para persistencia y sincronización.
- **Dependencia directa de servicios a “mock”:** Las constantes MOCK_* y `withMockLatency` viven dentro de cada servicio. Para un cambio limpio a Apollo, conviene extraer los mocks a `__mocks__` o a un adaptador “mock” inyectable (p. ej. solo en desarrollo), de modo que el servicio reciba “origen de datos” por configuración o inyección.

### Conclusión (GraphQL y offline)

La preparación para **GraphQL** es buena: contrato de servicios, queries ya definidas y config lista. La preparación para **offline** es insuficiente: no hay capa de persistencia ni abstracción de “data source”; se recomienda diseñar esa capa antes de implementar PWA/IndexedDB para no reestructurar después.

---

## 5. Estándar DUA y accesibilidad

**Criterio:** `app.config.ts` y `formatters.ts` integrados; estructura robusta para tema (claro/oscuro) y tamaños de fuente dinámicos.

### Fortalezas

- **Config DUA:** `app.config.ts` define `FONT_SIZE_DUA` (small / medium / large) y `DUA_FONT_CLASS`; `design-tokens.css` declara variables `--ev-font-small/medium/large` y clases `.dua-font-small/medium/large`. Los tres niveles del documento están cubiertos.
- **Formatters:** `formatters.ts` ofrece `formatDate`, `formatDateTime`, `formatRelativeDate`, `truncateText`, `titleCase` con locale `es-CL`, adecuados para DUA y claridad.

### Riesgos

- **DUA no aplicado en la UI:** Ningún componente ni layout aplica las clases DUA ni lee una preferencia de usuario (p. ej. guardada en Pinia o localStorage). No hay selector de “tamaño de fuente” ni aplicación de `document.documentElement.classList.add(DUA_FONT_CLASS.large)`. Las clases existen pero no están integradas en el flujo de usuario.
- **Tema claro/oscuro:** El documento menciona “modo oscuro y alto contraste (con Tailwind)”. El HTML tiene `class="dark"` y hay tokens para dark (p. ej. `--ev-surface-900`); no hay un mecanismo centralizado (store, config o composable) para cambiar tema (claro/oscuro) ni para persistir la preferencia. PrimeVue está configurado con `darkModeSelector: "system"`, por lo que depende del sistema; no hay toggle manual en la app.
- **Formatters poco usados:** No se encontraron usos de `formatDate`, `formatRelativeDate` o `truncateText` en vistas o componentes. Los formatters están disponibles pero no integrados (p. ej. en listas de alertas, fechas de recursos o títulos). Riesgo de que, al crecer, cada vista formatee a mano en lugar de reutilizar `formatters.ts`.
- **Estructura de “tema” DUA:** No existe un módulo o composable `useDUA()` / `useTheme()` que:
  - Lea/guarde preferencia de tamaño de fuente y tema.
  - Aplique clases al root y/o a contenedores.
  - Exponga estado reactivo para que la UI muestre la opción actual.

### Conclusión (DUA)

La base técnica (config, tokens, formatters) está bien puesta; la integración en la aplicación y la experiencia de usuario (selector de fuente, tema, uso de formatters) están pendientes. Se recomienda una estructura explícita para preferencias DUA/tema (store o composable + aplicación en root) antes de la fase de responsividad.

---

## 6. Seguridad y roles

**Criterio:** `auth.guard.ts` y persistencia del rol en store suficientes para escalar a módulos Directivo y PIE sin riesgos de escalación de privilegios en el frontend.

### Fortalezas

- **Guard por rol:** `createAuthGuard` comprueba `meta.requiresAuth` y `meta.allowedRoles`; si el usuario tiene rol guardado y no está en `allowedRoles`, se redirige a Login. No se confía solo en “estar logueado” para rutas sensibles.
- **Rol desde backend:** El store guarda `userRole` desde `response.data.role` en login, con fallback a `ROL_DOCENTE` solo cuando el backend no envía rol. Esto reduce la posibilidad de que un usuario se “asigne” un rol en el cliente sin que el backend lo haya autorizado.
- **Constantes de rol únicas:** `constants/roles.ts` y `ROUTE_ROLES` en el guard evitan strings mágicos y mantienen coherencia con el documento (Estudiante, Docente, PIE, Directivo, Apoderado).
- **Limitar escalación en front:** La autorización real debe residir en el backend (documento: “Guards en NestJS: protegen rutas según el rol”). El front solo oculta rutas y redirige; no se usa el rol para decidir permisos de escritura ni datos sensibles sin validación en servidor.

### Riesgos

- **Rol en localStorage:** El rol se guarda en `localStorage` (clave `userRole`). Cualquier script en la misma origen (XSS) o usuario con acceso al dispositivo podría modificar `userRole`. El backend debe **siempre** validar el rol/permisos en cada petición (JWT con rol, o consulta a BD). **Recomendación:** documentar que el rol en front es solo para UX (menús, redirecciones); la autorización es responsabilidad del backend. Si el JWT incluye el rol, preferir leer el rol del token (decodificado de forma segura) en lugar de confiar solo en localStorage.
- **Guard sin ROL_DIRECTIVO ni ROL_APODERADO en ROUTE_ROLES:** `ROUTE_ROLES` solo exporta ESTUDIANTE, DOCENTE, PIE. Para rutas exclusivas de Directivo (p. ej. panel financiero) o Apoderado habría que añadirlos a `ROUTE_ROLES` y usarlos en `meta.allowedRoles`. Riesgo bajo si se hace al añadir esas rutas.
- **Rutas por rol y escalación:** Si más adelante se implementan rutas como `/directivo/finanzas` o `/pie/seguimiento/:id`, el guard debe asignar `allowedRoles` de forma estricta (p. ej. solo DIRECTIVO para finanzas). Hoy el dashboard permite ESTUDIANTE, DOCENTE y PIE; está bien para un dashboard compartido. Al añadir módulos, evitar “allowedRoles: [todos los roles]” en rutas sensibles.
- **Sesiones sin rol (legacy):** El guard permite acceso si hay token pero no hay rol guardado (para no romper sesiones antiguas). En entornos con alto riesgo de escalación, se podría forzar re-login si `userRole` falta (opción configurable).

### Conclusión (seguridad)

El diseño del guard y del store es adecuado para escalar a Directivo y PIE siempre que: (1) el backend valide rol/permisos en todas las operaciones, (2) se documente que el rol en front es solo para UX, y (3) al añadir rutas sensibles se use `allowedRoles` restringido. No se detectan fallos que permitan escalación de privilegios por sí solos en el front, asumiendo backend correcto.

---

## 7. Resumen ejecutivo

| Área                    | Nivel de cumplimiento | Observación principal                                                                 |
|-------------------------|------------------------|----------------------------------------------------------------------------------------|
| Fidelidad arquitectónica | Medio                  | Estructura correcta; falta PWA y rutas por rol como en el documento.                  |
| SoC                     | Alto                   | Buena separación; sacar `welcome` de la vista a store/servicio.                       |
| Consistencia de tipado  | Alto                   | Tipado sólido; unificar tipo “ruta IA” y definir tipos para auth/perfil.              |
| GraphQL y offline       | Medio (GraphQL) / Bajo (offline) | Listo para Apollo; falta capa de persistencia y abstracción data source para offline. |
| DUA y accesibilidad     | Medio                  | Config y formatters listos; falta integración en UI y preferencias (tema/fuente).      |
| Seguridad y roles       | Alto                   | Guard y store adecuados; backend debe ser la fuente de verdad de autorización.         |

---

## 8. Fortalezas (lo que está bien construido)

1. **Estructura de carpetas** alineada con el documento y con `main.ts` limpio y extensible.
2. **Cadena Servicio → Composable → Vista** clara y respetada; tipos centralizados en `@/types`.
3. **Config y auth** centralizados (`app.config.ts`, guard con roles, store con token y rol).
4. **Placeholder Apollo** y queries GraphQL listas para sustituir mocks sin cambiar composables.
5. **DUA en config y CSS:** tres niveles de fuente y formatters de fechas/texto disponibles.
6. **Seguridad front:** guard por rol, rol desde backend, sin lógica de autorización crítica en cliente.

---

## 9. Riesgos (qué puede volverse problema al crecer)

1. **`src/views/dashboard/DashboardView.vue`:** Objeto `welcome` hardcodeado; crecerá si se añaden más datos de perfil o roles. Mover a store o servicio.
2. **`src/services/*.service.ts`:** Mocks y lógica de “red” mezclados con el contrato público. Al añadir Apollo e offline, puede duplicarse lógica; conviene una capa data source/repository.
3. **`src/router/index.ts`:** Una sola ruta `/dashboard` con varios roles. Al añadir `/docente/planificaciones`, `/pie/seguimiento`, etc., la definición de rutas puede volverse compleja sin una convención (p. ej. prefijos por rol).
4. **Ausencia de PWA y persistencia:** Sin Service Worker ni IndexedDB, el modo offline requerirá refactors mayores si no se diseña antes una capa de almacenamiento/sincronización.
5. **DUA y tema:** Clases y variables existen pero no hay flujo de usuario ni store/composable; el tema claro/oscuro depende solo del sistema.
6. **Tipos duplicados:** `RutaIAState` en composable y forma equivalente en servicio; mejor un solo tipo en `types/`.

---

## 10. Refactorizaciones sugeridas

- **Crear `src/types/academic.ts` (o ampliar `dashboard.ts`):** Definir `RutaIAState` / `RutaIA` una sola vez y usarlo en servicio y composable. Valorar `LoginResponse` y `User` para auth.
- **Introducir capa de datos (cuando se implemente Apollo/offline):** Por ejemplo `src/data/` o `src/repositories/` con módulos por dominio (academic, inclusion, community) que abstraigan “origen” (Apollo vs IndexedDB) y que los servicios actuales llamen o se conviertan en esa capa.
- **Mover “welcome” fuera de la vista:** Store de perfil (p. ej. en `auth` o `user`) o composable `useWelcome()` que lea del store y opcionalmente de un servicio; la vista solo consume estado/reactivo.
- **Composable o store para DUA/tema:** Por ejemplo `useDUA()` o store `preferences` que gestione tamaño de fuente y tema (claro/oscuro), persista en localStorage y aplique clases al root. Así los componentes pueden usar una única fuente de verdad.
- **Directivas (opcional):** Si se repiten patrones de permisos por rol en la UI (ocultar botones, secciones), valorar `src/directives/` con una directiva tipo `v-role` o `v-can` que consulte el rol del store. No sustituye al guard; solo refuerza la coherencia de la UI.
- **Validadores (opcional):** Si aparecen validaciones de formularios (login, PII/PACI, etc.), centralizar en `src/utils/validators.ts` o `src/validators/` para no duplicar reglas entre componentes.
- **Subdividir servicios (cuando crezcan):** Mantener `services/` por dominio (academic, inclusion, community); si un dominio crece mucho (p. ej. PIE con muchos endpoints), subdividir en `academic/dashboard.ts`, `academic/cursos.ts`, etc., o por módulo de negocio (AcademicModule, PIEModule) según el documento.
- **Rutas por rol:** Al añadir módulos Directivo/PIE, definir rutas con prefijo o agrupación por rol (p. ej. `routes/estudiante.ts`, `routes/docente.ts`, `routes/pie.ts`) y combinarlas en `router/index.ts`; usar lazy loading (`() => import('@/views/pie/SeguimientoView.vue')`) para reducir el bundle inicial.

---

## 11. Plan de acción (antes de la fase de responsividad)

1. **Unificar tipo “ruta IA”** en `types/` y usarlo en servicio y composable. (Impacto bajo, evita duplicación.)
2. **Extraer datos “welcome”** a store (auth/user) o composable que lea del store; conectar DashboardView a ese estado. (Evita que la vista acumule más lógica de perfil.)
3. **Definir preferencias DUA/tema:** Añadir store o composable que gestione tamaño de fuente y tema, persista en localStorage y aplique clases/variables al root; opcionalmente un selector mínimo en layout (sin exigir aún diseño completo). (Base para responsividad y accesibilidad.)
4. **Documentar rol en front:** En `auth.guard.ts` o en docs del proyecto, dejar explícito que el rol en localStorage/front es solo para UX y que la autorización la hace el backend en cada petición.
5. **Incluir ROUTE_ROLES.DIRECTIVO y ROUTE_ROLES.APODERADO** en `auth.guard.ts` cuando se vayan a usar rutas para esos roles.
6. **Diseñar (sin implementar aún) la capa data source/repository** para Apollo + offline: responsabilidades, interfaces y dónde viviría IndexedDB/sync. Facilita implementar PWA y modo offline sin refactors grandes después.
7. **Opcional:** Usar formatters en al menos una vista (p. ej. fechas en alertas o listado de recursos) para afianzar el hábito y detectar si falta algún formateo estándar.

Tras estos pasos, la base estará más alineada con el documento técnico y preparada para responsividad, PWA y módulos Directivo/PIE sin reestructuraciones mayores.

---

*Fin del informe.*
