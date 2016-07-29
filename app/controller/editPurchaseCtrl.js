app.controller('editPurchaseCtrl',['$scope','ApiManager','GenOps','$stateParams','myConfig',
                       '$timeout',function($scope,ApiManager,GenOps,$stateParams,myConfig,$timeout){
   function sanitizePurchase(_purchase){
       _purchase.users_Id = parseInt(_purchase.users_Id);
       _purchase.quantity = parseInt(_purchase.quantity);
       _purchase.amount_payed = parseFloat(_purchase.amount_payed);
       _purchase.price_per_litre = parseFloat(_purchase.price_per_litre);
       _purchase.clearance_amount = parseFloat(_purchase.clearance_amount);
       return _purchase;
   }
   $scope.activePurchase = GenOps.getActivePurchase() ? sanitizePurchase(GenOps.getActivePurchase()) : null ;
   
   $scope.levels = myConfig.levels;
   if(!$scope.activePurchase){
     var id = $stateParams.id;
       $scope.$parent.$parent.isPreloading = true;
     ApiManager.getPurchase(id)
             .success(function(data){
                 $scope.activePurchase = data;
                  $scope.activePurchase = sanitizePurchase(data);
                 $scope.$parent.$parent.isPreloading = false;  
             })
             .error(function(){
                  $scope.$parent.$parent.isPreloading = false; 
             });
   }
   $scope.updatePurchase = function(_activePurchase){
      
        if (_activePurchase.purchase_date instanceof Date){
           var year = _activePurchase.purchase_date.getFullYear();
           var month =  _activePurchase.purchase_date.getMonth();
           month = month.toString().length == 1 ? "0" + month.toString() : month;
           var day = _activePurchase.purchase_date.getDate();
           _activePurchase.purchase_date  = year + "-" + month + "-" + day;
           
          }
        $scope.$parent.$parent.isPreloading = true;
      ApiManager.updatePurchase(_activePurchase)
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
    $timeout(function(){
          $('select').material_select();
          $('.button-collapse').sideNav('hide');
    },3000);
}]);

