import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import { formatearFecha } from '../helpers'

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const Gasto = ({ gasto, SetGastoEditar, eliminarGasto }) => {
    const { categoria, nombre, cantidad, fecha, id } = gasto

    {/*Al ser () en vez de {},indica que va a renderizar un componente al invocar la función*/ }
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => SetGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    {/*DESTRUCTIVE en trailingActions permite la desaparición con animación en el caso de eliminar objeto*/}
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
            onClick={() => eliminarGasto(id)}
            destructive={true}>
                Borrar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            {/*
            leadingActions será la función a ejecutarse al dar swipe para la derecha
            trailingActions lo mismo pero para el swipe a la izquierda
            */}
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>

                    <div className='contenido-gasto'>

                        <img
                            alt="icono-gasto"
                            src={diccionarioIconos[categoria]}
                        />

                        <div className='descripcion-gasto'>
                            <p className='categoria'>{categoria}</p>
                            <p className='nombre-gasto'>{nombre}</p>
                            <p className='fecha-gasto'>
                                Agregado el: {""}
                                <span>{formatearFecha(fecha)}</span>
                            </p>
                        </div>

                    </div>

                    <p className='cantidad-gasto'>${cantidad}</p>

                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto
