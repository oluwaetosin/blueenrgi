app.factory('GenOps',[function(){
    
        var genOps = {};
        var activeProduct = null;
         var activeUser = null;
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
       return genOps;
            
}]);