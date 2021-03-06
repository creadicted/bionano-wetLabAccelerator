/**
 * Copyright 2015 Autodesk Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * @ngdoc function
 * @name wetLabAccelerator.controller:AliquotCtrl
 * @description
 * # AliquotCtrl
 * Controller of the wetLabAccelerator
 */
angular.module('wetLabAccelerator')
  .controller('AliquotCtrl', function ($scope, ProtocolUtils) {
    var self = this;

    self.handleAliquotSelection = function (wells, transpose) {

      //future - handle aliquot++ in view and here. currently only support aliquot / aliquot+
      //if (self.singleContainer === false) {}

      assignWells(wells);

      self.wellsIn         = wells;
      self.field.transpose = transpose;
    };

    self.init = function () {
      //hack - assumes fieldCtrl
      if (!$scope.fieldCtrl) {
        return;
      }

      //setup field
      self.field = $scope.fieldCtrl.field;
      if (_.isUndefined(self.field.value)) {
        self.field.value = {};
      }

      //setup model
      self.model = self.field.value;

      self.aliquotMultiple = self.field.type != 'aliquot';
      self.singleContainer = self.field.type != 'aliquot++';

      //setup containerObj for container-select directive
      self.containerObj = self.model;

      //setup input wells
      setWellsInput(self.model.wells);

      //set up watches

      //watch changes to container obj and merge with model
      $scope.$watch('aliquotCtrl.containerObj', function (newObj, oldObj) {
        var newContId = _.result(newObj, 'container'),
            oldContId = _.result(oldObj, 'container');

        if (newContId != oldContId) {
          assignContainerObj(newObj);
          setWellsInput(getWellsForContainer(newContId));
        }
      }, true);
    };

    //todo - do we need param change checking? or just use ProtocolUtils to get dynamically?

    //utils

    self.containerNameFromObj = function (containerObj) {
      var paramId = containerObj.container;
      return ProtocolUtils.paramNameFromParamId(paramId);
    };

    self.containerColorFromObj = function (containerObj) {
      var paramId = containerObj.container;
      return ProtocolUtils.containerColorFromId(paramId);
    };

    //helpers

    //so hack!
    //need to wait for tx-container-select to propagate type before setting input, because container will re-render and render selection empty
    function setWellsInput (wells) {
      /*var listener = $scope.$watch('aliquotCtrl.containerType', function (newval) {
        if (!!newval) {
          self.wellsIn = wells;
          listener();
        }
      });*/
      self.wellsIn = wells;
    }

    function getWellsForContainer (containerId) {
      //placeholder for aliquot++ logic
      return self.model.wells;
    }

    function assignContainerObj (containerObj) {
      _.assign(self.model, containerObj);
    }

    function assignWells (wells) {
      self.model.wells = wells;
    }

    //init
    self.init();

  });
