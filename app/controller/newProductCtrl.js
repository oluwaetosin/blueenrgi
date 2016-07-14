app.controller('newProductCtrl',['$scope','ApiManager',function($scope,ApiManager){
   $scope.newProduct = {};
   $scope.addProduct = function(_name,_description){
      if(!_name || !_description){
          return false;
      } 
      var product = {name:_name,description:_description}
        $scope.$parent.$parent.isPreloading = true;
      ApiManager.addProduct(product)
              .success(function(data){
                if(data){
                    alert("Success");
            $scope.name = "";
            $scope.description = "";
            $scope.$parent.$parent.isPreloading = false; 
                }
              })
              .error(function(data){
                  alert("Failure");
               $scope.$parent.$parent.isPreloading = false;
              });
    };  
    
}]);

