app.controller('productCtrl',['$scope','ApiManager','GenOps','$state',function($scope,ApiManager,GenOps,$state){
   $scope.$parent.$parent.isPreloading = true;
   $scope.$parent.$parent.isLoginPage = false;   
   $scope.$parent.$parent.currentState = 'Products';
    $scope.$parent.$parent.currentStateValue = 'products.list';
    ApiManager.getProducts()
           .success(function(data){
               $scope.products = data;
       $scope.$parent.$parent.isPreloading = false;
           })
           .error(function(data){
               console.log(data);
               $scope.$parent.isPreloading = false;
           });
           
   $scope.delete  = function(_product){
       $scope.activeProduct = _product;
       $('#modal1').openModal();
   };
   $scope.cancel  = function(_product){
       $scope.activeProduct = null;
       $('#modal1').closeModal();
   };
   $scope.edit  = function(_product){
       GenOps.setActiveProduct(_product);
       $state.go('products.edit',{id:_product.id});
   };
   
   $scope.confirmDelete = function(_id){
     ApiManager.deleteProduct(_id)
             .success(function(data){
                GenOps.toast("Item successfully deleted");
                  $('#modal1').closeModal();
             })
             .error(function(data){
                  GenOps.toast("Error occurred, Item not deleted");
             });
   };
    $('.button-collapse').sideNav('hide');        
}]);

