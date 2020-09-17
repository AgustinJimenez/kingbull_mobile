angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $state) 
{
  $ionicPlatform.ready(function() 
  {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) 
    {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) 
    {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    console.log("APP", localStorage.getItem("token"), localStorage.getItem("token") );
    if( localStorage.getItem("token") )
      $state.go('app.noticias');
    else
      $state.go('login');


  });

})

.config(function($stateProvider, $urlRouterProvider) 
{

  $stateProvider

    .state('login', 
    {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('app', 
    {
      url: '/app',
      abstract: true,
      cache:false,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.perfil', 
    {
      url: '/perfil',
      cache:false,
      views: {
        'menuContent': 
        {
          templateUrl: 'templates/perfil.html',
          controller:'perfilCtrl'
        }
      }
    })

    .state('app.noticias', {
      url: '/noticias',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/noticias.html',
          controller: 'noticiasCtrl'
        }
      }
    })

    .state('app.wod', 
    {
      url: '/wod',
      cache:false,
      views: 
      {
        'menuContent': 
        {
          templateUrl: 'templates/wod.html',
          controller:'wodCtrl'
        }
      }
    })

    .state('app.reservas', 
    {
      url: '/reservas',
      cache: false,
      views: {
        'menuContent': 
        {
          templateUrl: 'templates/reservas.html',
          controller:'reservasCtrl'
        }
      }
    })
    .state('app.reservas_horarios', 
    {
      url: '/reservas/horarios/:dia_nombre/:nombre_dia_noformat/:dia_fecha/:dia_mes/:fecha',
      cache: false,
      views: {
        'menuContent': 
        {
          templateUrl: 'templates/horarios.html',
          controller:'reservas_horarios_controller'
        }
      }
    })

    .state('app.publicaciones', 
    {
      url: '/publicaciones',
      cache: false,
      views: {
        'menuContent': 
        {
          templateUrl: 'templates/publicaciones.html',
          controller: 'publicacionesCtrl'
        }
      }
    })

    .state('app.notas', 
    {
      url: '/notas',
      views: {
        'menuContent': 
        {
          templateUrl: 'templates/notas.html'
         // ,controller: 'publicacionesCtrl'
        }
      }
    })

    .state('app.contacto', 
    {
      url: '/contacto',
      cache: false,
      views: 
      {
        'menuContent': 
        {
          templateUrl: 'templates/contacto.html',
          controller: 'contactoCtrl'
        }
      }
    })

    .state('app.cerrar_sesion', 
    {
      url: '/cerrar_sesion',
      views: 
      {
        'menuContent': 
        {
          controller: 'cerrarSesionCtrl'
        }
      }
    })

    .state('app.mis_publicaciones', 
    {
      url: '/mis_publicaciones',
      cache: false,
      views: {
        'menuContent': 
        {
          templateUrl: 'templates/mis_publicaciones.html',
          controller: 'mispubCtrl'
        }
      }
    })

    .state('app.mis_publicaciones_detalles', 
    {
      url: '/mis_publicaciones/:pubId',
      cache: false,
      views: {
        'menuContent': 
        {
          templateUrl: 'templates/publicaciones_editar.html',
          controller: 'misPubDetallesCtrl'
        }
      }
    })

    .state('app.editar_perfil', 
    {
      url: '/editar_perfil',
      cache:false,
      views: {
        'menuContent': 
        {
          templateUrl: 'templates/editar_perfil.html',
          controller:  'editarCtrl'
        }
      }
    })
    .state('app.usuarios_lista', 
    {
      url: '/usuarios_lista',
      cache:false,
      views: 
      {
        'menuContent': 
        {
          templateUrl: 'templates/usuarios_lista.html',
          controller:  'usuarios_listaCtrl'
        }
      }
    })

    .state('app.usuario', 
    {
      url: '/usuarios_lista/:usuarioId',
      views: 
      {
        'menuContent': 
        {
          templateUrl: 'templates/usuario.html',
          controller:  'usuarioCtrl'
        }
      }
    })

    .state('app.publicar', 
    {
      url: '/publicaciones/publicar',
      cache:false,
      views: 
      {
        'menuContent': 
        {
          templateUrl: 'templates/publicar.html',
          controller:  'publicarCtrl'
        }
      }
    })

  ;
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/noticias');
  $urlRouterProvider.otherwise('/login');
});
