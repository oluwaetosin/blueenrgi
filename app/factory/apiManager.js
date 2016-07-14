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
        api.updateProduct = function(_product){
            return $http({
                method: 'PUT',
                url: apiUrl + "product/"+_product.id,
                data: _product
            });
        };
         api.deleteProduct = function(_id){
            return $http({
                method: 'DELETE',
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
        
        api.getUsers = function(){
            return $http({
                method: 'GET',
                url: apiUrl + "users" 
            });
        };
         api.getUser = function(_id){
            return $http({
                method: 'GET',
                url: apiUrl + "users/" + _id 
            });
        }; 
        api.updateUser = function(_user){
            return $http({
                method: 'PUT',
                url: apiUrl + "user/" + _user.id,
                data : _user
            });
        }; 
        api.deleteUser = function(_id){
            return $http({
                method: 'DELETE',
                url: apiUrl + "users/" +_id 
            });
            
        
        };
        
        
         api.getPurchases = function(){
            return $http({
                method: 'GET',
                url: apiUrl + "purchase" 
            });
        };
        api.addPurchase = function(_purchase){
            return $http({
                method: 'POST',
                url: apiUrl + "purchase",
                data: _purchase
            });
        };
        
         api.getPurchase = function(_id){
            return $http({
                method: 'GET',
                url: apiUrl + "purchase/" + _id 
            });
        }; 
        api.updatePurchase = function(_purchase){
            return $http({
                method: 'PUT',
                url: apiUrl + "purchase/" + _purchase.id,
                data : _purchase
            });
        }; 
        api.deletePurchase = function(_id){
            return $http({
                method: 'DELETE',
                url: apiUrl + "purchase/" +_id 
            });
        };
       return api;
            
}]);