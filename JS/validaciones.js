export function valida(input) {
        const tipoDeInput =input.dataset.tipo;

    if(validadores[tipoDeInput])
    {
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid)
    {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML ="";
    }
    else
    {
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input)
        
    }
};

const tipoError =
[
    "valueMissing",
    "typeMismatch",
    "patterMismatch",
    "customError"

]

const mensajesDeError =
{
    nombre:
    {
        valueMissing :"Se requiere un nombre"
    },
    email:
    {
        valueMissing :"Se requiere un correo",
        typeMismatch: "El correo no es valido"
    },
    password:
    {
        valueMissing :"Se necesita una contraseña",
        patternMismatch:"Que contenga de 6 a 12 caracteres, al menos una letra minuscula, mayuscula y un numero, y no debe contener caractres especiales"
    },
    nacimiento:
    {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes ser mayor de edad"
    },
    numero:
    {
        valueMissing: "Se requiere un numero telefonico",
        patternMismatch: "el formato es de XXXXXXXXXX 10 números"
    },
    direccion:
    {
        valueMissing: "Se requiere una dirección",
        patternMismatch: "el minímo de caracteres es 10, máximo 40"
    },
    ciudad:
    {
        valueMissing: "Se requiere una ciudad",
        patternMismatch: "el minímo de caracteres es 1, máximo 30"
    },
    estado:
    {
        valueMissing: "Se requiere una dirección",
        patternMismatch: "el minímo de caracteres es 1, máximo 30"
    }
};

function mostrarMensajeError(tipoDeInput, input)
{
    let mensaje = "";
    tipoError.forEach(error => 
            {
                if(input.validity[error])
                {
                    mensaje = mensajesDeError [tipoDeInput][error]
                }
            }
        );

    return mensaje;
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
};

function validarNacimiento (input)
{
    const fechaCliente = new Date(input.value);
    let mensaje = " ";
    if(!mayorEdad(fechaCliente))
    {
        mensaje = "Debes ser mayor de edad";
    }
    input.setCustomValidity(mensaje);
};

function mayorEdad(fecha)
{
    const fechaActual = new Date();
    const diferenciaFechas = new Date
    (
       fecha.getUTCFullYear() + 18,
       fecha.getUTCMonth(),
       fecha.getUTCDate()
    );

    return diferenciaFechas < fechaActual;
};