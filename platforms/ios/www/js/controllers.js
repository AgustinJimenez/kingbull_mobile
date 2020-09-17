angular.module('starter.controllers', ['ionic', 'ngCordova'])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, user) 
{


  $scope.nombre = user.nombre;
  $scope.profileImg = user.imgProfile;
})

.service('user', function getIdUser() 
{
  var id = this;
  var nombre = this;
  var imgProfile = this;

})

.factory('Config', function() 
{
  return {
      url : 'http://192.168.0.7:8000/en/api/v1/'
      //url: 'http://kingbull.info/public/es/api/v1/'
  };
})

.controller('perfilCtrl', function($scope, $http, $stateParams, $state, $ionicHistory, $ionicPopup, $log, user, $ionicLoading, $timeout, Config) 
{
  var url = Config.url + 'profile/get?user_token=' + localStorage.getItem("token");

  $http.get( url )
  .then(function(res) 
  {
    //console.dir(res);
    $scope.perfilb = res.data;
    //console.log("REQUESTING:", url, res.data);
  });

    //$scope.profileImg = user.imgProfile;


  $scope.logout = function() 
  {

    //function logout() {

    $http.post(Config.url + "logout", 
    {
      user_token: localStorage.getItem("token")
    })
    .then(function(result) 
    {

    }, function(error)
     {

    });

    //}
    $ionicLoading.show
    ({
      template: 'Cerrando Sesion....'
    });

    $timeout(function() 
    {
      $ionicLoading.hide();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions
      ({
        disableBack: true,
        historyRoot: true
      });
      //logout();
      localStorage.clear();
      $state.go('login');
    }, 1000);

  };



})

