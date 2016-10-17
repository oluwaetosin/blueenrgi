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
            _product._METHOD= 'PUT';
            return $http({
                method: 'POST',
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
            _user._METHOD= 'PUT';
            return $http({
                method: 'POST',
                url: apiUrl + "users/" + _user.id,
                data : _user
            });
        }; 
        api.deleteUser = function(_id){
            return $http({
                method: 'DELETE',
                url: apiUrl + "users/" +_id 
            });
            
        
        };
        
        
        
        
        api.addPurchase = function(_purchase){
            return $http({
                method: 'POST',
                url: apiUrl + "purchase",
                data: _purchase
            });
        };
        api.addPurchaseLoading = function(_purchase){
            _purchase._METHOD= 'PUT';
            return $http({
                method: 'POST',
                url: apiUrl + "purchase/loading/" + _purchase.purchase_id,
                data: _purchase
            });
        };
        api.addPurchaseClearance = function(_purchase){
            _purchase._METHOD= 'PUT';
            return $http({
                method: 'POST',
                url: apiUrl + "purchase/clearance/" + _purchase.purchase_id,
                data: _purchase
            });
        };
        
         api.getPurchase = function(_id){
            return $http({
                method: 'GET',
                url: apiUrl + "purchase/" + _id 
            });
        }; 
        api.getPurchases = function(){
            return $http({
                method: 'GET',
                url: apiUrl + "purchase" 
            });
        }; 
        api.updatePurchase = function(_purchase){
            _purchase._METHOD= 'PUT';
            return $http({
                method: 'POST',
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
        
         api.getDispatches = function(){
            return $http({
                method: 'GET',
                url: apiUrl + "dispatch" 
            });
        };
        api.getDispatch = function(_id){
            return $http({
                method: 'GET',
                url: apiUrl + "dispatch/" + _id
            });
        };
        
        api.addDispatch = function(_dispatch){
            return $http({
                method: 'POST',
                url: apiUrl + "dispatch",
                data: _dispatch
            });
        };
        api.updateDispatch = function(_dispatch){
            _dispatch._METHOD= 'PUT';
            return $http({
                method: 'POST',
                url: apiUrl + "dispatch/" + _dispatch.id,
                data : _dispatch
            });
        }; 
        api.deleteDispatch = function(_id){
            return $http({
                method: 'DELETE',
                url: apiUrl + "dispatch/" +_id 
            });
        };
        api.login = function(_user){
            return $http({
                method: 'POST',
                url: apiUrl + "login",
                data: _user
            });
        };
        api.signup = function(_user){
            return $http({
                method: 'POST',
                url: apiUrl + "signup",
                data: _user
            });
        };
        
       return api;
            
}]);