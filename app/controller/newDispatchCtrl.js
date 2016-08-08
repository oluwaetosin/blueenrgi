app.controller('newDispatchCtrl',['$scope','ApiManager','GenOps','$stateParams','$timeout',function($scope,ApiManager,GenOps,$stateParams,$timeout){
     $scope.$parent.$parent.isPreloading = false; 
   $scope.$parent.$parent.isLoginPage = false;   
   $scope.$parent.$parent.currentState = 'Add Dispatch';
   $scope.$parent.$parent.currentStateValue = 'dispatch.new';
   $scope.products = [];
    
      $scope.addDispatch = function (_dispatch){
          if (_dispatch.payment_due_date && _dispatch.payment_due_date instanceof Date){
           var year = _dispatch.payment_due_date.getFullYear();
           var month =  _dispatch.payment_due_date.getMonth();
           month = month.toString().length == 1 ? "0" + month.toString() : month;
           var day = _dispatch.payment_due_date.getDate();
           _dispatch.payment_due_date  = year + "-" + month + "-" + day;
           
          }
          
          
           if (_dispatch.amount_paid){
            _dispatch.actual_payment_date = new Date()
           var year = _dispatch.actual_payment_date.getFullYear();
           var month =  _dispatch.actual_payment_date.getMonth();
           month = month.toString().length == 1 ? "0" + month.toString() : month;
           var day = _dispatch.actual_payment_date.getDate();
           _dispatch.actual_payment_date  = year + "-" + month + "-" + day;
           
          }else{
              _dispatch.actual_payment_date = "";
              _dispatch.amount_paid.amount_paid = 0;
          }
     ApiManager.addDispatch(_dispatch)
              .success(function(data){
                if(data){
                  GenOps.toast("Action Successful");
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
    },1000);
   $('.button-collapse').sideNav('hide');        
}]);

