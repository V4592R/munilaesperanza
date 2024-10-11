/* eslint-disable react/prop-types */
import classNames from "classnames";
import {NumericFormat, PatternFormat} from "react-number-format";
import Select from "react-select";
import AsyncCreatableSelect from 'react-select/async-creatable';
import JoditEditor from 'jodit-react';
import {useMemo, useRef} from "react";


export const InputField = ({
                               input,
                               meta: {touched, error},
                               type = "text",
                               placeholder = "...",
                               label = "",
                               labelClassNames = "",
                               readOnly = false,
                               counter = false
                           }) => (
    <div className="form-group">
        <label
            className={classNames("form-label", {
                [labelClassNames]: labelClassNames,
            })}
        >
            {label}
            {counter ? <span className='ms-2 badge bg-primary'>{input.value?.length ?? 0}</span> : null}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className={classNames("form-control", {"is-invalid": touched && error})}
            readOnly={readOnly}
            {...input}
        />
        {error && touched && <span className="invalid-feedback">{error}</span>}
    </div>
);

export const InputTextAreaField = ({
                                       input,
                                       meta: {touched, error},
                                       placeholder = "...",
                                       label = "",
                                       labelClassNames = "",
                                       readOnly = false,
                                       rows = 5,
                                       counter = false
                                   }) => (
    <div className="form-group">
        <label
            className={classNames("form-label", {
                [labelClassNames]: labelClassNames,
            })}
        >
            {label}
            {counter ? <span className='ms-2 badge bg-primary'>{input.value?.length ?? 0}</span> : null}
        </label>
        <textarea
            placeholder={placeholder}
            className={classNames("form-control", {"is-invalid": touched && error})}
            readOnly={readOnly}
            {...input}
            rows={rows}
        />
        {error && touched && <span className="invalid-feedback">{error}</span>}
    </div>
);

export const InputNumberField = ({
                                     input,
                                     decimalScale,
                                     placeholder,
                                     meta: {touched, error},
                                     prefix = "",
                                     suffix = "",
                                     numberFormat,
                                     readOnly = false,
                                     labelClassNames = "",
                                     label,
                                     thousandSeparator = "",
                                     allowNegative = true,
                                     allowLeadingZeros = false
                                 }) => {
    const invalid = touched && error;

    return (
        <div className="form-group">
            <label
                className={classNames("form-label", {
                    [labelClassNames]: labelClassNames,
                })}
            >
                {label}
            </label>
            <NumericFormat
                value={input.value}
                placeholder={placeholder}
                className={classNames("form-control", {"is-invalid": invalid})}
                decimalScale={decimalScale || 0}
                format={numberFormat}
                fixedDecimalScale
                thousandSeparator={thousandSeparator}
                prefix={prefix}
                suffix={suffix}
                onValueChange={(values) => {
                    input.onChange(values.value);
                }}
                readOnly={readOnly}
                allowNegative={allowNegative}
                allowLeadingZeros={allowLeadingZeros}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export const InputNumberPatternField = ({
                                            input,
                                            placeholder,
                                            meta: {touched, error},
                                            prefix = "",
                                            numberFormat,
                                            readOnly = false,
                                            labelClassNames = "",
                                            label,
                                            mask,
                                        }) => {
    const invalid = touched && error;

    return (
        <div className="form-group">
            <label
                className={classNames("form-label", {
                    [labelClassNames]: labelClassNames,
                })}
            >
                {label}
            </label>
            <PatternFormat
                value={input.value}
                placeholder={placeholder}
                className={classNames("form-control", {"is-invalid": invalid})}
                format={numberFormat}
                prefix={prefix}
                onValueChange={(values) => {
                    input.onChange(values.value);
                }}
                readOnly={readOnly}
                mask={mask}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};


export const InputSelect = (
    {
        input,
        disabled,
        isClearable,
        isMulti,
        isSearchable,
        options = [],
        extraChange = null,
        select_style = {},
        placeholder,
        labelKey = "label",
        valueKey = "value",
        meta: {touched, error},
        label = "",
        labelClassNames = "",
    }) => {

    const invalid = touched && error;

    const _options = options.map(option =>
        ({...option, label: option[labelKey], value: option[valueKey]})
    );

    let value = input.value;
    if (value !== null && value !== undefined) {
        value = _options.find(opt => opt.value === value);
    }

    return (
        <div className="form-group">
            <label
                className={classNames("form-label", {
                    [labelClassNames]: labelClassNames,
                })}
            >
                {label}
            </label>
            <Select
                styles={select_style}
                isClearable={isClearable}
                className={classNames({'is-invalid': invalid})}
                backspaceRemovesValue={false}
                isMulti={isMulti}
                isSearchable={isSearchable}
                options={_options}
                placeholder={placeholder}
                onChange={(e) => {
                    if (extraChange) {
                        extraChange(e[valueKey])
                    }
                    input.onChange(e ? e[valueKey] : null);
                }}
                value={value || ''}
                isDisabled={disabled}
                menuPlacement="auto"
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    )
};

export const InputAsyncCreatable = (
    {
        input,
        disabled,
        labelKey = "label",
        valueKey = "value",
        meta: {touched, error},
        label = "",
        labelClassNames = "",
        allowCreateWhileLoading = false,
        createText = "Create option",
        searchText = "Write to search",
        loadOptions,
        extraChange = null,
        onCreateOption = null,
    }) => {

    const extraProps = {}
    if (onCreateOption) extraProps.onCreateOption = onCreateOption;

    const invalid = touched && error;

    return (
        <div className="form-group">
            <label
                className={classNames("form-label", {
                    [labelClassNames]: labelClassNames,
                })}
            >
                {label}
            </label>
            <AsyncCreatableSelect
                disabled={disabled}
                value={input.value}
                defaultOptions
                className={classNames({
                    "is-invalid": invalid,
                })}
                onChange={(e) => {
                    input.onChange(e);
                    if (extraChange) extraChange(e);
                }}
                placeholder={searchText}
                valueKey={valueKey}
                labelKey={labelKey}
                loadOptions={loadOptions}
                formatCreateLabel={(label) => {
                    return `${createText} ${label}`;
                }}
                allowCreateWhileLoading={allowCreateWhileLoading}
                {...extraProps}
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    )
};

export const InputRichTextField = (
    {
        input,
        placeholder,
        meta: {touched, error},
        readOnly = false,
        labelClassNames = "",
        label,
    }) => {
    const invalid = touched && error;
    const editor = useRef(null);

    const config = useMemo(() =>
            ({
                readonly: readOnly, // all options from https://xdsoft.net/jodit/docs/,
                placeholder: placeholder || 'Start typings...',
                language: 'es',
                height: 400,
                removeButtons: ['speechRecognize', 'spellcheck'],
            }),
        [placeholder, readOnly]
    );

    return (
        <div className="form-group">
            <label
                className={classNames("form-label", {
                    [labelClassNames]: labelClassNames,
                })}
            >
                {label}
            </label>
            <JoditEditor
                ref={editor}
                value={input.value}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => input.onChange(newContent)} // preferred to use only this option to update the content for performance reasons
                // onChange={newContent => {}}
            />
            {invalid && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};