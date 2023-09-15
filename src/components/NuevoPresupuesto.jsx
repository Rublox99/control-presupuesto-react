import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto= ({presupuesto, SetPresupuesto, SetIsValidPresupuesto}) => {

    const [mensaje, setMensaje]= useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if (!presupuesto || presupuesto<0){
            setMensaje("No es un presupuesto válido")

            return {/*rompe el ciclo de la función; similar a un break*/}
        } else{
            setMensaje("")
            SetIsValidPresupuesto(true)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">

            <form className="formulario" onSubmit={handlePresupuesto}>
                <div className="campo">
                    <label>
                        Definir presupuesto
                    </label>
                    <input className="nuevo-presupuesto" 
                    type="number" 
                    placeholder="Añade tu presupuesto" 
                    value={presupuesto} onChange={ e => SetPresupuesto(Number(e.target.value))}/>
                </div>
                <input type="submit" value="Añadir"/>

                {/*error es el prop tipo; {mensaje} es el prop children*/}
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
            
        </div>
    )
}

export default NuevoPresupuesto