app.controller('editDispatchCtrl',['$scope','ApiManager','GenOps','$stateParams',function($scope,ApiManager,GenOps,$stateParams ){
   $scope.activeDispatch = GenOps.getActiveDispatch();
   
   if(!$scope.activeDispatch){
     var id = $stateParams.id;
       $scope.$parent.$parent.isPreloading = true;
     ApiManager.getDispatch(id)
             .success(function(data){
                 $scope.activeDispatch = data;
                 $scope.$parent.$parent.isPreloading = false;  
             })
             .error(function(){
                  $scope.$parent.$parent.isPreloading = false; 
             });
   }
   $scope.updateDispatch = function(_activeDispatch){
      
     
        $scope.$parent.$parent.isPreloading = true;
      ApiManager.updateProduct(_activeDispatch)
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

