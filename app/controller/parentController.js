 app.controller("parentController",['$scope','GenOps','$timeout','$state',function($scope,GenOps,$timeout,$state){
     $scope.name = "bluEnergi";
     var userInfo = GenOps.getToken();
     $scope.parentUser = null;
     if(userInfo){
        $scope.parentUser = jwt_decode(userInfo); 
     }
     $scope.logout  = function(){
        GenOps.setToken(); 
        $state.go('login');
     };
     
       
 }]);
 


