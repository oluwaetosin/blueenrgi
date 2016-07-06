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
                           });
                           
                 }])
                 
                 