.controller('editarCtrl', function($scope, $http, $log, user, $ionicPopup, $state, $cordovaCamera, $ionicLoading, $cordovaFileTransfer, Config) 
{
  var url = Config.url + 'profile/get?user_token=' + localStorage.getItem("token");
  ////console.log("url= "+url);
  $http.get( url )
  .then(function(res) 
  {
    ////console.log('El perfil: ' + JSON.stringify(res.data));
    //console.dir(res);
    $scope.perfilb = res.data;
  });

  $scope.showb = function(perfilb) 
  {
    //console.log(perfilb);
    var url = Config.url + 'profile/update';
    var params = {
                    user_token: localStorage.getItem("token"),
                    nombre: perfilb.first_name,
                    genero: perfilb.genero,
                    edad: perfilb.edad,
                    altura: perfilb.altura,
                    peso: perfilb.peso,
                    fran: perfilb.fran,
                    helen: perfilb.helen,
                    grace: perfilb.grace,
                    filthy: perfilb.filthy,
                    fight_gone_bad: perfilb.fight_gone_bad,
                    sprint: perfilb.sprint,
                    run: perfilb.run,
                    deadlift: perfilb.deadlift,
                    back_squat: perfilb.back_squat,
                    front_squat: perfilb.front_squat,
                    ohs: perfilb.ohs,
                    snatch: perfilb.snatch,
                    clean: perfilb.clean,
                    clean_jerk: perfilb.clean_jerk,
                    press: perfilb.press,
                    push_press: perfilb.push_press,
                    bench_press: perfilb.bench_press,
                    thrusters: perfilb.thrusters,
                    max_pull_ups: perfilb.max_pull_ups,
                    c2b: perfilb.c2b,
                    t2b: perfilb.t2b,
                    mu: perfilb.mu,
                    bmu: perfilb.bmu,
                    hspu: perfilb.hspu,
                    hsw: perfilb.hsw
                  };
    //console.log("SENDING TO: ", url, params);
    $http.post( url, params )
    .then(function(result) 
    {
      if (result.data.status === 'OK') 
      {
        var alertPopup = $ionicPopup.alert
        ({
          title: 'Ok!',
          template: 'Datos actualizados correctamente'
        });
        $state.go('app.perfil');
      } 
      else 
      {
        var alertPopup = $ionicPopup.alert
        ({
          title: 'Error!',
          template: 'Hubo un error al actualizar'
        });
      }
    }, function(error) 
    {
      ////console.log(error);
    });

  }

  $scope.data = 
  {
      "ImageURI": "Select Image"
    };
    $scope.takePicture = function() 
    {
      var options = 
      {
        quality: 40,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500, //what widht you want after capaturing
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options)
      .then(
        function(imageData) 
        {
          $scope.picData = imageData;
          $scope.ftLoad = true;
          $ionicLoading.show
          ({
            template: 'Foto adquirida...',
            duration: 500
          });
        },
        function(err) 
        {
          $ionicLoading.show
          ({
            template: 'Error en la carga...',
            duration: 500
          });
        })
    }

    $scope.elegir = function()
    {

    }

    $scope.selectPicture = function() 
    {
      ////console.log('Dentro de la funcion selectPicture');
      var options = 
      {
        quality: 40,
        destinationType: Camera.DestinationType.DATA_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500, //what widht you want after capaturing
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options)
      .then(
        function(imageURI) 
        {
          window.resolveLocalFileSystemURI(imageURI, function(fileEntry) 
          {
            $scope.picData = fileEntry.nativeURL;
            $scope.ftLoad = true;
            var image = document.getElementById('myImage');
            image.src = fileEntry.nativeURL;
          });
          $ionicLoading.show
          ({
            template: 'Foto adquirida...',
            duration: 500
          });
        },
        function(err) 
        {
          $ionicLoading.show
          ({
            template: 'Error en la carga...',
            duration: 500
          });
        })
    };

    $scope.delPhoto = function()
    {
        $scope.picData = false;
    }

    $scope.uploadPicture = function(perfilb) 
    {
      ////console.log('en la funcion uploadPicture');
      $ionicLoading.show
      ({
        template: 'Procesando...'
      });
      var fileURL = $scope.picData;
      var options = new FileUploadOptions();
      options.headers = 
      {
          Connection: "close"
      };
      options.fileKey = "file";
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      options.chunkedMode = false;
      options.httpMethod = "POST";

      var params = {};
      params.user_token = localStorage.getItem("token");


      options.params = params;


      $cordovaFileTransfer.upload(Config.url + "profile/img/upload", fileURL, options)
        .then(function(result) 
        {
            ////console.log("Envio el archivo al server");
            //console.dir(result);
            var alertPopup = $ionicPopup.alert
            ({
              title: 'Ok!',
              template: 'Foto de perfil actualizado'
            });
            user.imgProfile = $scope.img_up;

            var image = document.getElementById('newImg');
            image.src = $scope.picData;
            $scope.img_up = $scope.picData;
            $scope.picData = false;
            $scope.profileImg = false;
            $scope.newImg = true;
            //$state.go('app.perfil');
            $ionicLoading.hide();
            //$scope.picData = false;
        }, function(err) 
        {
            //console.dir(err)
            $ionicLoading.hide();
        }, function (progress) 
        {
            // constant progress updates
            //$ionicLoading.hide();
        });
    }

})

