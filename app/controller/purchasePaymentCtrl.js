app.controller('purchasePaymentCtrl',['$scope','ApiManager','GenOps','$stateParams','$timeout',function($scope,ApiManager,GenOps,$stateParams,$timeout){
   $scope.$parent.$parent.isPreloading = true;
   $scope.$parent.$parent.isLoginPage = false;   
   $scope.$parent.currentState = 'Purchase Payment';
   $scope.products = [];
   $scope.users = [];
    ApiManager.getProducts()
           .success(function(data){
               $scope.products = data;
       $scope.$parent.$parent.isPreloading = false;
           })
           .error(function(data){
               console.log(data);
               $scope.$parent.isPreloading = false;
           });
     ApiManager.getUsers()
           .success(function(data){
               $scope.users = data;
       $scope.$parent.$parent.isPreloading = false;
           })
           .error(function(data){
               console.log(data);
               $scope.$parent.isPreloading = false;
           });
      $scope.addPurchase = function (_purchase){
           var currentDate = new Date();
           _purchase.purchase_date  = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) +
                   "-" + currentDate.getDay();
           _purchase.quantity_confirmed = 0;
           _purchase.product_Id_confirmed = 0;
           _purchase.clearance_amount = 0;
           _purchase.clearance_bank = null;
           _purchase.product_cleared = 0;
            _purchase.price_per_litre = parseFloat(_purchase.amount_payed)  / parseInt(_purchase.quantity);            
         
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
          $('.button-collapse').sideNav('hide');
    },1000);
           
}]);

