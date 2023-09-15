import { useEffect } from 'react'
import { useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
    presupuesto, SetPresupuesto,
    gastos, SetGastos,
    SetIsValidPresupuesto
}) => {

    const [disponible, SetDisponible] = useState(0)
    const [gastado, SetGastado] = useState(0)
    const [porcentaje, SetPorcentaje] = useState(0)

    useEffect(() => {
        {/*ITERA SOBRE EL ARREGLO DE GASTOS creando un arrow function que maneja un total y le suma cada gasto 
        empezando en 0; reduce es una función para un array*/}
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        {/*Cálculo del porcentaje de lo disponible/gastado; dejándole dos decimales*/ }
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        SetGastado(totalGastado)
        SetDisponible(totalDisponible)

        {/*actualiza el state PORCENTAJE luego de un tiempo para permitir cierta animación en la gráfica*/ }
        setTimeout(() => {
            SetPorcentaje(nuevoPorcentaje)
        }, 1000)
    }, [gastos])

    const formatearPresupuesto = (cantidad) => {
        return cantidad.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }

    const handleReinicio= () => {
        const resultado= confirm('¿Deseas reiniciar el presupuest?')

        if (resultado){
            SetGastos([])
            SetPresupuesto(0)
            SetIsValidPresupuesto(false)
        }
    }
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                {/*pathColor es la barra de llenado, trailColor es la que falta por llenar*/}
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
                        trailColor: "#F5F5F5",
                        textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6"
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% gastado`}
                />
            </div>

            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={handleReinicio}>
                    Reiniciar presupuesto
                </button>

                <p>
                    <span>Presupuesto: </span> {formatearPresupuesto(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span>Disponible: </span> {formatearPresupuesto(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {formatearPresupuesto(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
