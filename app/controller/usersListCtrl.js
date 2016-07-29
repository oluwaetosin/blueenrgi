app.controller('usersListCtrl',['$scope','ApiManager','GenOps','$state',function($scope,ApiManager,GenOps,$state){
   $scope.$parent.$parent.isPreloading = true;
   $scope.$parent.$parent.isLoginPage = false;   
   $scope.$parent.$parent.currentState = 'Users';
    ApiManager.getUsers()
           .success(function(data){
               $scope.users = data;
       $scope.$parent.$parent.isPreloading = false;
           })
           .error(function(data){
               console.log(data);
               $scope.$parent.isPreloading = false;
           });
           
   $scope.delete  = function(_user){
       $scope.activeUser = _user;
       $('#modal1').openModal();
   };
   $scope.cancel  = function(){
       $scope.activeUser = null;
       $('#modal1').closeModal();
   };
   $scope.edit  = function(_user){
       GenOps.setActiveUser(_user);
       $state.go('users.edit',{id:_user.id});
   };
   
   $scope.confirmDelete = function(_id){
     ApiManager.deleteUser(_id)
             .success(function(data){
                 alert("Success"); 
                  $('#modal1').closeModal();
                   var index = _.findIndex($scope.users,function(_user){
                      return _user.id = _id;
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
   $('.button-collapse').sideNav('hide');         
}]);

