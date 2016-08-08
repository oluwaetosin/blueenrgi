 app.controller("parentController",['$scope','GenOps','$timeout','$state',function($scope,GenOps,$timeout,$state){
     $scope.name = "bluEnergi";
     var userInfo = GenOps.getToken();
     $scope.parentUser = null;
     console.log($state.$current);
     if(userInfo){
        $scope.parentUser = jwt_decode(userInfo); 
     }
     $scope.logout  = function(){
        GenOps.setToken(); 
        $scope.parentUser = null;
        $state.go('login');
        
        
     };
     
     $("span.state").removeClass('hide');  
 }]);
 


