var app = angular.module('bluEnergi',['ngMaterial','ui.router','ngMap'])
                 .config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider, $urlRouterProvider,$httpProvider){
                  $httpProvider.interceptors.push('AuthInterceptor'); 
                  
                    $httpProvider.defaults.transformRequest = function(data){
                        if (data === undefined) {
                          return data;
                        }
                        return $.param(data);
                      };
                      $httpProvider.defaults.headers.post['Content-Type'] = ''
                        + 'application/x-www-form-urlencoded; charset=UTF-8';
                
                  $urlRouterProvider.otherwise("/login");
                  
               
               
                   $stateProvider.
                           state('login',{
                               url: '/login',
                               templateUrl: 'views/login-signup.html',
                               controller: 'loginSignupCtrl'
                           })
                            .state('products',{
                             url: '/products',
                               templateUrl: 'views/product.html',   
                            })
                           .state('products.list',{
                               url: '/products/list',
                               templateUrl: 'views/products.list.html',
                               controller: 'productCtrl'
                           })
                            .state('products.new',{
                               url: '/products/new',
                               templateUrl: 'views/products.new.html',
                               controller: 'newProductCtrl'
                           })
                           .state('products.edit',{
                               url: '/products/edit/:id',
                               templateUrl: 'views/products.edit.html',
                               controller: 'editProductCtrl'
                           })
                           .state('users',{
                               url: '/users',
                               templateUrl: 'views/users.html'
                           })
                           .state('users.list',{
                               url: '/users/list',
                               templateUrl: 'views/users.list.html',
                               controller: 'usersListCtrl'
                           })
                           .state('users.edit',{
                               url: '/users/edit/:id',
                               templateUrl: 'views/users.edit.html',
                               controller: 'editUserCtrl'
                           })
                            .state('purchase',{
                               url: '/purchase',
                               templateUrl: 'views/purchase.html'
                           })
                           .state('purchase.list',{
                               url: '/purchase/list',
                               templateUrl: 'views/purchase.list.html',
                               controller: 'purchaseListCtrl'
                           })
                           .state('purchase.new',{
                               url: '/purchase/new',
                               templateUrl: 'views/purchase.new.html',
                               controller: 'newPurchaseCtrl'
                           })
                           .state('purchase.loading',{
                               url: '/purchase/loading',
                               templateUrl: 'views/purchase.loading.html',
                               controller: 'purchaseLoadingCtrl'
                           })
                           .state('purchase.clearance',{
                               url: '/purchase/clearance',
                               templateUrl: 'views/purchase.clearance.html',
                               controller: 'purchaseClearanceCtrl'
                           })
                            .state('purchase.payment',{
                               url: '/purchase/payment',
                               templateUrl: 'views/purchase.payment.html',
                               controller: 'purchasePaymentCtrl'
                           }).state('purchase.edit',{
                               url: '/purchase/edit/:id',
                               templateUrl: 'views/purchase.edit.html',
                               controller: 'editPurchaseCtrl'
                           }).state('dispatch',{
                               url: '/dispatch',
                               templateUrl: 'views/dispatch.html'
                           })
                           .state('dispatch.list',{
                               url: '/dispatch/list',
                               templateUrl: 'views/dispatch.list.html',
                               controller: 'dispatchListCtrl'
                           })
                           .state('dispatch.new',{
                               url: '/dispatch/new',
                               templateUrl: 'views/dispatch.new.html',
                               controller: 'newDispatchCtrl'
                           }).state('dispatch.edit',{
                               url: '/dispatch/edit/:id',
                               templateUrl: 'views/dispatch.edit.html',
                               controller: 'editDispatchCtrl'
                           });
                           
                 }])
                     .run(['$rootScope', '$location', '$state', 'GenOps',function($rootScope, $location, $state, GenOps) {
                         $rootScope.$on( '$stateChangeStart', ["e","toState"  ,"toParams"
                                                   ,"fromState","fromParams",function(e, toState  , toParams
                                                   , fromState, fromParams) {
       
        var isLogin = toState.name === "login";
        if(isLogin){
           return; // no need to redirect 
        }
        

        // now, redirect only not authenticated

        var userInfo = GenOps.getToken();
        if(!userInfo) {
            e.preventDefault(); // stop current execution
            $state.go('login'); // go to login
        }
    }]); 
                     }]);
                 
                 

