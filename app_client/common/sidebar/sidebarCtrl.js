angular
.module('KD')
.controller('sidebarCtrl', sidebarCtrl);



function sidebarCtrl($scope, $location, $interval, $timeout, mainService) { // service as parameter

        /* handle popular comment on basis of comment counts */ 
        $scope.comments=[]; // length of comments in desc order.
        
        mainService.postList()
        .success(function(data){
            $scope.array=[]; // array consisiting of popular posts data.

            for(var i=0;i<data.length;i++){
                $scope.comments.push(data[i].comment.length);
            }


            $scope.comments.sort(function(a, b){ // sort array by maximum val
                return b-a;
            });
            
            $scope.comments= $scope.comments.slice(0,4);
            // console.log('comments:'+$scope.comments);

            for(var i=0;i<data.length;i++){
                for(var j=0;j<$scope.comments.length;j++){
                    if(data[i].comment.length===$scope.comments[j]){ // check if the two array matches
                        $scope.array.push(data[i]);
                    }
                }
            }
            /* remove the duplicates */
            $scope.array = $scope.array.filter( function( item, index, inputArray ) {
                return inputArray.indexOf(item) == index;
            });
            // sort by maximum number of comments 
            $scope.array.sort(function (a, b) {
              return b.comment.length - a.comment.length;
            });
            /* make the length of array to be 4 */
            $scope.array=$scope.array.slice(0,4);              

        })
        .error(function(err){
            console.log(err);
        });

        /* handling susbscript form */


        /* Managing the word in post in popular post view */

        $scope.trimContent = function(string) {

            for (var i = 0; i < string.length; i++) {
                if (string.length > 100) {
                    string = string.substr(0, 50) + ' .........'; // Trim String and make upto 250 characters
                }
            }
            return string;
        };
        

} /* function ends */