import moment from 'moment';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';

chrome
  .setNavBackground('#222222')
  .setTabs([]);

uiRoutes.enable();
uiRoutes
.when('/', {
  template,
  resolve: {
    currentTime($http) {
      return $http.get('../api/kibana_plugin_template/example').then(function (resp) {
        return resp.data.time;
      });
    }
  }
});

uiModules
.get('app/kibana_plugin_template', [])
.controller('kibanaPluginTemplateHelloWorld', function ($scope, $route, $interval) {
  $scope.title = 'Kibana Plugin Template';
  $scope.description = 'An awesome Kibana plugin';

  var currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  var unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);
});
