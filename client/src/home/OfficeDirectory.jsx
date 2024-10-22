export function OfficeDirectory() {
    const officeData = [
        {
            level: "1er. Nivel",
            departments: [
                {
                    name: "Servicios Públicos",
                    offices: [
                        { name: "Asistente de OMAS", extension: "228" },
                        { name: "Encargado del Mercado", extension: "225" }
                    ]
                },
                {
                    name: "UGAM",
                    offices: [
                        { name: "Director de la UGAM", extension: "219" },
                        { name: "Encargado de Personas Jurídicas", extension: "213" },
                        { name: "Encargado de COCODES", extension: "223" }
                    ]
                },
                {
                    name: "Recepción",
                    offices: [
                        { name: "Atención al Vecino", extension: "200" }
                    ]
                }
            ]
        },
        {
            level: "2do. Nivel",
            departments: [
                {
                    name: "Catastro-IUSI-O.T.",
                    offices: [
                        { name: "Director de O.T.", extension: "209" },
                        { name: "Catastro y/o IUSI", extension: "216" },
                        { name: "Secretaria de Síndicos", extension: "205" }
                    ]
                },
                {
                    name: "Juzgado de Asuntos Municipales",
                    offices: [
                        { name: "Jueza de Asuntos Municipales", extension: "211" }
                    ]
                },
                {
                    name: "Juzgado de Asuntos Municipales de Tránsito",
                    offices: [
                        { name: "Jueza de Tránsito", extension: "217" }
                    ]
                },
                {
                    name: "Dirección Municipal de la Mujer",
                    offices: [
                        { name: "Directora de la DMM", extension: "214" }
                    ]
                },
                {
                    name: "Oficina Municipal de Protección Niñez, Adolescencia y Juventud",
                    offices: [
                        { name: "Encargada de la OMPNAJ", extension: "207" },
                        { name: "Oficina de la OMPNAJ", extension: "206" }
                    ]
                },
                {
                    name: "Policía Municipal",
                    offices: [
                        { name: "Director PM", extension: "227" },
                        { name: "Cámaras de Vigilancia", extension: "210" }
                    ]
                }
            ]
        },
        {
            level: "3er. Nivel",
            departments: [
                {
                    name: "Alcaldía",
                    offices: [
                        { name: "Alcalde", extension: "233" },
                        { name: "Asistente de Alcaldía", extension: "232" }
                    ]
                },
                {
                    name: "Secretaría Municipal",
                    offices: [
                        { name: "Secretario Municipal", extension: "229" }
                    ]
                },
                {
                    name: "Dirección Administrativa Financiera Integrada Municipal",
                    offices: [
                        { name: "Director Financiero", extension: "201" }
                    ]
                },
                {
                    name: "Dirección de Planificación Municipal",
                    offices: [
                        { name: "Director DMP", extension: "231" },
                        { name: "Sala de Juntas", extension: "215" }
                    ]
                },
                {
                    name: "Recursos Humanos",
                    offices: [
                        { name: "Directora de Recursos Humanos", extension: "204" }
                    ]
                },
                {
                    name: "Dirección de Acceso a la Información Pública",
                    offices: [
                        { name: "Director de Acceso a la Información", extension: "280" }
                    ]
                },
                {
                    name: "Comunicación Social",
                    offices: [
                        { name: "Encargado de Comunicación Social", extension: "202" }
                    ]
                },
                {
                    name: "Asesoría Jurídica",
                    offices: [
                        { name: "Asesora", extension: "235" }
                    ]
                }
            ]
        },
        {
            level: "Sótano",
            departments: [
                {
                    name: "Almacén",
                    offices: [
                        { name: "Almacén", extension: "220" }
                    ]
                }
            ]
        }
    ]

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Directorio de Oficinas</h1>
            {officeData.map((level, levelIndex) => (
                <div key={levelIndex} className="mb-4">
                    <h2 className="bg-primary text-white p-2 rounded">{level.level}</h2>
                    {level.departments.map((department, deptIndex) => (
                        <div key={deptIndex} className="mb-3">
                            <h3 className="bg-dark-subtle text-white p-2 rounded">{department.name}</h3>
                            <ul className="list-group">
                                {department.offices.map((office, officeIndex) => (
                                    <li key={officeIndex} className="list-group-item d-flex justify-content-between align-items-center">
                                        {office.name}
                                        <span className="badge bg-primary rounded-pill">{office.extension}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}