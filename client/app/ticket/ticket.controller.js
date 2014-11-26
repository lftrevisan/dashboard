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

  .controller('EditTicketCtrl', function($scope, $location, $routeParams, $http, $upload) {

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

    $scope.onFileSelect = function($files) {
      $scope.files = $files;
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.ticket.files.push({'fileName':file.name});

        $scope.upload = $upload.upload({
          url: 'api/fileUpload', 
          file: file
        });
      }
    };

    $scope.onFileDelete = function(file) {
       angular.forEach($scope.ticket.files, function(u, i) {
        if (u.fileName === file.fileName) {
          $scope.ticket.files.splice(i, 1);
        }
      });
    };

})
  .controller('CreateTicketCtrl', function($scope, $location, $http, $upload) {

	$scope.ticket = {};

	$scope.save = function() {
    $http.post('/api/tickets', $scope.ticket).then(function() {
      $location.path('/ticket');
    });
	};

    $scope.onFileSelect = function($files) {
      $scope.files = $files;
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        if ($scope.ticket.files == undefined) {
          $scope.ticket.files = new Array();
        }
        $scope.ticket.files.push({'fileName':file.name});

        $scope.upload = $upload.upload({
          url: 'api/fileUpload', 
          file: file
        });
      }
    };

    $scope.onFileDelete = function(file) {
       angular.forEach($scope.ticket.files, function(u, i) {
        if (u.fileName === file.fileName) {
          $scope.ticket.files.splice(i, 1);
        }
      });
    };

});