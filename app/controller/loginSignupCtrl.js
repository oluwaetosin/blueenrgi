app.controller('loginSignupCtrl',['$scope','ApiManager','GenOps','$state',function($scope,ApiManager,GenOps,$state){
   $scope.$parent.isLoginPage = true;
   
   $scope.login = function (_user){
       if(!_user.email){
           alert("Email is required");
       }
       if(!_user.password){
           alert("Password is required");
       }
       ApiManager.login(_user)
               .success(function(data){
                   if(data.status){
                     var dataDecoded = JSON.parse(atob(data.data));
                     GenOps.setToken(dataDecoded.token);
                     $state.go("dispatch.new");
                   }
                  else{
                      alert (data.data);
                  }
               }).error(function(data){
                   
               });
   };
   
}]);

