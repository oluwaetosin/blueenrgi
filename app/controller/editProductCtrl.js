app.controller('editProductCtrl',['$scope','ApiManager','GenOps','$stateParams',function($scope,ApiManager,GenOps,$stateParams ){
   $scope.activeProduct = GenOps.getActiveProduct();
   
   if(!$scope.activeProduct){
     var id = $stateParams.id;
       $scope.$parent.$parent.isPreloading = true;
     ApiManager.getProduct(id)
             .success(function(data){
                 $scope.activeProduct = data;
                 $scope.$parent.$parent.isPreloading = false;  
             })
             .error(function(){
                  $scope.$parent.$parent.isPreloading = false; 
             });
   }
   $scope.updateProduct = function(_activeProduct){
      if(!_activeProduct.name || !_activeProduct.description){
          return false;
      } 
     
        $scope.$parent.$parent.isPreloading = true;
      ApiManager.updateProduct(_activeProduct)
              .success(function(data){
                if(data){
                  
            GenOps.toast("Item successfully Updated",0);
            
            $scope.$parent.$parent.isPreloading = false; 
                }
              })
              .error(function(data){
                  GenOps.toast("Error occurred while updating Item");
               $scope.$parent.$parent.isPreloading = false;
              });
    }; 
    $('.button-collapse').sideNav('hide');
}]);

