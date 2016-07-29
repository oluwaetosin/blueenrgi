app.controller('loginSignupCtrl',['$scope','ApiManager','GenOps','$state',function($scope,ApiManager,GenOps,$state){
   $scope.$parent.isLoginPage = true;
   $scope.$parent.isPreloading = false; 
   $scope.login = function (_user){
       if(!_user.email){
           alert("Email is required");
       }
       if(!_user.password){
           alert("Password is required");
       }
       $scope.$parent.isPreloading = true; 
       ApiManager.login(_user)
               .success(function(data){
                   if(data.status){
                     var dataDecoded = JSON.parse(atob(data.data));
                     GenOps.setToken(dataDecoded.token);
                     $scope.$parent.parentUser = jwt_decode(dataDecoded.token); 
                       var user = jwt_decode(dataDecoded.token);
                            switch (user.level){
                                case 1:
                                    $state.go("products.list");
                                    break;
                                case 4:
                                     break;
                                default :
                                    $state.go("dispatch.new");
                                    
                            }
                   }
                  else{
                      alert (data.data);
                  }
               }).error(function(data){
                 $scope.$parent.isPreloading = false;   
               });
   };
   $('.button-collapse').sideNav('hide');
}]);

