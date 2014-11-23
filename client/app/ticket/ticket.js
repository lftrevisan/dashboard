'use strict';

angular.module('dashboardApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ticket', {
        templateUrl: 'app/ticket/list.html',
        controller: 'TicketCtrl'
      })
      .when('/ticket/edit/:ticketId', {
        templateUrl: 'app/ticket/detail.html',
        controller: 'EditTicketCtrl'
      })
      .when('/ticket/new', {
        templateUrl: 'app/ticket/detail.html',
        controller: 'CreateTicketCtrl'
      });
  });
