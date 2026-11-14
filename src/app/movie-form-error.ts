export function getMovieSaveError(status: number, action: 'create' | 'update'): string {
  if (status === 0) {
    return 'No se pudo conectar con el servidor. Comprueba que Spring Boot esté en ejecución.';
  }

  if (status === 400) {
    return 'El servidor rechazó los datos. Revisa que todos los campos sean válidos.';
  }

  if (status === 404 && action === 'update') {
    return 'La película que intentas editar ya no existe en el catálogo.';
  }

  return action === 'create'
    ? 'No se pudo agregar la película. Inténtalo de nuevo.'
    : 'No se pudo guardar la película. Inténtalo de nuevo.';
}
