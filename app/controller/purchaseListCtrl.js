app.controller('purchaseListCtrl',['$scope','ApiManager','GenOps','$state',function($scope,ApiManager,GenOps,$state){
   $scope.$parent.$parent.isPreloading = true;
   $scope.$parent.$parent.isLoginPage = false;   
   $scope.$parent.$parent.currentState = 'Purchase';
    ApiManager.getPurchases()
           .success(function(data){
               $scope.purchases = data;
       $scope.$parent.$parent.isPreloading = false;
           })
           .error(function(data){
               console.log(data);
               $scope.$parent.isPreloading = false;
           });
           
   $scope.delete  = function(_purchase){
       $scope.activePurchase = _purchase;
       $('#modal1').openModal();
   };
   $scope.cancel  = function(){
       $scope.activePurchase = null;
       $('#modal1').closeModal();
   };
   $scope.edit  = function(_purchase){
       GenOps.setActiveProduct()(_purchase);
       $state.go('purchase.edit',{id:_purchase.id});
   };
   
   $scope.confirmDelete = function(_id){
     ApiManager.deletePurchase(_id)
             .success(function(data){
                 alert("Success"); 
                  $('#modal1').closeModal();
                   var index = _.findIndex($scope.purchases,function(_purchase){
                      return _purchase.id = _id;
                  });
                  if(index == -1){
                      return;
                  }
                  $scope.users.splice(index,1);
             })
             .error(function(data){
                 alert("Error Occured");
             });
   };
            
}]);

