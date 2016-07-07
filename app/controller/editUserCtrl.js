app.controller('editUserCtrl',['$scope','ApiManager','GenOps','$stateParams',function($scope,ApiManager,GenOps,$stateParams ){
   $scope.activeUser = GenOps.getActiveProduct();
   
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
}]);

