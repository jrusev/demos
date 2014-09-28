'use strict';

ticTacToeApp.factory('ticTacToeData', function ($http, $q, baseServiceUrl) {
    var url = baseServiceUrl;

    //var url = 'http://localhost:4444';
    
    function convertToQueryString(obj) {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };
    
    function getAuthHeader(access_token) {
        return { 'Authorization': 'Bearer ' + access_token };
    };

    function getGames(type, access_token) {
        var deferred = $q.defer();
        
//        if (page && category)
//            articlesApi += '?page=' + page + '&category=' + category
//
//        if (page) 
//            articlesApi += '?page=' + page
//
//        if (category)
//            articlesApi += '?category=' + category
        
        $http.get(url + '/api/Games/' + type, { headers: getAuthHeader(access_token) })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    }

    return {
        register: function (username, password) {
            var deferred = $q.defer();

            $http.post(url + '/api/Account/Register', {
                    Username: username,
                    Password: password,
                    ConfirmPassword: password
                },
                {
                    transformRequest: convertToQueryString,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        },
        login: function (username, password) {
            var deferred = $q.defer();

            $http.post(url + '/Token', {
                    username: username,
                    password: password,
                    grant_type: "password"
                },
                {
                    transformRequest: convertToQueryString,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        },
        logout: function(access_token) {            
            var deferred = $q.defer();
            
            $http.post(url + '/api/Account/Logout', {},
                {
                    transformRequest: convertToQueryString,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'authorization': 'Bearer ' + access_token
                    }
                })
                .success(function (data) {                    
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;            
        },
        getUsers: function () {
            var deferred = $q.defer();

            $http.get(url + '/api/Users/All')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        getScores: function () {
            var deferred = $q.defer();

            $http.get(url + '/api/Scores/Top')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        getMyGames: function (access_token) {
            return getGames('MyGames', access_token);
        },
        getAvailableGames: function (access_token) {
            return getGames('AvailableGames', access_token);
        },
        getJoinedGames: function (access_token) {
            return getGames('JoinedGames', access_token);
        },
        getMyGamesHistory: function (access_token) {
            return getGames('MyGamesHistory', access_token);
        },
        createGame: function (gameName, access_token) {
            var deferred = $q.defer();

            $http.post(url + '/api/Games/Create', {
                    Name: gameName
                },
                {
                    transformRequest: convertToQueryString,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'authorization': 'Bearer ' + access_token
                    }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        },
        joinGame: function (gameId, access_token) {
            var deferred = $q.defer();

            $http.post(url + '/api/Games/Join', {
                    GameId: gameId
                },
                {
                    transformRequest: convertToQueryString,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'authorization': 'Bearer ' + access_token
                    }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        },
        getGameStatus: function (gameId, access_token) {
            var deferred = $q.defer();

            $http.post(url + '/api/Games/Status', {
                    GameId: gameId
                },
                {
                    transformRequest: convertToQueryString,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'authorization': 'Bearer ' + access_token
                    }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        },
        playGame: function (gameId, row, col, access_token) {
            var deferred = $q.defer();

            $http.post(url + '/api/Games/Play', {
                    GameId: gameId,
                    Row: row,
                    Col: col
                },
                {
                    transformRequest: convertToQueryString,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'authorization': 'Bearer ' + access_token
                    }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }
    }
});
