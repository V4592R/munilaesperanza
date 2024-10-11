export function HomePage() {
    return (
        <div className="container py-5">
            <header className="text-center mb-5">
                <h1 className="display-4 mb-3">MUNICIPALIDAD DE LA ESPERANZA</h1>
                <p className="lead text-muted">
                    DEPARTAMENTO DE QUETZALTENANGO, GUATEMALA, C.A.
                </p>
            </header>

            <section className="mb-5 d-flex align-items-center justify-content-center">
                <img
                    src="/src/assets/logo.jpg"
                    alt="Logo de la municipalidad"
                    width={300}
                    height={300}
                />
            </section>

            <div className="row mb-5">
                <div className="col-md-6 mb-4 mb-md-0">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title h4">Misión</h2>
                            <p className="card-text">
                                Somos un gobierno municipal que tiene como
                                fin primordial prestar y administrar los
                                servicios básicos, promover e impulsar
                                proyectos de desarrollo comunitario para los
                                vecinos bajo la jurisdicción territorial,
                                garantizando su funcionamiento y
                                mantenimiento de una forma eficiente y
                                segura, mejorando con ello la calidad de vida
                                de los habitantes.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title h4">Visión</h2>
                            <p className="card-text">
                                El gobierno municipal del Municipio de la
                                Esperanza, generara condiciones y
                                oportunidades para que los vecinos alcancen
                                un alto nivel en la calidad de vida, en un
                                municipio moderno y seguro, donde el
                                desarrollo se promueva de manera integral y
                                sustentable; aprovechando los recursos y
                                potencialidades con que cuenta nuestro
                                municipio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="mb-5">
                <h2 className="h3 mb-4">Nuestros valores</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    {["Servicio", "Excelencia", "Puntualidad", "Responsabilidad", "Trabajo en equipo", "Comunicación", "Honestidad"].map((value) => (
                        <div key={value} className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title h5">{value}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}