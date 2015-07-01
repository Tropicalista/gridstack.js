(function() {
  'use strict';

  angular.module('ui.gridstack', [])

  .directive("gridStack", [function () {
      return {
          restrict: "A",
          controller: 'GridstackController',
          link: function (scope, element, attrs, ngModel) {

              scope.init(element, {});

              element.on('dragstop', function (e, items) {
                console.log("dragstop")
              })
              element.on('change', function (e, items) {
                  console.log('change')

                  var res1 = _.map($('.grid-stack .grid-stack-item:visible'), function (el) {
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
                  //console.log('items', items)
                  var res2 = _.map(items, function(item){
                      //console.log(item)
                      return {
                          x: item.x,
                          y: item.y,
                          width: item.width,
                          height: item.height
                      }
                  });

                    scope.widgets = res1;
                    scope.$apply();

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
                widget.bind('change', function() {
                  console.log('change widget', element)
                });

                widget.bind('$destroy', function() {
                  console.log('destroy', element)
                  //controller.removeItem(element);
                });


          }

      };
  }]);


})();