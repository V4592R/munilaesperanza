export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    );

export function usernameRegexValidator(value) {
  const regex = /^[a-zA-Z][a-zA-Z0-9]{4,12}$/;

  if (!regex.test(value)) {
    return 'El usuario debe tener entre 5 y 12 caracteres. Debe iniciar con una letra. Solo letras y números permitidos';
  }
}

export function dpiRegexValidator(value) {
  const regex = /^[1-9][0-9]{12}$/;

  if (!regex.test(value)) {
    return 'El DPI debe contener 13 dígitos';
  }
}

export function nitRegexValidator(value) {
  const regex = /^[1-9][0-9]{8}$/;

  if (!regex.test(value)) {
    return 'El NIT solo debe contener 9 dígitos';
  }
}

export function phoneRegexValidator(value) {
  const regex = /^\+?1?\d{8,15}$/;

  if (!regex.test(value)) {
    return 'Entre 8 y 15 dígitos';
  }
}
