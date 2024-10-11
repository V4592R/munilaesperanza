import {FormComponent} from "src/components/form/FormComponent.jsx";
import {validate, validators, combine} from "validate-redux-form";
import {Field, Form} from "react-final-form";
import {Button} from "reactstrap";
import {InputField, InputNumberField, InputNumberPatternField} from "src/components/AppInput.jsx";
import jsPDF from "jspdf";
import moment from "moment";

const validateForm = (values) => {
    return validate(values, {
        names: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 50})('Máximo 50 caracteres'),
        ),
        last_names: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 50})('Máximo 50 caracteres'),
        ),
        phone_number: combine(
            validators.exists()("Campo requerido"),
            validators.length({min: 8})('Número inválido'),
        ),
        dpi: combine(
            validators.exists()("Campo requerido"),
            validators.length({min: 13})('DPI no válido'),
        ),
        place: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 100})('Máximo 50 caracteres'),
        ),
        nit: validators.exists()("Campo requerido"),
        place_to_notify: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 50})('Máximo 50 caracteres'),
        ),
        work_place: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 100})('Máximo 50 caracteres'),
        ),
        address_work: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 100})('Máximo 50 caracteres'),
        ),
        phone_number_work: combine(
            validators.exists()("Campo requerido"),
            validators.length({min: 8})('Número inválido'),
        ),
        reference_1_name: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 100})('Máximo 50 caracteres'),
        ),
        reference_1_address: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 100})('Máximo 50 caracteres'),
        ),
        reference_1_phone_number: combine(
            validators.exists()("Campo requerido"),
            validators.length({min: 8})('Número inválido'),
        ),
        reference_1_relationship: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 30})('Máximo 50 caracteres'),
        ),
        reference_2_name: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 100})('Máximo 50 caracteres'),
        ),
        reference_2_address: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 100})('Máximo 50 caracteres'),
        ),
        reference_2_phone_number: combine(
            validators.exists()("Campo requerido"),
            validators.length({min: 8})('Número inválido'),
        ),
        reference_2_relationship: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 30})('Máximo 50 caracteres'),
        ),
        install_place: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 150})('Máximo 150 caracteres'),
        ),
    })
};

async function createPdf({data}) {
    const {
        names = '',
        last_names = '',
        married_last_name = '',
        phone_number = '',
        dpi = '',
        place = '',
        nit = '',
        place_to_notify = '',
        work_place = '',
        address_work = '',
        phone_number_work = '',
        reference_1_name = '',
        reference_1_address = '',
        reference_1_phone_number = '',
        reference_1_relationship = '',
        reference_2_name = '',
        reference_2_address = '',
        reference_2_phone_number = '',
        reference_2_relationship = '',
        install_place = '',
    } = data;
    const pageWidth = 8.5,
        lineHeight = 1.2,
        margin = 0.5,
        maxLineWidth = pageWidth - margin * 2,
        fontSize = 12,
        ptsPerInch = 72,
        oneLineHeight = (fontSize * lineHeight) / ptsPerInch,
        text =
            `Señor
Armando Ixtabalán Gómez
Alcalde Municipal y su
Concejo municipal

La Esperanza

Respetables Señores:

Ante ustedes respetuosamente les presento la solicitud con los siguientes datos:

NOMBRES: ${names}, APELLIDOS: ${last_names},${married_last_name ? ' APELLIDO DE CASADA: ' : ''}${married_last_name ? `${married_last_name},`: ''}
D.P.I NO: ${dpi}
EXTENDIDA EN: ${place}
NIT: ${nit} TELÉFONO: ${phone_number}
DIRECCIÓN PARA RECIBIR NOTIFICACIÓN: ${place_to_notify}
LUGAR DE TRABAJO: ${work_place}
DIRECCIÓN: ${address_work}
TELÉFONO: ${phone_number_work}
REFERENCIA FAMILIAR
NOMBRE: ${reference_1_name}, DIRECCIÓN: ${reference_1_address},
TELÉFONO ${reference_1_phone_number}, PARENTESCO: ${reference_1_relationship}
REFERENCIA FAMILIAR
NOMBRE: ${reference_2_name}, DIRECCIÓN: ${reference_2_address}
TELÉFONO ${reference_2_phone_number}, PARENTESCO: ${reference_2_relationship}

Atentamente SOLICITO: me vendan UN SERVICIO DE MEDIA PAJA DE AGUA POTABLE, para instalarse en dirección exacta: ${install_place}

Me comprometo desde ya a pagar la cuota mensual de canon que se estipule, así como aceptar los reglamentos que la adquisición de éste servicio requiera-------------------------------------------------------------------------------------
En espera de una respuesta favorable, me suscribo de usted, atentamente.

La Esperanza ${moment().format('dddd, LL')}

F. _______________
`,


        doc = new jsPDF({
            unit: "in",
            lineHeight: lineHeight
        }).setProperties({title: "Solicitud"});

// splitTextToSize takes your string and turns it in to an array of strings,
// each of which can be displayed within the specified maxLineWidth.
    var textLines = doc
        .setFont("helvetica")
        .setFontSize(fontSize)
        .splitTextToSize(text, maxLineWidth);

// doc.text can now add those lines easily; otherwise, it would have run text off the screen!
    doc.text(textLines, margin, margin + 2 * oneLineHeight);
    doc.save('solicitud.pdf')
}

