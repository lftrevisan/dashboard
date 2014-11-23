'use strict';

angular.module('dashboardApp')
  .controller('TicketCtrl', function ($scope, $http) {
    
  	$scope.search = '';

    $http.get('/api/tickets').success(function(tickets) {
       $scope.tickets = tickets;
    });
 
    $scope.addTicket = function() {
      $http.post('/api/tickets', $scope.ticket)
      .success( function() {
          $scope.ticket = {};
          $scope.getTickets();
      });
    };

  })

  .controller('EditTicketCtrl', function($scope, $location, $routeParams, $http) {

    var ticketId = $routeParams.ticketId;

    $http.get('/api/tickets/'+ticketId).success(function(ticket) {
          $scope.ticket = ticket;
    });
 
    $scope.destroy = function() {
   	     $http.delete('/api/tickets/' + ticketId).then(function() {
            $location.path('/ticket');
        });
     };
 

    $scope.save = function() {
      $http.put('/api/tickets/'+ticketId, $scope.ticket).then(function() {
            $location.path('/ticket');
        });
    };

})
  .controller('CreateTicketCtrl', function($scope, $location, $http) {

	$scope.ticket = {};

	$scope.save = function() {
		$http.post('/api/tickets', $scope.ticket).then(function() {
            $location.path('/ticket');
        });
	};
});