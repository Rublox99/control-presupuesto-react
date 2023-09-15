import React, { useState, useEffect } from 'react'
import CerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({
    SetModal, 
    animarModal, 
    SetAnimarModal, 
    guardarGasto, 
    gastoEditar,
    SetGastoEditar}) => {

    const [mensaje, SetMensaje]= useState("")

    const [nombre, SetNombre]= useState("")
    const [cantidad, SetCantidad]= useState("")
    const [categoria, SetCategoria]= useState("")
    const [fecha, SetFecha]= useState("")
    const [id, SetId]= useState("")

    {/*VERIFICA HAY UN STATE CARGADO EN gastoEditar para cargarlo en el formulario; si no, implica es un gasto nuevo*/}
    useEffect( () => {
        if(Object.keys(gastoEditar).length > 0){
            SetNombre(gastoEditar.nombre)
            SetCantidad(gastoEditar.cantidad)
            SetCategoria(gastoEditar.categoria)
            SetId(gastoEditar.id)
            SetFecha(gastoEditar.fecha)
        }
    }, [])
  
    const cerrarModal = () => {
        SetAnimarModal(false);
        SetGastoEditar({})

        setTimeout( () => {
            SetModal(false);
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if ( [nombre, cantidad, categoria].includes("")){
            setTimeout( () => {
                SetMensaje("Todos los campos son obligatorios")
            }, 1000)

            return
        } else {
            guardarGasto({nombre, cantidad, categoria, id, fecha})
        }
    }
  
    return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img src={CerrarModal} alt="icono-cerrarNuevoGasto" onClick={cerrarModal}/>
        </div>

        {/*varia el className según se haya activado o no el estado Modal*/}
        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        >
            <legend>{gastoEditar.id ? "Editar Gasto" : "Nuevo Gasto"}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre de gasto</label>
                <input id="nombre" type="text" placeholder='Añade el nombre del gasto'
                value={nombre} onChange={e => SetNombre(e.target.value)}/>
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>
                <input id="cantidad" type="number" placeholder='Añade la cantidad del gasto: ej.500'
                value={cantidad} onChange={e => SetCantidad(Number(e.target.value))}/> {/*NECESARIO sea Number
                para futuro formato de dinero en ControlPresupuesto*/}
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoría</label>
                <select id="categoria" value={categoria} onChange={ e => SetCategoria(e.target.value)}>
                    <option value="">-Seleccione-</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input type="submit" value={gastoEditar.id ? "Guardar cambios" : "Añadir Gasto"}/>
        </form>
    </div>
  )
}

export default Modal
