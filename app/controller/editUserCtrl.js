app.controller('editUserCtrl',['$scope','ApiManager','GenOps','$stateParams','myConfig',
                       '$timeout',function($scope,ApiManager,GenOps,$stateParams,myConfig,$timeout){
   $scope.activeUser = GenOps.getActiveUser();
   $scope.levels = myConfig.levels;
   if(!$scope.activeUser){
     var id = $stateParams.id;
       $scope.$parent.$parent.isPreloading = true;
     ApiManager.getUser(id)
             .success(function(data){
                 $scope.activeUser = data;
                 $scope.$parent.$parent.isPreloading = false;  
             })
             .error(function(){
                  $scope.$parent.$parent.isPreloading = false; 
             });
   }
   $scope.updateUser = function(_activeUser){
      if(!_activeUser.email || !_activeUser.firstname || !_activeUser.phonenumber){
          return false;
      } 
     
        $scope.$parent.$parent.isPreloading = true;
      ApiManager.updateUser(_activeUser)
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
    $timeout(function(){
          $('select').material_select();
          $('.button-collapse').sideNav('hide');
    },3000);
}]);

