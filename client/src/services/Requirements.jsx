import {Button} from "reactstrap"
import {Field} from "react-final-form"
import {InputAsyncCreatable} from "src/components/AppInput"
import {getRequirements, createRequirement} from "src/config/api.js";
import {useUser} from "src/utils/useUser.js";
import {useCallback} from "react";
import {v4 as uuidv4} from 'uuid';

export const RequirementItemField = ({fields, meta: {error}, form}) => {
    const user = useUser();
    const getRequirementOptions = useCallback(async (search) => {
        try {
            const usedIds = fields?.value?.map(v => v.id).filter(val => val) ?? [];
            const data = await getRequirements({token: user.token, params: search ? {search} : {}});
            return data.results.map(r => ({
                ...r,
                value: r.id,
                label: r.description
            })).filter(r => !usedIds.includes(r.id));
        } catch (error) {
            console.error(error)
            return []
        }
    }, [user.token, fields]);

    return (
        <>
            <div className="row">
                <div className="col-3">
                    <Button
                        type="button"
                        color="dark"
                        className="my-3"
                        onClick={() => fields.push({uniqueKey: uuidv4()})}
                    >
                        <i className="bi bi-plus-square-fill mx-3"/>
                    </Button>
                </div>
            </div>
            {fields.map((name, index) => (
                <div className="row" key={`${fields?.value[index]?.uniqueKey ?? fields?.value[index]?.id ?? index}`}>
                    <div className="col-11">
                        <Field
                            name={`${name}`}
                            render={InputAsyncCreatable}
                            loadOptions={getRequirementOptions}
                            placeholder="Seleccione una opción"
                            prefix=""
                            createText="Crear nuevo requisito: "
                            searchText="Buscar requisito"
                            onCreateOption={async (description) => {
                                if (!description) {
                                    return;
                                }
                                try {
                                    const response = await createRequirement({data: {description}, token: user.token});
                                    form.change(name, {
                                        ...response,
                                        label: response.description,
                                        value: response.id,
                                    });
                                } catch (error) {
                                    console.error(error);
                                }
                            }}
                        />
                    </div>
                    <div className="col-1 d-flex align-items-center justify-content-center pt-3">
                        <Button type="button" block color="danger" onClick={() => fields.remove(index)}>
                            <i className="bi bi-trash3-fill"/>
                        </Button>
                    </div>
                </div>
            ))}
        </>
    )
}