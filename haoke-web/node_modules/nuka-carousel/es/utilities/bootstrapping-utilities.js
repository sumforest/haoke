function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
export var addAccessibility = function addAccessibility(children, slidesToShow, currentSlide) {
  var needsTabIndex;

  if (slidesToShow > 1) {
    return React.Children.map(children, function (child, index) {
      // create a range from first visible slide to last visible slide
      var firstVisibleSlide = index >= currentSlide;
      var lastVisibleSlide = index < slidesToShow + currentSlide;
      needsTabIndex = firstVisibleSlide && lastVisibleSlide; // if the index of the slide is in range add ariaProps to the slide

      var ariaProps = needsTabIndex ? {
        'aria-hidden': 'false',
        tabIndex: 0
      } : {
        'aria-hidden': 'true'
      };
      return React.cloneElement(child, _objectSpread({}, child.props, ariaProps));
    });
  } else {
    // when slidesToshow is 1
    return React.Children.map(children, function (child, index) {
      needsTabIndex = index !== currentSlide;
      var ariaProps = needsTabIndex ? {
        'aria-hidden': 'true'
      } : {
        'aria-hidden': 'false',
        tabIndex: 0
      };
      return React.cloneElement(child, _objectSpread({}, child.props, ariaProps));
    });
  }
};
export var getValidChildren = function getValidChildren(children) {
  // .toArray automatically removes invalid React children
  return React.Children.toArray(children);
};

var findMaxHeightSlide = function findMaxHeightSlide(slides) {
  var maxHeight = 0;

  for (var i = 0; i < slides.length; i++) {
    if (slides[i].offsetHeight > maxHeight) {
      maxHeight = slides[i].offsetHeight;
    }
  }

  return maxHeight;
};

export var getSlideHeight = function getSlideHeight(props, state) {
  var childNodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var heightMode = props.heightMode,
      vertical = props.vertical,
      initialSlideHeight = props.initialSlideHeight;
  var slidesToShow = state.slidesToShow,
      currentSlide = state.currentSlide;
  var firstSlide = childNodes[0];

  if (firstSlide && heightMode === 'first') {
    return vertical ? firstSlide.offsetHeight * slidesToShow : firstSlide.offsetHeight;
  }

  if (heightMode === 'max') {
    return findMaxHeightSlide(childNodes);
  }

  if (heightMode === 'current') {
    return childNodes[currentSlide].offsetHeight;
  }

  return initialSlideHeight || 100;
};