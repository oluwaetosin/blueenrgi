module.exports = function(grunt) {
require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
  grunt.initConfig({
   copyFiles: {
    options: {
    appDirectory : ['app/'],
    cssDirectory : 'app/css/',
    jsDirectory : 'app/js/',
    cssLibDirectory : 'app/lib/css/',
    jsLibDirectory : 'app/lib/js/',
    dest: 'C:/\wamp64/\www/\blueenrgi/',
    libDirectory: 'app/lib/'    
    }
    },
    
       concat: {
   appCss: {
      src: ['app/app.css','app/assets/css/userprofile.css'],
      dest: 'dist/css/app.css'
     },
     libCss: {
      src: ['bower_components/html5-boilerplate/dist/css/normalize.css','bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/html5-boilerplate/dist/css/main.css',
            'app/assets/css/magnific-popup.css','app/assets/css/jquery-ui.min.css',
            'app/assets/css/icon/css/font-awesome.min.css','app/assets/css/font/geogrotesque/stylesheet.css','app/assets/css/ui-bootstrap-csp.css','app/assets/css/select.css'],
      dest: 'dist/css/lib.css'
    },
    angularLib: {
      src: ['bower_components/angular/angular.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.js',
            'bower_components/angular-strap/dist/angular-strap.js',
            'bower_components/angular-strap/dist/angular-strap.tpl.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/ng-file-upload-shim/ng-file-upload-shim.js',
            'bower_components/ng-file-upload-shim/ng-file-upload.js',
            'bower_components/restangular/dist/restangular.js',
            'bower_components/bootstrap-timepicker/js/bootstrap-timepicker.js',
            'bower_components/checklist-model/checklist-model.js',
            'app/assets/js/select2.js',
            'app/assets/js/angular-sanitize.js',
            'app/assets/js/select.min.js',
            'app/assets/js/ng-map.min.js',
            'app/assets/js/angular-nicescroll.js',
            'app/assets/js/angular-datepicker.min.js',
            'app/assets/js/angular-animate.min.js',
            'app/assets/js/angular-pageslide-directive.min.js',
            'app/assets/js/directives/custom.js',
            'app/components/version/version.js',
            'app/components/version/version-directive.js',
             'app/components/version/interpolate-filter.js',
             'app/assets/js/ui-bootstrap-tpls.js'
             ],
             
      dest: 'dist/js/lib.angular.js'
    },
    app: {
      src: ['app/app.js','app/view1.js',
      'app/assets/js/controllers/bookingCtrl.js','app/assets/js/controllers/userProfileCtrl.js','app/assets/js/factory/wordpress_authenticate.js',
      'app/assets/js/factory/apiManager.js','app/assets/js/factory/genOpsFactory.js','app/assets/js/factory/geocode.js'],
      dest: 'dist/js/app.js'
    },
    jqueyLib:{
     src: ['bower_components/jquery/dist/jquery.css',
           'bower_components/bootstrap/dist/js/bootstrap.js',
           'bower_components/jquery-ui/jquery-ui.js',
           'app/assets/js/jquery.nicescroll.min.js',
           'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
           'bower_components/underscore/underscore.js',
           'app/assets/js/underscorefix.js',
           'app/assets/js/moment.min.js'],
           
      dest: 'dist/js/lib.jquery.js'
    }
}
  });

   
  
 
 grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
 grunt.registerTask('default',['concat']); 
 grunt.registerTask('copyToLocalhost','Copy Files',function(){
    files = grunt.config.get('copyFiles.options.appDirectory');
    workingDirectory = grunt.config.get('copyFiles.options.dest');
    var recursiveCopy = function(source, destination){
    if(grunt.file.isDir(source)){
    grunt.file.recurse(source, function(file){
    recursiveCopy(file, destination);
    });
    }else{
    grunt.log.writeln('Copying ' + source + ' to ' + destination);
    grunt.file.copy(source, destination + '/' + source);
    }
    };
   files.forEach(function(item) {
   recursiveCopy(item, workingDirectory);
   });
});
 
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


