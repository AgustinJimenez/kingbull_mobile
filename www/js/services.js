angular.module('starter.services', [])

.service('LoginService', function($http, $q, $window, $rootScope) 
{

    var urlBase = 'http://192.168.0.7:8000/en/api/v1/';
    //var urlBase = 'http://kingbull.info/public/es/api/v1/';

    return {


        loginUser: function(username, password) 
        {
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http.post(urlBase + "ingresar", 
            {
                email: username,
                password: password
            })
            .then(function(result) 
            {

                deferred.resolve(result);
            }, function(error) 
            {
                deferred.reject(error);
            });

            promise.success = function(fn)
             {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) 
            {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});

/*return {
    loginUser: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        if (name == 'user' && pw == 'secret') {
            deferred.resolve('Bienvenido ' + name + '!');
        } else {
            deferred.reject('Credenciales incorrectas.');
        }




        promise.success = function(fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function(fn) {
            promise.then(null, fn);
            return promise;
        }
        return promise;
    }
}*/
