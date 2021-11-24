var UrlGetSocios = 'http://34.68.196.220:90/G3_19/Socios/Controller/proveedores.php?op=Getsocios';
var UrlPostSocios = 'http://34.68.196.220:90/G3_19/Socios/Controller/proveedores.php?op=Insertsocio';
var UrlGetUno = 'http://34.68.196.220:90/G3_19/Socios/Controller/proveedores.php?op=Getsocio';
var UrlPutSocio = 'http://34.68.196.220:90/G3_19/Socios/Controller/proveedores.php?op=Actualizarsocio';
var UrlDeleteSocio = 'http://34.68.196.220:90/G3_19/Socios/Controller/proveedores.php?op=Deletesocio';

$(document).ready(function () {
    Cargarsocios();
});

function Cargarsocios() {
    $.ajax({
        url: UrlGetSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var MiItems = response;
            var Valores = '';

            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>' +
                    '<td>' + '</td>' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].NOMBRE + '</td>' +
                    '<td>' + MiItems[i].RAZON_SOCIAL + '</td>' +
                    '<td>' + MiItems[i].DIRECCION + '</td>' +
                    '<td>' + MiItems[i].TIPO_SOCIO + '</td>' +
                    '<td>' + MiItems[i].CONTACTO + '</td>' +
                    '<td>' + MiItems[i].EMAIL + '</td>' +
                    '<td>' + MiItems[i].FECHA_CREADO + '</td>' +
                    '<td>' + MiItems[i].ESTADO + '</td>' +
                    '<td>' + MiItems[i].TELEFONO + '</td>' +
                    '<td>' +
                    '<button class="btn bg-warning" onclick="Cargarsocio(' + MiItems[i].ID + ')">Editar</button>' +
                    '<button class="btn btn-danger" onclick="Eliminarsocio(' + MiItems[i].ID + ')">Eliminar</button>' +
                    '</td>' +
                    '</tr>';

                $('.Socios').html(Valores);
            }
        }
    });
}

function AgregarSocio() {
    var datossocio = {
        nombre: $('#nombre').val(),
        razon_social: $('#razonsocial').val(),
        direccion: $('#direccion').val(),
        contacto: $('#contacto').val(),
        email: $('#email').val(),
        telefono: $('#telefono').val()
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlPostSocios,
        type: 'POST',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Proveedor Agregado")
}

function Cargarsocio(idsocio){
    var datossocio = { 
        id: idsocio 
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#nombre').val(MiItems[0].NOMBRE);
            $('#razonsocial').val(MiItems[0].RAZON_SOCIAL);
            $('#direccion').val(MiItems[0].DIRECCION);
            $('#contacto').val(MiItems[0].CONTACTO);
            $('#email').val(MiItems[0].EMAIL);
            $('#telefono').val(MiItems[0].TELEFONO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarSocio(' + MiItems[0].ID + ')"'+
            'value="Actualizar Socio" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);
        }
    });
}

function ActualizarSocio(idsocio){
    var datossocio = {
        id: idsocio,
        nombre: $('#nombre').val(),
        razon_social: $('#razonsocial').val(),
        direccion: $('#direccion').val(),
        contacto: $('#contacto').val(),
        email: $('#email').val(),
        telefono: $('#telefono').val()

    };

    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlPutSocio,
        type: 'PUT',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Socio Actualizado")

}

function Eliminarsocio(idsocio){
    var datossocio = { 
        id: idsocio 
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlDeleteSocio,
        type: 'DELETE',
        data: datossociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Socio eliminado")
    Cargarsocios();
}

