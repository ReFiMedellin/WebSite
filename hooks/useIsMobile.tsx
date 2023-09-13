import { useEffect, useState } from 'react';

/**
 * useIsMobile
 * 
 * Esta función es un hook personalizado de React que devuelve un valor booleano
 * que indica si la pantalla tiene una anchura menor a 768px.
 *
 * @returns {boolean} - Verdadero si la pantalla es menor a 768px, falso en caso contrario.
 */
const useIsMobile = (): boolean => {
  // Verifica si window está definido antes de acceder a innerWidth
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    // Solo añade el event listener si window está definido
    if (typeof window !== 'undefined') {
      // Manejador para actualizar el estado basado en el tamaño de la ventana
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      };

      // Escuchar el evento de redimensionado de la ventana
      window.addEventListener('resize', handleResize);

      // Eliminar el oyente del evento cuando el componente se desmonte
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);  // La dependencia vacía significa que useEffect se ejecutará solo una vez después del primer render

  return isMobile;
};

export default useIsMobile;
