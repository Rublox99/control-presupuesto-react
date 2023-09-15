import React from "react"
import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

const Header = ({
    presupuesto, SetPresupuesto,
    isValidPresupuesto, SetIsValidPresupuesto,
    gastos, SetGastos }) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {isValidPresupuesto ? (
                <ControlPresupuesto
                    presupuesto= {presupuesto}
                    SetPresupuesto= {SetPresupuesto}
                    gastos= {gastos}
                    SetGastos= {SetGastos}
                    SetIsValidPresupuesto= {SetIsValidPresupuesto}
                />
            ) : (
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    SetPresupuesto={SetPresupuesto}
                    SetIsValidPresupuesto={SetIsValidPresupuesto}
                />
            )}

        </header>
    )
}

export default Header