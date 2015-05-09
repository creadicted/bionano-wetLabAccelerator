'use strict';

/**
 * @ngdoc directive
 * @name transcripticApp.directive:txProtocolEditor
 * @description
 * # txProtocolEditor
 */
  //todo - listen for parameters changing, propagate variable name throughout
angular.module('tx.protocolEditor')
  .directive('txProtocolEditor', function ($window, $rootScope, $timeout, DragDropManager, ProtocolHelper, Omniprotocol) {
    return {
      templateUrl     : 'views/tx-protocol-editor.html',
      restrict        : 'E',
      require         : 'form', //todo - register controllers of instruction with form
      scope           : {
        protocol: '='
      },
      bindToController: true,
      controllerAs    : 'editorCtrl',
      controller      : function ($scope, $element, $attrs) {
        var self = this;

        /*
        //ui-sortable options
        self.groupSortableOptions = {
          axis       : 'y',
          scroll     : true,
          handle     : '.protocol-group-header',
          containment: '.protocol-instructions',
          tolerance  : 'pointer'
        };
        */

        self.duplicateGroup = function (group) {
          var index = _.indexOf(self.protocol.groups, group);
          self.protocol.groups.splice(index, 0, _.clone(group, true));
        };

        self.deleteGroup = function (group) {
          _.remove(self.protocol.groups, group);
        };

        self.onFileDrop = function (files, event, rejected) {
          if ($window.FileReader) {

            var fileReader = new FileReader();

            fileReader.onload = function (e) {
              $scope.$apply(function () {
                try {
                  ProtocolHelper.assignCurrentProtocol(angular.fromJson(e.target.result));
                } catch (e) {
                  console.log('couldnt parse dropped JSON', e);
                }
              });
            };

            fileReader.readAsText(files[0]);
          }
        };

        self.optsDroppableEditor = {
          greedy   : true,
          tolerance: 'pointer',
          drop     : function (e, ui) {
            console.log(e);
            var draggableTop = e.pageY,
                neighborTops = DragDropManager.getNeighborTops('tx-protocol-group', $element),
                dropIndex    = (_.takeWhile(neighborTops, function (neighborTop) {
                  return neighborTop < draggableTop;
                })).length;

            //assuming we only have groups and operations
            var group = (DragDropManager.type == 'operation') ?
              DragDropManager.groupFromOp(DragDropManager.model) :
              DragDropManager.model;

            //console.log(draggableTop, neighborTops, group, self.protocol);

            $scope.$apply(function () {
              DragDropManager.onDrop();
              self.protocol.groups.splice(dropIndex, 0, group);
              DragDropManager.clear();
            });
          }
        };
      },
      link            : function postLink (scope, element, attrs) {

        scope.$on('editor:verificationFailure', function (event, verifications) {

          //verifications come in the form { message : '', context : { instruction : # } } }
          //we add indicies in form {group : #, step: #, loop : #, folded : #, unfolded : # } where unfolded matches instruction

          var instructions = _(verifications).
            filter(function (ver) {
              return _.has(ver, 'context.instruction');
            }).
            map(function (ver, verIndex) {
              var targetInstruction = _.result(ver, 'context.instruction', -1);
              return _.assign({}, {
                indices: Omniprotocol.utils.getFoldedStepInfo(scope.editorCtrl.protocol, targetInstruction)
              }, {
                message     : ver.message,
                source      : 'transcriptic',
                target      : 'group',
                verification: ver
              });
            }).
            filter(function (ver) {
              return _.result(ver, 'indices.loop', -1) == 0;
            }).
            uniq(false, function (ver) {
              //filter out duplicate messages for the same instruction
              return ver.indices.unfolded + ':' + ver.message;
            }).
            forEach(function (ver) {
              var foldedIndex = ver.indices.folded,
                  $el         = element.find('tx-protocol-op')[foldedIndex];

              //todo - merge different messages for same instruction
              //(e.g. try bad dispense, get two errors - one for range, one increments)

              //hack - calling function by querying the DOM is not so great...
              //should probably just use another $broadcast, but then each op needs to know its indices (dynamically recalculated each change...)
              //note - function inside tx-protocol-op link
              angular.element($el).children().scope().receiveVerification(ver);
            }).
            value();

          var refs = _(verifications).
            filter(function (ver) {
              return _.has(ver, 'context.ref');
            }).
            map(function (ver, verIndex) {
              return {
                message     : ver.message,
                source      : 'transcriptic',
                target      : 'parameter',
                container   : _.result(ver, 'context.ref'),
                verification: ver
              };
            }).
            tap(function (verifications) {
              //todo - merge for same container?
              element.find('tx-protocol-setup').children().scope().receiveVerifications(verifications);
            }).
            value();
        });

      }
    };
  });
