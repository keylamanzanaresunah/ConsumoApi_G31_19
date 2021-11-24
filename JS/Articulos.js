var UrlGetArtiulos = 'http://34.68.196.220:90/G3_19/Articulos/controller/Articulos.php?op=GetArticulos';
var UrlGetUno = 'http://34.68.196.220:90/G3_19/Articulos/controller/Articulos.php?op=GetUno';
var UrlPostArticulo = 'http://34.68.196.220:90/G3_19/Articulos/controller/Articulos.php?op=InsertArticulo';
var UrlUpdateArticulo = 'http://34.68.196.220:90/G3_19/Articulos/controller/Articulos.php?op=update_articulo';
var UrlDeleteArticulo = 'http://34.68.196.220:90/G3_19/Articulos/controller/Articulos.php?op=Delete_articulo';

$(document).ready(function () {
    CargarArticulos();
});

function CargarArticulos (){
    $.ajax({
        url: UrlGetArtiulos,
        type: 'GET',
        datatype: 'JSON',
        succes: function(response){
            var MiItems = response;
            var Valores ='';

            for(i= 0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID_ma_articulos+'</td>'+
                '<td>'+ MiItems[i].DESCRIPCION+'</td>'+
                '<td>'+ MiItems[i].UNIDAD+'</td>'+
                '<td>'+ MiItems[i].COSTO+'</td>'+
                '<td>'+ MiItems[i].PRECIO+'</td>'+
                '<td>'+ MiItems[i].APLICA_ISV+'</td>'+
                '<td>'+ MiItems[i].PORCENTAJE_ISV+'</td>'+
                '<td>'+ MiItems[i].ESTADO+'</td>'+
                '<td>'+ MiItems[i].ID+'</td>'+
                '<td>'+
                '<button class="btn btn-warning" onclick=CargarArticulo('+MiItems[i].ID_ma_articulos+')">Editar Articulos</button>'+
                '<button class="btn btn-danger" onclick="EliminarArticulo('+MiItems[i].ID_ma_articulos+')">Eliminar</button>'+
                '</td>'+
                '</tr>';
                $('.articulos').html(Valores);
            }
        }
    })
}

function AgregarArticulo(){
var datosarticulo ={
        DESCRIPCION: $('#DESCRIPCION').val(),
        UNIDAD: $('#UNIDAD').val(),
        COSTO: $('#COSTO').val(),
        PRECIO: $('#PRECIO').val(),
        APLICA_ISV: $('#APLICA_ISV').val(),
        PORCENTAJE_ISV: $('#PORCENTAJE_ISV').val(),
        ESTADO: $('#ESTADO').val(),
        ID: $('#ID').val()
    };
    var datosarticulojson= JSON.stringify(datosarticulo);
    
    $.ajax({
        url: UrlPostArtiulos,
        type: 'POST',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        succes: function(response){
            console.log(response)
            
        }
    });
    alert("Articulo Agregado");    
}

function CargarArticulo(IDarticulo){
    var datosarticulo= {
        ID_ma_articulos:IDarticulo
    };
    var datosarticulojson= JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        succes: function(response){
            var MiItems = response;
            $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
            $('#UNIDAD').val(MiItems[0].UNIDAD);
            $('#COSTO').val(MiItems[0].COSTO);
            $('#PRECIO').val(MiItems[0].PRECIO);
            $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
            $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#ID').val(MiItems[0].ID);    
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarArticulo('+MiItems[0].ID_ma_articulos+')" value="Actualizar Articulo" class"btn btn-primary"></input>';
            $('.button').html(btnactualizar);
        }
    })
}

function ActualizarArticulo(IDarticulo){
    var datosarticulo= {
        ID_ma_articulos:IDarticulo,
            DESCRIPCION: $('#DESCRIPCION').val(),
            UNIDAD: $('#UNIDAD').val(),
            COSTO: $('#COSTO').val(),
            PRECIO:$('#PRECIO').val(),
            APLICA_ISV: $('#APLICA_ISV').val(),
            PORCENTAJE_ISV: $('#PORCENTAJE_ISV').val(),
            ESTADO: $('#ESTADO').val(),
            ID: $('#ID').val()
    }
    var datosarticulojson= JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlUpdateArticulo,
        type: 'PUT',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        succes: function(response){
            console.log(response);
            
        }       
    })
    alert("Articulo Actualizado");
}

function EliminarArticulo(IDarticulo){
    var datosarticulo= {
        ID_ma_articulos:IDarticulo
    };
    var datosarticulojson= JSON.stringify(datosarticulo);   

    $.ajax({
        url: UrlDeleteArticulo,
        type: 'DELETE',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        succes: function(response){
            console.log(response);
            
        }       
    });
    alert("Articulo Eliminado");
}