app.controller('newDispatchCtrl',['$scope','ApiManager','GenOps','$stateParams','$timeout',function($scope,ApiManager,GenOps,$stateParams,$timeout){
     $scope.$parent.$parent.isPreloading = false; 
   $scope.$parent.$parent.isLoginPage = false;   
   $scope.$parent.currentState = 'Add Dispatch';
   $scope.products = [];
    
      $scope.addDispatch = function (_dispatch){
          if (_dispatch.payment_due_date instanceof Date){
           var year = _dispatch.payment_due_date.getFullYear();
           var month =  _dispatch.payment_due_date.getMonth();
           month = month.toString().length == 1 ? "0" + month.toString() : month;
           var day = _dispatch.payment_due_date.getDate();
           _dispatch.payment_due_date  = year + "-" + month + "-" + day;
           
          }
          
          
           if (_dispatch.actual_payment_date instanceof Date){
           var year = _dispatch.actual_payment_date.getFullYear();
           var month =  _dispatch.actual_payment_date.getMonth();
           month = month.toString().length == 1 ? "0" + month.toString() : month;
           var day = _dispatch.actual_payment_date.getDate();
           _dispatch.actual_payment_date  = year + "-" + month + "-" + day;
           
          }
     ApiManager.addDispatch(_dispatch)
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
   $('.button-collapse').sideNav('hide');        
}]);

