var app = angular.module('bluEnergi',['ngMaterial','ui.router'])
                 .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
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
                           });
                           
                 }]);
                 
                 

