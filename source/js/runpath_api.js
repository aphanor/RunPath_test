runPath.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});

runPath.controller('API', ['$scope', '$http', '$log', 'RUNPATH_API', function($scope, $http, $log, RUNPATH_API) {
    
    $scope.loading = true;
    
    $http.get(RUNPATH_API).then(function(response) {
        $scope.data = response.data;
        $scope.loading = false;
        $scope.viewby = 3;
        $scope.totalItems = $scope.data.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5;
        
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
    
        $scope.noOfPages = Math.ceil($scope.data.length/$scope.itemsPerPage);
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        
        $scope.filter = function() {
            $timeout(function() {
                $scope.noOfPages = Math.ceil($scope.filtered.length/$scope.itemsPerPage);
            }, 10);
        };
    });
    
}]);