.controller('mispubCtrl', function($scope, $http, Config, user, $ionicLoading,$ionicPopup, $state) 
{
  $scope.lastpage = 1;
  var url = Config.url + 'misPubclicaciones?user_token=' + localStorage.getItem("token");
  //console.log( url );
  $http.get( url )
  .then(function(res) 
  {
    //console.dir(res);
    $scope.mispub = res.data.data;
  });


  $scope.moredata = false;
  $scope.loadMoreData = function() 
  {
    $scope.lastpage += 1;
    var url = Config.url + 'misPubclicaciones?page=' + $scope.lastpage + "&user_token=" + localStorage.getItem("token");
    $http.get( url )
    .then(function(res) 
    {

      if (res.data.next_page_url == null) 
      {
        $scope.moredata = true;
      }

      $scope.mispub = $scope.mispub.concat(res.data.data);
      $scope.next_page_url = res.data.next_page_url;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.eliminar = function(index, id)
  {
    $ionicLoading.show
    ({
        template: 'Procesando...'
      });

      $http.post(Config.url + 'delete/publicaciones', 
      {
        id: id,
        user_token: localStorage.getItem("token")
      })
      .then(function(result) 
      {
      if (result.data.status === 'OK') 
      {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert
        ({
          title: 'Ok!',
          template: 'Publicacion eliminada correctamente'
        });
        $scope.mispub.splice(index, 1);

        //$state.go('app.mis_publicaciones');
      } 
      else 
      {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert
        ({
          title: 'Error!',
          template: 'Hubo un error al eliminar publicacion'
        });
      }
    }, function(error) 
    {
      $ionicLoading.hide();
      ////console.log(error);
    });
    //console.dir($scope.mispub);
    // //console.log("El index " + index + " y el id es " + id);


    //console.dir($scope.mispub);
  }

})



.controller('noticiasCtrl', function($scope, $http, Config, user) 
{
  $scope.lastpage = 1;
  var url = "";
  console.log("NOTICIAS", localStorage.getItem("token"), localStorage.getItem("token")==null );
  if( localStorage.getItem("token") )
  {
    url = Config.url + 'profile/get?user_token=' + localStorage.getItem("token");
    ////console.log('url= '+url);
    $http.get( url )
    .then(function(data) 
    {
      user.token = data.data.user.token;
      user.nombre = data.data.user.first_name;
      user.imgProfile = data.data.profile_img
      $scope.nombre = user.nombre;
      $scope.profileImg = user.imgProfile;
    });
  }
  else
    $state.go('login');

  url = Config.url + 'noticias-all?user_token='+localStorage.getItem("token");
  ////console.log(url);
  $http.get( url )
  .then(function(res) 
  {
    ////console.log(res.data);
    $scope.noticias = res.data.data;
  });



  $scope.moredata = false;
  $scope.loadMoreData = function() 
  {
    $scope.lastpage += 1;
    url = Config.url + 'noticias-all?page=' + $scope.lastpage+"&user_token="+localStorage.getItem("token");
    $http.get( url )
      .then(function(res) 
      {

        if (res.data.next_page_url == null) 
        {
          $scope.moredata = true;
        }

        $scope.noticias = $scope.noticias.concat(res.data.data);
        $scope.next_page_url = res.data.next_page_url;

        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
  };
})

.controller('wodCtrl', function($scope, $http, Config) 
{
  $scope.lastpage = 1;
  var url = Config.url + 'wod-all?user_token='+localStorage.getItem("token");
  ////console.log(url);
  $http.get( url )
  .then(function(res) 
  {
    $scope.wods = res.data.data;
  });

  $scope.moredata = false;
  $scope.loadMoreData = function() 
  {
    $scope.lastpage += 1;
    var url = Config.url + 'wod-all?page=' + $scope.lastpage + "&user_token="+localStorage.getItem("token");
    $http.get( url )
    .then(function(res) 
    {

      if (res.data.next_page_url == null) 
      {
        $scope.moredata = true;
      }

      $scope.wods = $scope.wods.concat(res.data.data);
      $scope.next_page_url = res.data.next_page_url;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
})

.controller('reservasCtrl', function($scope, $http, Config, $state, $ionicPopup, $ionicLoading) 
{
  var url = Config.url + 'reservas-all?user_token=' + localStorage.getItem("token");
  $ionicLoading.show({template: 'Procesando...'});//duration: 500
  $http.get( url )
  .then(function(res) 
  {
    $scope.dias = res.data;
    $ionicLoading.hide();
    //console.dir( res.data );
  }, function(error)
  {
    $ionicLoading.hide();
  });

  $scope.button_horarios_was_clicked = function( dia )
  {
    //console.log("===button_horarios_was_clicked===");
    //console.log(dia);
    $state.go('app.reservas_horarios', {dia_nombre: dia.nombre_dia, nombre_dia_noformat: dia.nombre_dia_noformat ,dia_fecha: dia.fecha_dia, dia_mes: dia.mes, fecha: dia.fecha});
  }

  $scope.eliminar_reserva_del_dia = function( dia )
  {
    var ok_was_pressed = false;
    var fecha_horario = dia.fecha_dia+" de "+dia.mes+" en horario "+dia.hora_reserva;

    $ionicPopup.prompt
    ({
      title: '<h4>Eliminar Reserva</h4>',
      subTitle: '<h4>Desea eliminar reserva del dia '+fecha_horario+"?</h4>",
      buttons: 
      [
        { text: '<b>NO</b>', type: 'button button-balanced', onTap: function(e) { return false; } },
        { text: '<b style="color:#1b1425!important;">SI</b>', type: 'button button-assertive', onTap: function(e) {return true;} },
      ]
    })
    .then(function(yes) 
    {
      
      if(yes)
      {
        var url = Config.url + 'reservas/eliminar';
        var params = 
        {
          user_token: localStorage.getItem("token"),
          fecha: dia.fecha
        };
        //console.log("=== SENDIG TO URL "+url+" next params ===");
        //console.log(params);

        $http.post(url, params).then(function(result) 
        {
          if (result.data.status === 'OK') 
          {
            //console.log("========reserva eliminada=======");
            //console.log(result.data);
            exito = true;
            $ionicLoading.show({template: 'Se elimino la reserva correctamente.'});
            var url = Config.url + 'reservas-all?user_token=' + localStorage.getItem("token");
            ////console.log(url);
            $http.get( url ).then(function(res) 
            {
              $scope.dias = res.data;
              ////console.log("===reservasCtrl===");
              $ionicLoading.hide();
              //console.dir( res.data );
            });
          } 
        }, 
        function(error) 
        {
          $ionicLoading.hide();
          //console.log("===ERROR===");
          //console.log(error);
        });
        $state.go('app.reservas');
      }



    });
  }

})
.controller('reservas_horarios_controller', function($scope, $http, Config, $state, $ionicLoading, $ionicPopup) 
{
  //console.log("===reservas_horarios_controller===");
  //console.log($state.params);
  $scope.dia_nombre = $state.params.dia_nombre;
  $scope.dia_fecha = $state.params.dia_fecha;
  $scope.dia_mes = $state.params.dia_mes;
  $scope.nombre_dia_noformat = $state.params.nombre_dia_noformat;
  $scope.fecha = $state.params.fecha;
  var url = Config.url + 'search_dia?dia_nombre='+$scope.nombre_dia_noformat+'&user_token=' + localStorage.getItem("token");
  ////console.log("calling to url= "+url);
  $ionicLoading.show({template: 'Procesando...'});//duration: 500
  $http.get( url ).then(function(res) 
  {
    $scope.dia = res.data;
    $scope.horarios = $scope.dia.horarios;
    //console.log("===horarios llegando del servidor===");
    //console.log( $scope.horarios );
    $ionicLoading.hide();
  }, function(error)
  {
    $ionicLoading.hide();
  });
  
  $scope.crear_reserva = function( fecha, horario_id )
  {
    var exito = false;
    //console.log("sending [fecha='"+fecha+"', horario_id="+horario_id+"]");
    var url = Config.url + 'reservas/crear';
    //console.log("======post to "+url+" ========");
    var params = 
    {
      user_token: localStorage.getItem("token"),
      fecha: fecha,
      horario_id: horario_id
    };
    //console.log(params);
    $http.post(url, params)
    .then(function(result) 
    {
      if (result.data.status === 'OK') 
      {
        $ionicLoading.show({template: 'Se realizo la reserva correctamente.', duration: 1500});
        //console.log("========reserva saved=======");
        //console.log(result.data);
        exito = true;
        $ionicLoading.hide();
        $state.go('app.reservas');
      } 
      else 
      {
        //console.log("========reserva not saved=======");
        //console.log(result.data);
        var alertPopup = $ionicPopup.alert({title: 'Error!', template: result.data.message});
      }
    }, 
    function(error) 
    {
      $ionicLoading.hide();
      //console.log("===ERROR===");
      //console.log(error);
    });
  }
    
})
.controller('publicacionesCtrl', function($scope, $http, Config) 
{
  //$http.get('json-server/publicaciones.json')
  $scope.lastpage = 1;
  var url = Config.url + 'publicaciones-all?user_token=' + localStorage.getItem("token");
  ////console.log(url);
  $http.get( url )
  .then(function(res) 
  {
    //console.dir(res);
    $scope.publicaciones = res.data.data;
  });



  $scope.moredata = false;
  $scope.loadMoreData = function() 
  {
    $scope.lastpage += 1;
    var url = Config.url + 'publicaciones-all?page=' + $scope.lastpage + "&user_token=" + localStorage.getItem("token");
    $http.get( url )
    .then(function(res) 
    {

      if (res.data.next_page_url == null) 
      {
        $scope.moredata = true;
      }

      $scope.publicaciones = $scope.publicaciones.concat(res.data.data);
      $scope.next_page_url = res.data.next_page_url;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
})

.controller('usuarios_listaCtrl', function($scope, $http, $ionicScrollDelegate, Config) 
{
  var url = Config.url + 'profile-all?user_token='+localStorage.getItem("token");
  $http.get( url )
    .then(function(res) 
    {
      //console.dir(res);
      $scope.usuarios_lista = res.data;

    });

})

.filter('searchContacts', function() 
{
  return function(items, query) 
  {
    var filtered = [];
    var letterMatch = new RegExp(query, 'i');
    for (var i = 0; i < items.length; i++) 
    {
      var item = items[i];

      if (query) 
      {
        if (letterMatch.test(item.user.first_name.substring(0, query.length))) 
        {
          filtered.push(item);
        }
      } 
      else 
      {
        filtered.push(item);
      }
    }
    //console.dir(item);
    return filtered;
  };
})

.controller('usuarioCtrl', function($scope, $http, $stateParams, Config) 
{
  var url = Config.url + 'profile/get?user_token=' + localStorage.getItem("token");
  $http.get( url )
  .then(function(res) 
  {
    $scope.usuario = res.data;
  });
})

.controller('publicarCtrl', function($scope, $stateParams, Config, $http, $cordovaFileTransfer,$ionicPopup, $state, $cordovaCamera, $ionicLoading, user) 
{

  $scope.data = 
  {
      "ImageURI": "Select Image"
    };
    $scope.takePicture = function() 
    {
      var options = 
      {
        quality: 40,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500, //what widht you want after capaturing
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options)
      .then(
        function(imageData) 
        {
          $scope.picData = imageData;
          $scope.ftLoad = true;
          $ionicLoading.show
          ({
            template: 'Foto adquirida...',
            duration: 500
          });
        },
        function(err) 
        {
          $ionicLoading.show
          ({
            template: 'Error en la carga...',
            duration: 500
          });
        })
    }


    $scope.selectPicture = function() 
    {
      var options = 
      {
        quality: 40,
        destinationType: Camera.DestinationType.DATA_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500, //what widht you want after capaturing
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(
        function(imageURI) 
        {
          window.resolveLocalFileSystemURI(imageURI, function(fileEntry) 
          {
            $scope.picData = fileEntry.nativeURL;
            $scope.ftLoad = true;
            var image = document.getElementById('myImage');
            image.src = fileEntry.nativeURL;
          });
          $ionicLoading.show({
            template: 'Foto adquirida...',
            duration: 500
          });
        },
        function(err) {
          $ionicLoading.show({
            template: 'Error en la carga...',
            duration: 500
          });
        })
    };

    $scope.delPhoto = function()
    {
        $scope.picData = false;
    }

    $scope.uploadPicture = function(mispub) 
    {
      $ionicLoading.show
      ({
        template: 'Procesando...'
      });

      if(mispub === undefined || $scope.picData === undefined)
      {
        var alertPopup = $ionicPopup.alert
        ({
          title: 'Error!',
          template: 'Imagen o contenido no pueden ser vacios'
        });
        $ionicLoading.hide();
        $state.go('app.publicar');
      }
      var fileURL = $scope.picData;
      var options = new FileUploadOptions();
      options.headers = {
          Connection: "close"
      };
      options.fileKey = "file";
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      options.chunkedMode = false;
      options.httpMethod = "POST";


      var params = {};
      params.user_token = localStorage.getItem("token");
      params.contenido = mispub.contenido;

      options.params = params;


      $cordovaFileTransfer.upload(Config.url + "uploadImg/publicaciones", fileURL, options).then(function(result) 
      {
        var r = JSON.parse( result.response );
        if(r.status === "NIMAGEN")
        {
          var alertPopup = $ionicPopup.alert
          ({
            title: 'Error!',
            template: 'Favor elegir imagen para la publicacion'
          });

          $state.go('app.publicar');
        }
        else
        {
          if(r.status === "OK")
          {
            var alertPopup = $ionicPopup.alert
            ({
              title: 'Ok!',
              template: 'Publicacion realizada correcmente'
            });
            $scope.picData = false;
            $state.go('app.publicaciones');
          }
          else
          {
            var alertPopup = $ionicPopup.alert
            ({
              title: 'ERROR!',
              template: 'Ocurrio un error con la imagen de la publicacion, favor intentar de nuevo'
            });
            $scope.picData = false;
            $state.go('app.publicar');
          }
        }
        $ionicLoading.hide();
      }, 
      function(err) 
      {
        var alertPopup = $ionicPopup.alert
        ({
          title: 'Error!',
          template: 'Hubo un error al actualizar'
        });
        $ionicLoading.hide();
      }, 
      function (progress) 
      {
          // constant progress updates
      });
    }


    $scope.crear = function(mispub)
    {
      $ionicLoading.show
      ({
        template: 'Procesando...'
      });

      $http.post(Config.url + 'crear/publicaciones', 
      {
        user_token: localStorage.getItem("token"),
        titulo: mispub.titulo,
        resumen: mispub.resumen,
        contenido: mispub.contenido,
    })
    .then(function(result) 
    {
      if (result.data.status === 'OK') 
      {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert
        ({
          title: 'Ok!',
          template: 'Publicacion realizada correcmente'
        });
        $state.go('app.publicaciones');
      } 
      else 
      {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert
        ({
          title: 'Error!',
          template: 'Hubo un error al actualizar'
        });
      }
    }, 
    function(error) 
    {
      //console.log(error);
    });
    ////console.log("FINISHED ON CREATE A POST");
    }
})

.controller('loginCtrl', function($scope, LoginService, $ionicPopup, $state, user, Config, $ionicLoading) 
{
  if( localStorage.getItem("token") )
    $state.go('app.noticias');

  $scope.data = {};

  $scope.login = function(loginData) 
  {

    $ionicLoading.show
    ({
      template: 'Procesando...'
    });

    LoginService.loginUser(loginData.username, loginData.password).success(function(data) 
    {
      if (data.data.status === 'OK') 
      {
        user.token = data.data.user_token;
        user.nombre = data.data.nombre;
        user.imgProfile = data.data.profile_img
        $ionicLoading.hide();
        localStorage.setItem("token", user.token);
        ////console.log("==================");
        ////console.log(user);
        $state.go('app.noticias');
      } else {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: 'Credenciales incorrectas, favor verificar!'
        });
      }
    }).error(function(data) 
    {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'Credenciales incorrectas, favor verificar!'
      });
    });
  }
})
.controller('contactoCtrl', function($scope, $ionicLoading, $ionicHistory, $timeout, $state, user, $http, Config) 
{

  $ionicLoading.show
  ({
    template: 'Procesando...'
  });
  var url = Config.url + "contacto?user_token=" + localStorage.getItem("token");
  ////console.log(url);
  $http.get( url )
  .then(function(result) 
  {
    $ionicLoading.hide();
    $scope.contacto = result.data;
  }, function(error) 
  {
    $ionicLoading.hide();
  });

})