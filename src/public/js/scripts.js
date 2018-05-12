$(document).ready(function() {
    $('#table').DataTable({
        scrollY:        '50vh',
        scrollCollapse: true,
    });

    $(".delete").click(function(e) {
        e.preventDefault();
        swal({
            title: '¿Estas seguro?',
            text: "Estas a punto de eliminar este registro",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              swal(
                'Borrado!',
                'Este registro ha sido eliminado',
                'success'
              ).then(() => {
                window.location = $(this).attr("href");
              });
              
            }
          })
    });

    $('.agregarBoton').click(function(e) {
      e.preventDefault();
      var form = $("#agregar").serializeArray();
      var data = {};
      $(form ).each(function(index, obj){
          data[obj.name] = obj.value;
      });
      console.log(data);
      
      //Validar expresion regular de RFC
      var expresion = new RegExp('^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$');
      if(!expresion.test(data['rfc'])){
        swal(
          'RFC incorrecto',
          'El RFC que ingresaste no es valido',
          'warning'
        ).then(() => {
          $('#'+data['rfc']).focus();
        });
        
      } else {
        $('#agregar').submit();
      }
    });

    $(".actualizar").click(function(e, flag) {
        if(!flag) {
            e.preventDefault();
            //Pasamos el formulario a JSON
            var form = $("#editar").serializeArray();
            var data = {};
            $(form ).each(function(index, obj){
                data[obj.name] = obj.value;
            });
            console.log(data);
            
            //Validar expresion regular de RFC
            var expresion = new RegExp('^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$');
            if(!expresion.test(data['rfc'])){
              swal(
                'RFC incorrecto',
                'El RFC que ingresaste no es valido',
                'warning'
              ).then(() => {
                $('#'+data['rfc']).focus();
              });
              
            } else {
              swal({
                title: '¿Estas seguro?',
                text: "Estas a punto de modificar este registro",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.value) {
                  $(this).trigger('click', true);
                }
              });
            }
            
            
        }
        
    });

});