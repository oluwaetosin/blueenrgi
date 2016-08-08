app.controller('loginSignupCtrl',['$scope','ApiManager','GenOps','$state','$window',function($scope,ApiManager,GenOps,$state,$window){
   $scope.showLogin = true;
   $scope.showSignup = false;
     $scope.$parent.currentState =    $scope.showSignup ? 'Signup' : 'Login';
     $scope.$parent.currentStateValue = 'login';
   $scope.$parent.isLoginPage = true;
   $scope.$parent.isPreloading = false;
   $scope.activateLogin = function(){
        $scope.showLogin = true;
   $scope.showSignup = false;
   };
    $scope.activateSignup = function(){
        $scope.showLogin = false;
   $scope.showSignup = true;
   };
   $scope.login = function (_user){
       if(!_user.email){
      var $toastContent = $('<span>Email is required</span>');
      $window.Materialize.toast($toastContent, 5000);
        return  ;
       }
       if(!_user.password){
           
            var $toastContent = $('<span>Password is required</span>');
      $window.Materialize.toast($toastContent, 5000);
      return;
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
                                    $scope.$parent.isPreloading = false; 
                                    $state.go("products.list");
                                    break;
                                case 4:
                                     break;
                                default :
                                    $scope.$parent.isPreloading = false; 
                                    $state.go("dispatch.new");
                                    
                            }
                   }
                  else{
                     
                       var $toastContent = $('<span>'+data.data+'</span>');
                 $window.Materialize.toast($toastContent, 5000);
                 $scope.$parent.isPreloading = false; 
                  return  ;
      
                  }
               }).error(function(data){
                     var $toastContent = $('<span>'+data.data+'</span>');
                 $window.Materialize.toast($toastContent, 5000);
                 $scope.$parent.isPreloading = false;   
               });
   };
   
   $scope.signup = function (_user){
       if(!_user.email){
           GenOps.toast("Email is required",0);
           return;
       }
       if(!_user.password){
          
            GenOps.toast("Password is required",0);
            return;
       }
       if(!_user.firstname){
          
            GenOps.toast("Firstname is required",0);
            return;
       }
        if(!_user.lastname){
          
            GenOps.toast("lastname is required",0);
            return;
       }
        if(!_user.phonenumber){
          
            GenOps.toast("Phone Number is required is required",0);
            return;
       }
       if(_user.password !== _user.passwordagain){
           GenOps.toast("Password does not match",0);
           return;
       }
       $scope.$parent.isPreloading = true; 
       ApiManager.signup(_user)
               .success(function(data){
                   if(data.status){
                        GenOps.toast(data.data,1);
                       
                   }
                   else{
                      GenOps.toast(data.data,0);   
                   }
                   $scope.activateLogin();
              $scope.$parent.isPreloading = false; 
               }).error(function(data){
                    GenOps.toast(data.data,0);   
                 $scope.$parent.isPreloading = false;   
               });
   };
   $('.button-collapse').sideNav('hide');
}]);

