var UrlGetPedidos='http://34.68.196.220:90/G3_19/Pedidos/controller/pedidos.php?op=GetPedidos';
var UrlPostPedido='http://34.68.196.220:90/G3_19/Pedidos/controller/pedidos.php?op=InsertPedido';
var UrlGetUno='http://34.68.196.220:90/G3_19/Pedidos/controller/pedidos.php?op=GetUno';
var UrlPutPedido='http://34.68.196.220:90/G3_19/Pedidos/controller/pedidos.php?op=UpdatePedido';
var UrlDeletePedido='http://34.68.196.220:90/G3_19/Pedidos/controller/pedidos.php?op=DeletePedido';

$(document).ready(function(){
    CargarPedidos();

});

function CargarPedidos(){
$.ajax({
  url:UrlGetPedidos,
  type:'GET',
  datatype:'JSON',
  success: function(response){
      var MiItems= response;
      var Valores='';
      for(i=0; i< MiItems.length; i++){
          Valores +=  '<tr>'+
         '<td>' + MiItems[i].ID_ma_pedidos +'</td>'+
         '<td>' + MiItems[i].ID +'</td>'+
         '<td>' + MiItems[i].FECHA_PEDIDO +'</td>'+
          '<td>' + MiItems[i].SUB_TOTAL +'</td>'+
         '<td>' + MiItems[i].TOTAL_ISV +' </td>'+
          '<td>' + MiItems[i].TOTAL +'</td>'+
          '<td>' + MiItems[i].FECHA_ENTREGA +'</td>'+
          '<td>' + MiItems[i].ESTADO +'</td>'+
          '<td>' + MiItems[i].DETALLE +'</td>'+
          '<td>'+
          '<button class="btn btn-outline-info" onclick="CargarPedido('+MiItems[i].ID_ma_pedidos+ ')">Editar Pedidos </button>'+
          '<button class="btn btn-outline-primary" onclick="EliminarPedido('+MiItems[i].ID_ma_pedidos+')">Eliminar</button>'+
          '</td>'+
        '</tr>';

      $('.pedidos').html(Valores);

    }
  }


})

}


function AgregarPedido(){
var datospedido= {
  FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
  SUB_TOTAL:$('#SUB_TOTAL').val(),
  TOTAL_ISV:$('#TOTAL_ISV').val(),
  TOTAL:$('#TOTAL').val(),
  FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
  ESTADO:$('#ESTADO').val(),
  DETALLE:$('#DETALLE').val(),
  ID:$('#ID').val()

};
var datospedidojson =JSON.stringify(datospedido);

$.ajax({ 

  url:UrlPostPedido,
  type:'POST',
  data: datospedidojson,
  datatype:'JSON',
  contentType:'application/json',
  success:function(response){
    console.log(response)

  }

});
alert("Pedido Agregado");
}

function CargarPedido(IDpedido){
var datospedido={
  ID_ma_pedidos: IDpedido
}
var datospedidojson= JSON.stringify(datospedido);

$.ajax({
    url:UrlGetUno,
    type:'POST',
    data:datospedidojson,
    datatype:'JSON',
    contentType:'application/json',
    success:function(response) {
        var MiItems=response;
        $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
        $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
        $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
        $('#TOTAL').val(MiItems[0].TOTAL);
        $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
        $('#ESTADO').val(MiItems[0].ESTADO);
        $('#DETALLE').val(MiItems[0].DETALLE);
        $('#ID').val(MiItems[0].ID);
        var btnactualizar='<input type="submit" id="btn_actualizar"  onclick="ActualizarPedido('+MiItems[0].ID_ma_pedidos+')"value="Acualizar Pedido" class ="btn btn-primary"></input>';
        $('.button').html(btnactualizar);
    }
  })

}


function ActualizarPedido(IDpedido){
  var datospedido = {
    ID_ma_pedidos:IDpedido,
    FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
    SUB_TOTAL:$('#SUB_TOTAL').val(),
    TOTAL_ISV:$('#TOTAL_ISV').val(),
    TOTAL:$('#TOTAL').val(),
    FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
    ESTADO:$('#ESTADO').val(),
    DETALLE:$('#DETALLE').val(),
    ID:$('#ID').val()
  }
  var datospedidojson= JSON.stringify(datospedido);

  $.ajax({
     url:UrlPutPedido,
     type:'PUT',
     data:datospedidojson,
     datatype:'JSON',
     contentType: 'application/json',
     success:function(response){
          console.log(response);
      }
   })
   alert("Pedido Atualizado");
}

  function EliminarPedido(IDpedido){
    var datospedido={
      ID_ma_pedidos:IDpedido
    };
    var datospedidojson= JSON.stringify(datospedido);

    $.ajax({
        url:UrlDeletePedido,
       type:'DELETE',
       data:datospedidojson,
       datatype:'JSON',
       contentType: 'application/json',
       success:function(response){
            console.log(response);
        }
      
    });
    alert("Pedido Eliminado");
  }



