app.factory('GenOps',['$window',function($window){
    
        var genOps = {};
        var storage = $window.localStorage;
        var key = "bluenergi-auth-token";
        var activeProduct = null;
         var activeUser = null;
         var activePurchase = null;
         var activeDispatch = null;
           genOps.setActiveProduct = function (_activeProduct){
               activeProduct = _activeProduct;
           };
           genOps.getActiveProduct = function(){
               return activeProduct;
           };
            genOps.setActiveUser = function (_activeUser){
               activeUser = _activeUser;
           };
           genOps.getActiveUser = function(){
               return activeUser;
           };
           genOps.setActivePurchase = function (_activePurchase){
               activePurchase = _activePurchase;
           };
           genOps.getActivePurchase = function(){
               return activePurchase;
           };
            genOps.setActiveDispatch = function (_activeDispatch){
               activeDispatch = _activeDispatch;
           };
           genOps.getActiveDispatch = function(){
               return activeDispatch;
           };
           genOps.getToken = function(){
                                   return storage.getItem(key);
                                  };
           genOps.setToken = function (token){
                           if(token){
                               storage.setItem(key,token);
                           }else{
                               storage.removeItem(key);
                           }
                        };
                        
          genOps.toast = function (message){
                var $toastContent = $('<span>'+message+'</span>');
                 $window.Materialize.toast($toastContent, 5000);  
          }; 
       return genOps;
            
}]);