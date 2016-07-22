app.controller('editDispatchCtrl',['$scope','ApiManager','GenOps','$stateParams',function($scope,ApiManager,GenOps,$stateParams ){
   $scope.activeDispatch = GenOps.getActiveDispatch();
   function filterDispatch(_dispatch){
       _dispatch.purchase_Id = parseInt(_dispatch.purchase_Id);
       _dispatch.customer_Id = parseInt(_dispatch.customer_Id);
      
       _dispatch.sold_qty = parseInt(_dispatch.sold_qty);
       _dispatch.storage_balance = parseFloat(_dispatch.storage_balance);
        _dispatch.sold_rate = parseFloat(_dispatch.sold_rate);
       _dispatch.outstanding  = parseFloat(_dispatch.outstanding);
        _dispatch.amount_paid = parseFloat(_dispatch.amount_paid);
       _dispatch.payment_due_date = _dispatch.payment_due_date  instanceof Date ? 
                                     _dispatch.payment_due_date : new Date(_dispatch.payment_due_date);
        _dispatch.actual_payment_date = _dispatch.actual_payment_date  instanceof Date ? 
        _dispatch.actual_payment_date : new Date(_dispatch.actual_payment_date);
        
        return _dispatch;
   }
   if(!$scope.activeDispatch){
     var id = $stateParams.id;
       $scope.$parent.$parent.isPreloading = true;
     ApiManager.getDispatch(id)
             .success(function(data){
                 $scope.activeDispatch = filterDispatch(data);
                 $scope.$parent.$parent.isPreloading = false;  
             })
             .error(function(){
                  $scope.$parent.$parent.isPreloading = false; 
             });
   }
   $scope.updateDispatch = function(_activeDispatch){
      
     
        $scope.$parent.$parent.isPreloading = true;
      ApiManager.updateProduct(_activeDispatch)
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
}]);

