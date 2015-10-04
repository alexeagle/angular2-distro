var test_lib_1 = require('angular2/test_lib');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
var dom_adapter_1 = require('angular2/src/core/dom/dom_adapter');
function main() {
    test_lib_1.describe("AnimationBuilder", function () {
        test_lib_1.it('should have data object', test_lib_1.inject([animation_builder_1.AnimationBuilder], function (animate) {
            var animateCss = animate.css();
            test_lib_1.expect(animateCss.data).toBeDefined();
        }));
        test_lib_1.it('should allow you to add classes', test_lib_1.inject([animation_builder_1.AnimationBuilder], function (animate) {
            var animateCss = animate.css();
            animateCss.addClass('some-class');
            test_lib_1.expect(animateCss.data.classesToAdd).toEqual(['some-class']);
            animateCss.addClass('another-class');
            test_lib_1.expect(animateCss.data.classesToAdd).toEqual(['some-class', 'another-class']);
        }));
        test_lib_1.it('should allow you to add temporary classes', test_lib_1.inject([animation_builder_1.AnimationBuilder], function (animate) {
            var animateCss = animate.css();
            animateCss.addAnimationClass('some-class');
            test_lib_1.expect(animateCss.data.animationClasses).toEqual(['some-class']);
            animateCss.addAnimationClass('another-class');
            test_lib_1.expect(animateCss.data.animationClasses).toEqual(['some-class', 'another-class']);
        }));
        test_lib_1.it('should allow you to remove classes', test_lib_1.inject([animation_builder_1.AnimationBuilder], function (animate) {
            var animateCss = animate.css();
            animateCss.removeClass('some-class');
            test_lib_1.expect(animateCss.data.classesToRemove).toEqual(['some-class']);
            animateCss.removeClass('another-class');
            test_lib_1.expect(animateCss.data.classesToRemove).toEqual(['some-class', 'another-class']);
        }));
        test_lib_1.it('should support chaining', test_lib_1.inject([animation_builder_1.AnimationBuilder], function (animate) {
            var animateCss = animate.css()
                .addClass('added-class')
                .removeClass('removed-class')
                .addAnimationClass('temp-class')
                .addClass('another-added-class');
            test_lib_1.expect(animateCss.data.classesToAdd).toEqual(['added-class', 'another-added-class']);
            test_lib_1.expect(animateCss.data.classesToRemove).toEqual(['removed-class']);
            test_lib_1.expect(animateCss.data.animationClasses).toEqual(['temp-class']);
        }));
        test_lib_1.it('should support duration and delay', test_lib_1.inject([animation_builder_1.AnimationBuilder], function (animate) {
            var animateCss = animate.css();
            animateCss.setDelay(100).setDuration(200);
            test_lib_1.expect(animateCss.data.duration).toBe(200);
            test_lib_1.expect(animateCss.data.delay).toBe(100);
            var element = test_lib_1.el('<div></div>');
            var runner = animateCss.start(element);
            runner.flush();
            if (dom_adapter_1.DOM.supportsAnimation()) {
                test_lib_1.expect(runner.computedDelay).toBe(100);
                test_lib_1.expect(runner.computedDuration).toBe(200);
            }
            else {
                test_lib_1.expect(runner.computedDelay).toBe(0);
                test_lib_1.expect(runner.computedDuration).toBe(0);
            }
        }));
        test_lib_1.it('should support from styles', test_lib_1.inject([animation_builder_1.AnimationBuilder], function (animate) {
            var animateCss = animate.css();
            animateCss.setFromStyles({ 'backgroundColor': 'blue' });
            test_lib_1.expect(animateCss.data.fromStyles).toBeDefined();
            var element = test_lib_1.el('<div></div>');
            animateCss.start(element);
            test_lib_1.expect(element.style.getPropertyValue('background-color')).toEqual('blue');
        }));
        test_lib_1.it('should support duration and delay defined in CSS', test_lib_1.inject([animation_builder_1.AnimationBuilder], function (animate) {
            var animateCss = animate.css();
            var element = test_lib_1.el("<div style=\"" + dom_adapter_1.DOM.getAnimationPrefix() + "transition: 0.5s ease 250ms;\"></div>");
            var runner = animateCss.start(element);
            runner.flush();
            if (dom_adapter_1.DOM.supportsAnimation()) {
                test_lib_1.expect(runner.computedDelay).toBe(250);
                test_lib_1.expect(runner.computedDuration).toBe(500);
            }
            else {
                test_lib_1.expect(runner.computedDelay).toEqual(0);
                test_lib_1.expect(runner.computedDuration).toEqual(0);
            }
        }));
        test_lib_1.it('should add classes', test_lib_1.inject([animation_builder_1.AnimationBuilder], function (animate) {
            var animateCss = animate.css().addClass('one').addClass('two');
            var element = test_lib_1.el('<div></div>');
            var runner = animateCss.start(element);
            test_lib_1.expect(element).not.toHaveCssClass('one');
            test_lib_1.expect(element).not.toHaveCssClass('two');
            runner.flush();
            test_lib_1.expect(element).toHaveCssClass('one');
            test_lib_1.expect(element).toHaveCssClass('two');
        }));
        test_lib_1.it('should call `onComplete` method after animations have finished', test_lib_1.inject([animation_builder_1.AnimationBuilder], function (animate) {
            var spyObject = new test_lib_1.SpyObject();
            var callback = spyObject.spy('animationFinished');
            var runner = animate.css()
                .addClass('one')
                .addClass('two')
                .setDuration(100)
                .start(test_lib_1.el('<div></div>'))
                .onComplete(callback);
            test_lib_1.expect(callback).not.toHaveBeenCalled();
            runner.flush();
            if (dom_adapter_1.DOM.supportsAnimation()) {
                test_lib_1.expect(callback).not.toHaveBeenCalled();
                runner.handleAnimationCompleted();
                test_lib_1.expect(callback).toHaveBeenCalled();
            }
            else {
                test_lib_1.expect(callback).toHaveBeenCalled();
            }
        }));
    });
}
exports.main = main;
//# sourceMappingURL=animation_builder_spec.js.map