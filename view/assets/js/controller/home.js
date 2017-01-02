var MyApp=angular.module('home',
        [
             'ngRoute',
             'ngFileUpload',
             'ngAnimate',
             'ngSanitize', 
             'ui.bootstrap'
            //'angular-loading-bar'
        ]);



MyApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
         when('/home/', {
            templateUrl: '/tpl/home.html',
            controller: 'home'
        }).
        when('/exceltovcf/', {
            templateUrl: '/tpl/exceltovcf.html',
            controller: 'home'
        }).
        when('/vcfsplitter/', {
            templateUrl: '/tpl/vcfsplitter.html',
            controller: 'home'
        }).
        when('/vcftoexcel/', {
            templateUrl: '/tpl/vcftoexcel.html',
            controller: 'home'
        }).
        when('/vcftocsv/', {
            templateUrl: '/tpl/vcftocsv.html',
            controller: 'home'
        }).
         when('/invoice/', {
            templateUrl: '/tpl/invoice.html',
            controller: 'home'
        }).
        otherwise({
            redirectTo: '/home'
        });
}]);
/*
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        //cfpLoadingBarProvider.includeSpinner = true;
        //cfpLoadingBarProvider.latencyThreshold = 500;
        //cfpLoadingBarProvider.spinnerTemplate = '<div><span class="loading">Loading...<span/></div>';
        //cfpLoadingBarProvider.spinnerTemplate = '<div class="loading"><span class="spinner"><div></div><div></div><div></div><div></div></span></div>';
        cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';
    }]);*/

MyApp.controller('homeClt',['$scope', '$window', '$http', 
    function ($scope, $window, $http) 
{
 
}]);


MyApp.controller('home',['Upload','$scope', '$window', '$http', 
    function (Upload,$scope, $window, $http) 
{

 //invoice code //
 
   $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };



   // End invoice code //

   $window.uploadDone = function (files) {
          
             console.log("onload event access", files);
             var name = files.files[0].name;
             $scope.filename=name;
             console.log("filename", name);
   }
     $scope.ExcelToVcf = function (file) 
     {
         if(file)
        {
              $scope.message = "";
        var reader = new FileReader();
          $scope.filename=file.name;
          console.log("filename",file.name);

          Upload.upload({
                url: 'http://localhost:3000/exceltovcf', 
                data:( {
                    file: file,
                } )
            }).then(function success(res) 
                    {
                        console.log('res',res);
                
                          $scope.path=res.data.path;
                          $scope.download = true;
                          console.log("path",$scope.path);
                           var params = {
                            "path":$scope.path,
                            "email":$scope.email
                                         }
                            
                                $http({
                                    method:"POST",
                                    url:"http://localhost:3000/sendmail",
                                    data: angular.toJson(params),
                                    
                                   }).then(
                                    function success(res)
                                    {
                                        console.log("message successfully send.");
                                    },
                                    function error(res)
                                    {
                                        console.log("message not sent",res);
                                   });


                    },
                    function Error(res) 
                    {
                        console.log('err',res);
                    });


                      
                      // console.log("$sope.path",$scope.path);

                       
                 /*        var params = {

                   /*    
                        var params = {

                            "path":$scope.path,
                            "email":'kumbhani.bhavesh.1@gmail.com'
                        };
                                $http({
                                    method:"POST",
                                    url:"http://localhost:3000/sendmail",
                                    data: angular.toJson(params),
                                    
                                }).then(
                                    function success(res)
                                    {
                                        console.log("message successfully send.");
                                    },
                                    function error(res)
                                    {
                                        console.log("message not sent",res);
                                    }

)*/
     } 
      else
        {
            $scope.message = 'please select file ';
            console.log('please select file ');
        } 
     }


    $scope.Convert=function(selected)
    {
console.log('selected',$scope.selectedName);
        var file=selected;
         $scope.message = "";
        if($scope.selectedName)
        {
               if(file)
               {
                     $scope.message = "";
             if($scope.selectedName=="csv")
            {
                    // csv

                    Upload.upload({
                    url: 'http://localhost:3000/vcftocsv',
                    data: ({
                        file: file
                    })
                }).then(
                    function success(res) 
                    {
                        console.log('res', res);
                        $scope.path=res.data.path;
                        $scope.download = true;
                         var params = {
                            "path":$scope.path,
                            "email":$scope.email
                                         }
                            
                                $http({
                                    method:"POST",
                                    url:"http://localhost:3000/sendmail",
                                    data: angular.toJson(params),
                                    
                                   }).then(
                                    function success(res)
                                    {
                                        console.log("message successfully send.");
                                    },
                                    function error(res)
                                    {
                                        console.log("message not sent",res);
                                   });
                    },
                    function Error(err) 
                    {
                        console.log('err', err)
                    });
            }
            if($scope.selectedName=="xlsx")
            {
                // excel

                
                    Upload.upload({
                            url: 'http://localhost:3000/vcftoEcel',
                            data: ({
                                file: file
                            })
                        }).then(
                            function success(res) 
                            {
                                console.log('res', res);
                                $scope.path=res.data.path;
                                $scope.download = true;
                                 var params = {
                            "path":$scope.path,
                            "email":$scope.email
                                         }
                            
                                $http({
                                    method:"POST",
                                    url:"http://localhost:3000/sendmail",
                                    data: angular.toJson(params),
                                    
                                   }).then(
                                    function success(res)
                                    {
                                        console.log("message successfully send.");
                                    },
                                    function error(res)
                                    {
                                        console.log("message not sent",res);
                                   });


                            },
                            function Error(err) 
                            {
                                console.log('err', err)
                            });
                    
            }

            if($scope.selectedName=="vcf")
            {
                // vcf

                
                    Upload.upload({
                        url: 'http://localhost:3000/vcftovcf',
                        data: ({
                            file: file
                        })
                    }).then(
                        function success(res) 
                        {
                            console.log('res', res);
                            $scope.path=res.data.path;
                            $scope.download = true;
                             var params = {
                            "path":$scope.path,
                            "email":$scope.email
                                         }
                            
                                $http({
                                    method:"POST",
                                    url:"http://localhost:3000/sendmail",
                                    data: angular.toJson(params),
                                    
                                   }).then(
                                    function success(res)
                                    {
                                        console.log("message successfully send.");
                                    },
                                    function error(res)
                                    {
                                        console.log("message not sent",res);
                                   });
                        },
                        function Error(err) 
                        {
                            console.log('err', err)
                        });
                            
                    }
        }
        else{
            $scope.message = 'please select file ';
            console.log('please select file ');
           }
        }
        else
        {
            $scope.message = 'please select file ';
            console.log('please select file ');
        }
       
    


    }
     
}]);
