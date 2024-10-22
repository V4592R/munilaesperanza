export function PhoneDirectory() {
    const phoneNumbers = [
        {name: 'Municipalidad la Esperanza', numbers: ['7772-0578', '7772-1276']},
        {name: 'Policía Nacional Civil de la Esperanza', numbers: ['4056-3357']},
        {name: 'Bomberos voluntarios 94 compañía', numbers: ['7772-0692']},
        {name: 'Policía de transito', numbers: ['7772-0584']},
        {name: 'Ministerio Publico La Esperanza', numbers: ['5453-2083']},
        {name: 'Regulador Militar Quetzaltenango', numbers: ['4497-4331']},
    ]

    return (
        <div>
            <h3 className="mb-4">Directorio Telefónico</h3>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {phoneNumbers.map((item, index) => (
                    <div key={index} className="col">
                        <div className="card p-3">
                            <h5 className="mb-1">{item.name}</h5>
                            {item.numbers.map((number, idx) => (
                                <p key={idx} className="mb-0">
                                    <a href={`tel:${number}`}>
                                        {number}
                                    </a>
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}