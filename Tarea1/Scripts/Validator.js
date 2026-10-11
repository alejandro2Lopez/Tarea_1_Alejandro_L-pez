function validarTicket() {

    let errores = [];

    if ($("#userName").val().trim().length < 3) {
        errores.push("El usuario debe tener al menos 3 caracteres.");
    }

    if ($("#tittle").val().trim().length < 5) {
        errores.push("El título debe tener al menos 5 caracteres.");
    }

    if ($("#description").val().trim().length < 10) {
        errores.push("La descripción debe tener al menos 10 caracteres.");
    }

    if (!$("#deparment").val()) {
        errores.push("Debe seleccionar un departamento.");
    }

    if (!$("#priority").val()) {
        errores.push("Debe seleccionar una prioridad.");
    }

    if (!$("#status").val()) {
        errores.push("Debe seleccionar un estado.");
    }

    if (errores.length > 0) {
        alert("Corrija los siguientes errores:\n\n" +
            errores.join("\n"));

        return false;
    }

    return true;
}