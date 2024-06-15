const capturarDatosPacienteUpdate =(id)=>{
const formulario = document.querySelector("#form-editar-perfil");
 const dniUpdate = document.querySelector("#dniPacienteEditar");
 const nombrePacienteUpdate = document.querySelector("#NombrePacienteEditar");
 const apellidoPacienteUpdate = document.querySelector("#apellidoPacienteEditar");
 const fechaPacienteEditar = document.querySelector("#fechaPacienteEditar$");
 const callePacienteEditar= document.querySelector("#callePacienteEditar");
const numeroPacienteEditar = document.querySelector("#numeroPacienteEditar");
const localidadPacienteEditar = document.querySelector("#localidadPacienteEditar");
const provinciaPacienteEditar = document.querySelector("#provinciaPacienteEditar");
const urlApi = "http://localhost:8080";

dniUpdate.addEventListener("input", e => validarDni(e));
nombrePacienteUpdate.addEventListener("input", e => validarTexto(e));
apellidoPacienteUpdate.addEventListener("input", e => validarTexto(e));
fechaPacienteEditar.addEventListener("input", e =>validarFecha (e));
callePacienteEditar.addEventListener("input", e=> validarCalle(e));
numeroPacienteEditar.addEventListener("input", e=> validarNumero(e));
localidadPacienteEditar.addEventListener("input", e=> validarLocalidad(e));
provinciaPacienteEditar.addEventListener("input", e=> validarProvincia(e));

dniUpdate.addEventListener("blur", e => validarDni(e));
nombrePacienteUpdate.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${nombre.name}`,e));
apellidoPacienteUpdate.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${apellido.name}`,e));
fechaPacienteEditar.addEventListener("blur", e =>isEmpty (`Se requiere que ingrese su ${fecha.name}`,e));
callePacienteEditar.addEventListener("blur", e=> isEmpty(`Se requiere que ingrese su ${calle.name}`,e));
numeroPacienteEditar.addEventListener("blur", e=> isEmpty(`Se requiere que ingrese su ${numero.name}`,e));
localidadPacienteEditar.addEventListener("blur", e=> isEmpty(`Se requiere que ingrese su ${localidad.name}`,e));
provinciaPacienteEditar.addEventListener("blur", e=> isEmpty(`Se requiere que ingrese su ${provincia.name}`,e));


formulario.addEventListener('submit', function(event){
    event.preventDefault();
    const payload ={
        id: id,
        nombre : nombre.value,
        apellido: apellido.value,
        dni : dni.value,
        fecha: fecha.value,
        calle: calle.value,
        numero: calle.value,
        localidad: localidad.value,
        provincia: provincia.value
    }
    const settings = {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    }
    const realizarUpdatePaciente = (settings) => {
        fetch(`${urlApi}/odontologo`, settings)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No se pudo actualizar el paciente');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: "Cambios guardados",
                showConfirmButton: false,
                textColor: "#000",
                background: "#eaeef4",
                timer: 1500
            });
            setTimeout(() => {
                location.replace("../pages/pacientes.html");
            }, 1500);
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo guardar los cambios",
                confirmButtonColor: "#456584",
                confirmButtonBorderColor: "#3e5975",
                textColor: "#000",
                background: "#eaeef4",
            });
        });
    };
})


}
const eliminarPaciente = (id) => {
    const urlApi = "http://localhost:8080";

    Swal.fire({
        title: "Eliminar Paciente",
        text: "¿Estás seguro de que deseas eliminar este Paciente?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#456584",
        confirmButtonBorderColor: "#3e5975",
        cancelButtonColor: "#dc3545",
        textColor: "#000",
        background: "#eaeef4",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            const settings = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            };

            fetch(`${urlApi}/paciente/${id}`, settings)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo eliminar el paciente');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: "¡Eliminado con éxito!",
                    text: "El paciente ha sido eliminado.",
                    icon: "success",
                    confirmButtonColor: "#456584",
                    confirmButtonBorderColor: "#3e5975",
                    textColor: "#000",
                    background: "#eaeef4",
                }).then(() => {
                    location.reload();
                });
            })
            .catch(error => {
                console.error('Error al eliminar:', error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo eliminar el paciente.",
                    icon: "error",
                    confirmButtonColor: "#456584",
                    confirmButtonBorderColor: "#3e5975",
                    textColor: "#000",
                    background: "#eaeef4",
                });
            });
        }
    });
};