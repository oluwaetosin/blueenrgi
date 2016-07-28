app.factory('AuthInterceptor',function(GenOps){
                    
                    
                            var request = {};
                        request.request = function(config){
                            var token = GenOps.getToken();
                            if(token){
                            config.headers = config.headers || {};
                            config.headers.Authorization = 'Bearer ' + token;
                            }
                            return config;
                        };
               
                        return request;
                         
                });