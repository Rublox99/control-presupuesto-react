import { useState, useEffect} from 'react'

const Filtro = ({filtro, SetFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label htmlFor="">Filtrar</label>
                <select 
                    value={filtro}
                    onChange={ e => SetFiltro(e.target.value)}
                >
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
        </form>
    </div>
  )
}

export default Filtro
