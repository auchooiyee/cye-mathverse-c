export const lobbyInclude="<!-- CYE-LOBBY-NAV --><script defer src=\"../../shared/lobby-nav.js\"></script><!-- /CYE-LOBBY-NAV -->";
export function originalGameBytes(bytes){return Buffer.from(bytes.toString().replace(lobbyInclude,''));}
