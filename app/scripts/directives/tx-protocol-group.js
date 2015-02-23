'use strict';

/**
 * @ngdoc directive
 * @name transcripticApp.directive:txOperationgroup
 * @description
 * # txOperationgroup
 */
angular.module('transcripticApp')
  .directive('txProtocolGroup', function () {
    return {
      templateUrl: 'views/tx-protocol-group.html',
      restrict: 'E',
      scope: {
        group: '=protocolGroup'
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  });
