import a1 from '/assets_muni/1.jpeg'
import a2 from '/assets_muni/2.jpeg'
import a3 from '/assets_muni/3.jpeg'
import a4 from '/assets_muni/4.jpeg'
import a5 from '/assets_muni/5.jpeg'
import a6 from '/assets_muni/6.jpeg'
import a7 from '/assets_muni/7.jpeg'
import a8 from '/assets_muni/8.jpeg'
import a9 from '/assets_muni/9.jpeg'
import a10 from '/assets_muni/10.jpeg'
import a11 from '/assets_muni/11.jpeg'
import a12 from '/assets_muni/12.jpeg'
import a13 from '/assets_muni/13.jpeg'
import a14 from '/assets_muni/14.jpeg'
import a15 from '/assets_muni/15.jpeg'
import a16 from '/assets_muni/16.jpeg'
import a17 from '/assets_muni/17.jpeg'
import a18 from '/assets_muni/18.jpeg'
import a19 from '/assets_muni/19.jpeg'
import actual from '/assets_muni/actual.jpeg'
import emptyImage from '/assets_muni/empty.jpg'

export function AlcaldesList() {
    const alcaldeActual = {
        nombre: "Armando Ixtabalan Gómez",
        periodo: "2024-2028",
        image: actual,
    }

    const alcaldesAnteriores = [
        {nombre: "Abrahim Zelada López", periodo: "2021-2024, 2016-2020", image: a1},
        {nombre: "Juan Cástulo López Xicará", periodo: "2012-2016", image: a2},
        {nombre: "Augusto Rene Escobar de León", periodo: "2008-2012, 2004-2008, 2000-2004", image: a3},
        {nombre: "Pablo Rolando Soch López", periodo: "1996-2000, 1993-1996, 1986-1988", image: a4},
        {nombre: "Francisco Santos Gonón", image: a5},
        {nombre: "Eleuterio de Jesús Escobar de Paz", image: a6},
        {nombre: "David Antonio Hurtado Mazariegos", image: a18},
        {nombre: "Cirilo Ortiz Jocol"},
        {nombre: "Pablo de Jesús Escobar Mazariegos", image: a16},
        {nombre: "Carlos Armando Aguilar Maldonado", image: a11},
        {nombre: "Agustín Santos Cifuentes", image: a10},
        {nombre: "Diego Martin Miranda Alvarado", image: a17},
        {nombre: "Manuel Beletzuy H."},
        {nombre: "Cesar Augusto Soto Barrios"},
        {nombre: "Ramón Guinac García", image: a14},
        {nombre: "Rosario Escobar Barrios", image: a7},
        {nombre: "Candido Gonon", image: a12},
        {nombre: "Desiderio Coyoy", image: a8},
        {nombre: "Cresencio Oroxóm"},
        {nombre: "Manuel Morales"},
        {nombre: "Victor Rodas Reyes", image: a9},
        {nombre: "Marcelino Jocol", image: a13},
        {nombre: "Florencio Escobar"},
        {nombre: "Transito Rodas"},
        {nombre: "Ramiro Rodas Reyes"},
        {nombre: "Erasmo Reyes"},
        {nombre: "Jacinto D. Ordofiez"},
        {nombre: "Tiburcio Santos"},
        {nombre: "Eusebio Oroxém"},
        {nombre: "Alberto Loarca"},
        {nombre: "Basilio Santos", image: a15},
        {nombre: "Carlos Escobar"},
        {nombre: "Bonifacio Coyoy"},
        {nombre: "Alejandro Aguilar Samayoa"},
        {nombre: "Feliciano Minera"},
        {nombre: "Carlos Cirilo Rosal"},
        {nombre: "Macario Arango"},
        {nombre: "Manuel Beletzuy"},
        {nombre: "Cipriano Garcia"},
        {nombre: "Basilio Garcia"},
        {nombre: "Cresencio Cotom"},
        {nombre: "Jacinto Escobar", image: a19},
    ]

    return (
        <div className="container my-5">
            <h3 className="mb-4">Alcaldes de La Esperanza</h3>

            {/* Alcalde Actual */}
            <div className="row align-items-center justify-content-center">
                <div className="card mb-4 col-md-4 col-12">
                    <img src={alcaldeActual.image ? alcaldeActual.image : emptyImage}
                         alt={`Alcalde ${alcaldeActual.nombre}`}/>
                    <div className="card-body text-center">
                        <h4 className="card-title">Alcalde Actual</h4>
                        <h5 className="card-subtitle mb-2 text-muted">{alcaldeActual.nombre}</h5>
                        <p className="card-text">Periodo: {alcaldeActual.periodo}</p>
                    </div>
                </div>
            </div>

            {/* Alcaldes Anteriores */}
            <h4 className="mb-3">Alcaldes Anteriores</h4>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {alcaldesAnteriores.map((alcalde, index) => (
                    <div key={index} className="col">
                        <div className="card h-100">
                            <img src={alcalde.image ? alcalde.image : emptyImage} alt={`Alcalde ${alcalde.nombre}`}/>
                            <div className="card-body align-items-center justify-content-center d-flex flex-column">
                                <h5 className="card-title text-center">{alcalde.nombre}</h5>
                                {alcalde.periodo && (
                                    <p className="card-text text-center">Periodos: {alcalde.periodo}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}