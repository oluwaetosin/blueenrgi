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
          if (_purchase.purchase_date instanceof Date){
           var year = _purchase.purchase_date.getFullYear();
           var month =  _purchase.purchase_date.getMonth();
           month = month.toString().length == 1 ? "0" + month.toString() : month;
           var day = _purchase.purchase_date.getDate();
           _purchase.purchase_date  = year + "-" + month + "-" + day;
           
          }
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

