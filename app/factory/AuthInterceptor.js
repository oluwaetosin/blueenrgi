app.factory('AuthInterceptor',function(GenOps,$q,$window,myConfig){
                    
                    
                            var request = {};
                        request.request = function(config){
                            var token = GenOps.getToken();
                            if(token){
                            config.headers = config.headers || {};
                            config.headers.Authorization = 'Bearer ' + token;
                            }
                            return config;
                        };
                        request.responseError = function(response) {
        if (response.status == 401){
            window.location = myConfig.appDirectory+"/#/login";
        }
        return $q.reject(response);
    };
               
                        return request;
                         
                });