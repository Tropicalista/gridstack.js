(function() {
  'use strict';

  angular.module('ui.gridstack', [])

  .directive("gridStack", [function () {
      return {
          restrict: "A",
          controller: 'GridstackController',
          link: function (scope, element, attrs) {

              scope.init(element, {});
              element.on('change', function (e, items) {
                  var res = _.map($('.grid-stack .grid-stack-item:visible'), function (el) {
                      el = $(el);
                      var node = el.data('_gridstack_node');
                      return {
                          id: el.attr('data-custom-id'),
                          x: node.x,
                          y: node.y,
                          width: node.width,
                          height: node.height
                      };
                  }); 
                  scope.serialize(res);
              });

          }
      };
  }])

  .directive("gridstackItem", [function () {
      return {
          restrict: "A",
          require: '^gridStack',
          link: function (scope, element, attrs, controller) {

              var widget = controller.addItem(element, attrs.gsX,attrs.gsY,attrs.gsWidth,attrs.gsHeight);

          }
      };
  }]);


})();