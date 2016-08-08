app.controller('newProductCtrl',['$scope','ApiManager','GenOps',function($scope,ApiManager,GenOps){
   $scope.newProduct = {};
   $scope.$parent.$parent.currentStateValue = 'products.new';
   $scope.$parent.$parent.currentState = 'New Product';
   $scope.addProduct = function(_name,_description){
      if(!_name || !_description){
          return false;
      } 
      var product = {name:_name,description:_description}
        $scope.$parent.$parent.isPreloading = true;
      ApiManager.addProduct(product)
              .success(function(data){
                if(data){
                   GenOps.toast("Item successfully added");
            $scope.name = "";
            $scope.description = "";
            $scope.$parent.$parent.isPreloading = false; 
                }
              })
              .error(function(data){
                GenOps.toast("Error occurred");
               $scope.$parent.$parent.isPreloading = false;
              });
    };  
    $('.button-collapse').sideNav('hide');
}]);

