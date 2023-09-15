import React from 'react'

{/*
CHILDREN es el elemento html que se le pasa como prop desde el submit inicial
TIPO es el prop variable que igual se pasa desde el submit

alerta error por ejemplo: ya es un elemento con atributos css creados
*/}
const Mensaje = ({children, tipo}) => {
  return (
    <div className={`alerta  ${tipo}`}> {/*CREA UNA CLASE HIJO SEGÚN EL TIPO DE MENSAJE PARA MOSTRAR EN HTML*/}
        {children}
    </div>
  )
}

export default Mensaje