export const WaterForm = () => {
    return (
        <FormComponent
            parentPath={'/'}
            createItem={createPdf}
            pageName='Agua'
            successTitle='Completado'
            showDefaultTitle={false}
            title='Formulario de solicitud de agua'
            navigateCreationSuccess={false}
            render={({initialValues, onSubmit, id}) => (
                <Form
                    onSubmit={onSubmit}
                    validate={validateForm}
                    initialValues={initialValues}
                    render={({handleSubmit, form, submitting}) => (
                        <div
                            className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-8 mx-auto mt-2">
                            <form onSubmit={handleSubmit} className='w-100'>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="names"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. Emanuel Alexander"
                                            label="Nombres"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="last_names"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. Orozco"
                                            label="Apellidos"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="married_last_name"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. Orozco"
                                            label="Apellido de casada"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="dpi"
                                            render={InputNumberPatternField}
                                            numberFormat="#### ##### ####"
                                            type="text"
                                            placeholder="Ej. 0000 00000 0000"
                                            label="D.P.I No"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="place"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. Quetzaltenango"
                                            label="Extendida en"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="nit"
                                            render={InputNumberField}
                                            allowNegative={false}
                                            placeholder="Ej. 5456444533"
                                            label="NIT"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="phone_number"
                                            render={InputNumberPatternField}
                                            placeholder="Ej. 3234 2423"
                                            numberFormat="#### - ####"
                                            label="Número de teléfono"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="place_to_notify"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. 4ta Calle, Zona 1"
                                            label="Dirección para recibir notificación"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="work_place"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. Empresa Ejemplo..."
                                            label="Lugar de trabajo"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="address_work"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. 4ta Calle, Zona 1"
                                            label="Dirección (Trabajo)"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="phone_number_work"
                                            render={InputNumberPatternField}
                                            placeholder="Ej. 3234 2423"
                                            numberFormat="#### - ####"
                                            label="Teléfono (Trabajo)"
                                        />
                                    </div>
                                </div>
                                <strong>Referencia personal 1</strong>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="reference_1_name"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. Orozco"
                                            label="Nombre"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="reference_1_address"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. 4ta Calle"
                                            label="Dirección"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="reference_1_phone_number"
                                            render={InputNumberPatternField}
                                            placeholder="Ej. 3234 2423"
                                            numberFormat="#### - ####"
                                            label="Teléfono"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="reference_1_relationship"
                                            render={InputField}
                                            placeholder="Ej. Hermano"
                                            type='text'
                                            label="Parentezco"
                                        />
                                    </div>
                                </div>
                                <strong>Referencia personal 2</strong>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="reference_2_name"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. Orozco"
                                            label="Nombre"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="reference_2_address"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. 4ta Calle"
                                            label="Dirección"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="reference_2_phone_number"
                                            render={InputNumberPatternField}
                                            placeholder="Ej. 3234 2423"
                                            numberFormat="#### - ####"
                                            label="Teléfono"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="reference_2_relationship"
                                            render={InputField}
                                            placeholder="Ej. Hermano"
                                            type='text'
                                            label="Parentezco"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="install_place"
                                            render={InputField}
                                            placeholder="Ej. 4ta Calle"
                                            type='text'
                                            label="Lugar de instalación"
                                        />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Button
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                        block
                                    >
                                        {"Enviar"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                />
            )}/>
    );
};
