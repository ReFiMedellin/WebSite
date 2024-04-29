export function getDaysBetween(timestamp: number) {
  const date1 = new Date();
  const date2 = new Date(timestamp * 1000);

  // Calcular la diferencia en milisegundos
  const diff = Math.abs(date2.getTime() - date1.getTime());

  // Convertir la diferencia a días
  const days = diff / (1000 * 60 * 60 * 24);

  return Math.floor(days);
}
