app.controller('editPurchaseCtrl',['$scope','ApiManager','GenOps','$stateParams','myConfig',
                       '$timeout',function($scope,ApiManager,GenOps,$stateParams,myConfig,$timeout){
   function sanitizePurchase(_purchase){
       _purchase.users_Id = parseInt(_purchase.users_Id);
       _purchase.quantity = parseInt(_purchase.quantity);
       _purchase.amount_payed = parseFloat(_purchase.amount_payed);
       _purchase.price_per_litre = parseFloat(_purchase.price_per_litre);
       _purchase.clearance_amount = parseFloat(_purchase.clearance_amount);
       if(_purchase.purchase_date && !(_purchase.purchase_date instanceof  Date)){
          _purchase.purchase_date = new Date(_purchase.purchase_date) 
       }
       return _purchase;
   }
    $scope.$parent.$parent.currentStateValue = 'purchase.edit';
    $scope.$parent.$parent.currentState = 'Edit Purchase';
    $scope.products = [];
    $scope.users = []; 
     ApiManager.getUsers()
           .success(function(data){
               $scope.users = data;
       $scope.$parent.$parent.isPreloading = false;
           })
           .error(function(data){
               console.log(data);
               $scope.$parent.$parent.isPreloading = false;
           });
    ApiManager.getProducts()
           .success(function(data){
               $scope.products = data;
       $scope.$parent.$parent.isPreloading = false;
           })
           .error(function(data){
               console.log(data);
               $scope.$parent.$parent.isPreloading = false;
           });
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
                  GenOps.toast("Item successfully Updated",0);
       
            $scope.$parent.$parent.isPreloading = false; 
                }
              })
              .error(function(data){
                GenOps.toast("Error occurred while updating Item");
               $scope.$parent.$parent.isPreloading = false;
              });
    };  
    $timeout(function(){
          $('select').material_select();
          $('.button-collapse').sideNav('hide');
    },1000);
}]);

