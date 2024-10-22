export function AlcaldesList() {
    const alcaldeActual = {
        nombre: "Armando Ixtabalan Gómez",
        periodo: "2024-2028"
    }

    const alcaldesAnteriores = [
        { nombre: "Abrahim Zelada López", periodo: "2021-2024" },
        { nombre: "Abrahim Zelada López", periodo: "2016-2020" },
        { nombre: "Juan Cástulo López Xicará", periodo: "2012-2016" },
        { nombre: "Augusto Rene Escobar de León", periodo: "2008-2012" },
        { nombre: "Augusto Rene Escobar de León", periodo: "2004-2008" },
        { nombre: "Augusto Rene Escobar de León", periodo: "2000-2004" },
        { nombre: "Pablo Rolando Soch López", periodo: "1996-2,000" },
        { nombre: "Pablo Rolando Soch López", periodo: "1993-1996" },
        { nombre: "Francisco Santos Gonón" },
        { nombre: "Eleuterio de Jesús Escobar de Paz" },
        { nombre: "Pablo Rolando Soch López", periodo: "1986-1988" },
        { nombre: "David Antonio Hurtado Mazariegos" },
        { nombre: "Cirilo Ortiz Jocol" },
        { nombre: "Pablo de Jesús Escobar Mazariegos" },
        { nombre: "Carlos Armando Aguilar Maldonado" },
        { nombre: "Agustín Santos Cifuentes" },
        { nombre: "Diego Martin Miranda Alvarado" },
        { nombre: "Manuel Beletzuy H." },
        { nombre: "Cesar Augusto Soto Barrios" },
        { nombre: "Ramón Guinac García" },
        { nombre: "Rosario Escobar Barrios" },
        { nombre: "Candido Gonon" },
        { nombre: "Desiderio Coyoy" },
        { nombre: "Cresencio Orox6m" },
        { nombre: "Manuel Morales" },
        { nombre: "Victor Rodas Reyes" },
        { nombre: "Marcelino Jocol" },
        { nombre: "Florencio Escobar" },
        { nombre: "Transito Rodas" },
        { nombre: "Ramiro Rodas Reyes" },
        { nombre: "Erasmo Reyes" },
        { nombre: "Jacinto D. Ordofiez" },
        { nombre: "Tiburcio Santos" },
        { nombre: "Eusebio Oroxém" },
        { nombre: "Alberto Loarca" },
        { nombre: "Basilio Santos" },
        { nombre: "Carlos Escobar" },
        { nombre: "Bonifacio Coyoy" },
        { nombre: "Alejandro Aguilar Samayoa" },
        { nombre: "Feliciano Minera" },
        { nombre: "Carlos Cirilo Rosal" },
        { nombre: "Macario Arango" },
        { nombre: "Manuel Beletzuy" },
        { nombre: "Cipriano Garcia" },
        { nombre: "Basilio Garcia" },
        { nombre: "Cresencio Cotom" },
        { nombre: "Jacinto Escobar" },
    ]

    return (
        <div className="container my-5">
            <h3 className="mb-4">Alcaldes de La Esperanza</h3>

            {/* Alcalde Actual */}
            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="card-title">Alcalde Actual</h4>
                    <h5 className="card-subtitle mb-2 text-muted">{alcaldeActual.nombre}</h5>
                    <p className="card-text">Periodo: {alcaldeActual.periodo}</p>
                </div>
            </div>

            {/* Alcaldes Anteriores */}
            <h4 className="mb-3">Alcaldes Anteriores</h4>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {alcaldesAnteriores.map((alcalde, index) => (
                    <div key={index} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{alcalde.nombre}</h5>
                                {alcalde.periodo && (
                                    <p className="card-text">Periodo: {alcalde.periodo}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}