import React from "react";
import validate from "validate.js"
import { constraints } from "./constraints"

export const validation = (fieldName, value) => {
    var formValues = {}
    if (value) 
        formValues[fieldName] = value

    var formFields = {}
    formFields[fieldName] = constraints[fieldName]

    const result = validate(formValues, formFields, {fullMessages: false})

    if (result) {
        return result[fieldName]
    }
    return null
}

export const getValidationError = (formField, value) => {
    if (value !== null) {
        const error = validation(formField, value);
        if (error) 
            return {
                dom: <p className="form__error-message">{error[0]}</p>,
                className: "form__error-input"
            }
    }
    return ""
}

export const isFormValid = (e, input) => {
    const fields = Object.values(e.target).reverse()
    let valid = true
    fields.map(field => {
        const { tagName, name, value } = field
        if (tagName === "INPUT" || tagName === "TEXTAREA")
            if (validation(name, value)) {
                input[name].focus()
                valid = false
            }
            
        return null
    })
    return valid
}