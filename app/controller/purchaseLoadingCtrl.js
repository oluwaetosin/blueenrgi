app.controller('purchaseLoadingCtrl',['$scope','ApiManager','GenOps','$stateParams','$timeout',function($scope,ApiManager,GenOps,$stateParams,$timeout){
  
   $scope.$parent.$parent.isLoginPage = false;   
   $scope.$parent.$parent.currentState = 'Purchase Loaading';
   $scope.$parent.$parent.currentStateValue = 'purchase.loading';
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
            
     ApiManager.addPurchaseLoading(_purchase)
              .success(function(data){
                if(data){
                     GenOps.toast("Item successfully added");
            $scope.purchase = [];
            $scope.$parent.$parent.isPreloading = false; 
                }
              })
              .error(function(data){
                  GenOps.toast("Error occurred");
               $scope.$parent.$parent.isPreloading = false;
              });
          };
     
     $timeout(function(){
          $('select').material_select();
          $('.button-collapse').sideNav('hide');
    },1000);
           
}]);

