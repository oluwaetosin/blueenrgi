app.factory('GenOps',[function(){
    
        var genOps = {};
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
       return genOps;
            
}]);