/* Copyright start
  Copyright (C) 2008 - 2023 Fortinet Inc.
  All rights reserved.
  FORTINET CONFIDENTIAL & FORTINET PROPRIETARY SOURCE CODE
  Copyright end */
'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('globalVisibilityCard101Ctrl', globalVisibilityCard101Ctrl);

  globalVisibilityCard101Ctrl.$inject = ['$scope', '$rootScope', 'PagedCollection'];

  function globalVisibilityCard101Ctrl($scope, $rootScope, PagedCollection) {
    $scope.runCommand = runCommand;
    $scope.widgetData = [];
    var _config = $scope.config;
    __init()
    function __init() {
      $scope.currentTheme = $rootScope.theme.id;
      if ($scope.currentTheme === 'light') {
        var textElements = document.getElementsByClassName("node-details-style-dark");
        for (var i = 0; i < textElements.length; i++) {
          // textElements[i].setAttribute('class', 'node-details-style-light');
          textElements[i].style.color = '#151515';
        }
        var backgroundColourElements = document.getElementsByClassName("global-card-dark display-inline-block");
        for (var i = 0; i < backgroundColourElements.length; i++) {
          backgroundColourElements[i].setAttribute('class', 'global-card-light display-inline-block');
        }
        // backgroundColourElement[0].setAttribute('class', 'global-card-light display-inline-block');
      }
      fetchJsonData();
    }

    function fetchJsonData() {
      var filters = {
        query: _config.query
      };
      var pagedTotalData = new PagedCollection(_config.customModule, null, null);
      pagedTotalData.loadByPost(filters).then(function () {
        if (pagedTotalData.fieldRows.length === 0) {
          $scope.filterValidation = true;
          return;
        }
        for (let i = 0; i < pagedTotalData.fieldRows.length; i++) {
          //checking if custom module field is given 
          var data = pagedTotalData.fieldRows[i][_config.customModuleField].value;
          if (_config.keyForCustomModule) {
            var nestedKeysArray = _config.keyForCustomModule.split('.');
            nestedKeysArray.forEach(function (value) {
              data = data[value];
            })
          }
          if (data != undefined && data.hasOwnProperty('data')) {
            data['@id'] = pagedTotalData.fieldRows[i]['@id'].value;
            $scope.widgetData.push(data);
          }
          else {
            $scope.filterValidation = true;
            return;
          }
        }

      })
    }

    function runCommand(value, index) {
      for (var i = 0; i < $scope.widgetData.length; i++) {
        var element = document.getElementById("globalCard-" + i);
        if (i === index) {
          element.classList.add("card-active");
        }
        else {
          element.classList.remove("card-active");
        }
      }
      if (_config.broadcastEvent) {
        $rootScope.$broadcast(_config.eventName, value);
      }
    }
  }
})();
