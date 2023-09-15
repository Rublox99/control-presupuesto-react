import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import Filtro from './components/Filtro'
import { generarId } from './helpers' //no se requiere el nombre del archivo porque se llama index.js
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  {/*si no existe el elemento PRESUPUESTO en LocalStorage, define un 0*/}
  const [presupuesto, SetPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0 
  )
  const [isValidPresupuesto, SetIsValidPresupuesto] = useState(false)

  const [modal, SetModal] = useState(false)
  const [animarModal, SetAnimarModal] = useState(false)

  {/*comprueba si hay gastos guardados en el elemento 'gastos' en LS; si hay, los obtiene convertidos en arreglo, 
  si no, empieza el State con un arreglo vacío*/}
  const [gastos, SetGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [gastoEditar, SetGastoEditar] = useState({})

  const [filtro, SetFiltro]= useState("")
  const [gastosFiltrados, SetGastosFiltrados]= useState([])

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      SetModal(true)

      setTimeout(() => {
        SetAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])

  /*Almacena en LS el Presupuesto Ingresado inicialmente*/
  useEffect( () => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  /*Almacena en LS los cambios dados en Gastos*/
  useEffect( () => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  /*CONSULTA SI HAY ALGO EN LOCALSTORAGE PARA GUARDARLO EN UN STATE*/
  useEffect ( () => {
    const presupuestoLS= Number(localStorage.getItem('presupuesto')) ?? 0

    /*si el presupuesto de LS es mayor a 0, salta la pantalla inicial de ingresar presupuesto*/
    if (presupuestoLS > 0){
      SetIsValidPresupuesto(true)
    } else {

    }
  }, [])

  /*Se enfoca en los CAMBIOS DEL STATE FILTRO*/
  useEffect ( () => {
    /*FILTRA POR CATEGORÍA si se ha seleccionado un elemento desde el SELECT de Filtro.jsx*/
    if (filtro){
      const gastosFiltrados= gastos.filter( gasto => gasto.categoria === filtro) /*retorna todo gasto que cumpla la equivalencia*/
    
      SetGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    SetModal(true)
    SetGastoEditar({}) /*VACÍA EL STATE editarGasto si se quiere crear un gasto nuevo desde el modal*/

    setTimeout(() => {
      SetAnimarModal(true)
    }, 500)
  }

  const guardarGasto = gasto => {
    if (gasto.id){
      //ACTUALIZA
      /*ubica el gasto con el id cargado en el State gastoEditar; si son iguales retorna el gasto editado, 
      si no, retorna el elemento sin alterar; DE IGUAL MODO RETORNA UN ARREGLO DE GASTOS*/
      const gastosActualizados= gastos.map ( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      SetGastos(gastosActualizados);
      SetGastoEditar({})

    } else{
      //GUARDA UN NUEVO GASTO
      gasto.id = generarId(); //le añade un atributo id al objeto gasto
      gasto.fecha= Date.now();
      SetGastos([...gastos, gasto])
    }

    //CIERRAN EL MODAL JUNTO CON SU ANIMACIÓN
    SetAnimarModal(false);

    setTimeout(() => {
      SetModal(false);
    }, 500)
  }

  const eliminarGasto= id => {
    const gastosActualizados= gastos.filter( gasto => gasto.id!==id)

    SetGastos(gastosActualizados)
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        SetPresupuesto={SetPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        SetIsValidPresupuesto={SetIsValidPresupuesto}
        gastos= {gastos}
        SetGastos= {SetGastos}
      />

      {isValidPresupuesto ? (
        <>
          <main>
            <Filtro
              filtro= {filtro}
              SetFiltro= {SetFiltro}
            />
            <ListadoGastos
              gastos= {gastos}
              SetGastoEditar= {SetGastoEditar}
              eliminarGasto= {eliminarGasto}
              filtro= {filtro}
              gastosFiltrados= {gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt="icono-nuevoGasto" onClick={handleNuevoGasto} />
          </div>
        </>
      ) : null}

      {modal &&
        <Modal
          SetModal={SetModal}
          animarModal={animarModal}
          SetAnimarModal={SetAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar= {gastoEditar}
          SetGastoEditar= {SetGastoEditar}
        />}
    </div>
  )
}

export default App
