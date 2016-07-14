app.controller('newPurchaseCtrl',['$scope','ApiManager','GenOps','$stateParams','$timeout',function($scope,ApiManager,GenOps,$stateParams,$timeout){
   $scope.$parent.$parent.isPreloading = true;
   $scope.$parent.$parent.isLoginPage = false;   
   $scope.$parent.currentState = 'Purchase';
   $scope.products = [];
    ApiManager.getProducts()
           .success(function(data){
               $scope.products = data;
       $scope.$parent.$parent.isPreloading = false;
           })
           .error(function(data){
               console.log(data);
               $scope.$parent.isPreloading = false;
           });
      $scope.addPurchase = function (_purchase){
     ApiManager.addPurchase(_purchase)
              .success(function(data){
                if(data){
                    alert("Success");
            $scope.purchase = [];
            $scope.$parent.$parent.isPreloading = false; 
                }
              })
              .error(function(data){
                  alert("Failure");
               $scope.$parent.$parent.isPreloading = false;
              });
          };
     
     $timeout(function(){
          $('select').material_select();
    },1000);
           
}]);

