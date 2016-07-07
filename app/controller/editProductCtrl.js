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
                    alert("Success");
            
            $scope.$parent.$parent.isPreloading = false; 
                }
              })
              .error(function(data){
                  alert("Failure");
               $scope.$parent.$parent.isPreloading = false;
              });
    };        
}]);

