app.controller('purchaseClearanceCtrl',['$scope','ApiManager','GenOps','$stateParams','$timeout',function($scope,ApiManager,GenOps,$stateParams,$timeout){
  
   $scope.$parent.$parent.isLoginPage = false;   
   $scope.$parent.currentState = 'Purchase Clearance';
    $scope.products = [];
    $scope.purchase = {};
    $scope.$parent.$parent.isPreloading = true;
    ApiManager.getProducts()
           .success(function(data){
               $scope.products = data;
       $scope.$parent.$parent.isPreloading = false;
           })
           .error(function(data){
               console.log(data);
             $scope.$parent.$parent.isPreloading = false;
           });
      $scope.addPurchase = function (_purchase){
            
     ApiManager.addPurchaseClearance(_purchase)
              .success(function(data){
                if(data){
                  GenOps.toast("Item successfully added");
            $scope.purchase = [];
            $scope.$parent.$parent.isPreloading = false; 
                }
              })
              .error(function(data){
                 GenOps.toast("Error occurred, item not added");
               $scope.$parent.$parent.isPreloading = false;
              });
          };
     
     $timeout(function(){
          $('select').material_select();
          $('.button-collapse').sideNav('hide');
    },1000);
           
}]);

