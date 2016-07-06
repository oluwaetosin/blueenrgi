app.factory('ApiManager',['myConfig','$http',function(myConfig,$http){
    var apiUrl = myConfig.apiUrl;
        var api = {};
        api.getProducts = function(){
            return $http({
                method: 'GET',
                url: apiUrl + "products" 
            });
        };
        
        api.getProduct = function(_id){
            return $http({
                method: 'GET',
                url: apiUrl + "product/"+_id 
            });
        };
         api.addProduct = function(_product){
            return $http({
                method: 'POST',
                url: apiUrl + "product",
                data: _product
            });
        };
       return api;
            
}]);