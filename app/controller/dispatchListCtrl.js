app.controller('dispatchListCtrl',['$scope','ApiManager','GenOps','$state',function($scope,ApiManager,GenOps,$state){
   $scope.$parent.$parent.isPreloading = true;
   $scope.$parent.$parent.isLoginPage = false;   
   $scope.$parent.$parent.currentState = 'Dispatch';
    ApiManager.getDispatches()
           .success(function(data){
               $scope.dispatch = data;
       $scope.$parent.$parent.isPreloading = false;
           })
           .error(function(data){
               console.log(data);
               $scope.$parent.isPreloading = false;
           });
           
   $scope.delete  = function(_dispatch){
       $scope.activeDispatch = _dispatch;
       $('#modal1').openModal();
   };
   $scope.cancel  = function(){
       $scope.activeDispatch = null;
       $('#modal1').closeModal();
   };
   $scope.edit  = function(_dispatch){
       GenOps.setActiveDispatch(_dispatch);
       $state.go('dispatch.edit',{id:_dispatch.id});
   };
   
   $scope.confirmDelete = function(_id){
     ApiManager.deleteDispatch(_id)
             .success(function(data){
                 alert("Success"); 
                  $('#modal1').closeModal();
                   var index = _.findIndex($scope.dispatch,function(_dispatch){
                      return _dispatch.id = _id;
                  });
                  if(index == -1){
                      return;
                  }
                  $scope.dispatch.splice(index,1);
             })
             .error(function(data){
                 alert("Error Occured");
             });
   };
            
}]);

