import React, { useState } from 'react';

function ModalConfirmacion() {
  const [confirmacion, setConfirmacion] = useState(false);

  const handleBorrarUsuario = () => {
    if (confirmacion) {
      // Lógica para borrar el usuario
      console.log('Usuario borrado');
    } else {
      setConfirmacion(true);
    }
  };

  const handleCancelarBorrado = () => {
    setConfirmacion(false);
  };

  return (
    <div>
      {confirmacion ? (
        <div>
          <p>¿Estás seguro de borrar este usuario?</p>
          <button onClick={handleBorrarUsuario}>Confirmar</button>
          <button onClick={handleCancelarBorrado}>Cancelar</button>
        </div>
      ) : (
        <button onClick={handleBorrarUsuario}>Borrar usuario</button>
      )}
    </div>
  );
}
export default ModalConfirmacion;