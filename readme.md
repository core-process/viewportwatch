# viewportwatch

Watches viewport dimensions in a mobile device compatible way.

![npm downloads total](https://img.shields.io/npm/dt/viewportwatch.svg) ![npm version](https://img.shields.io/npm/v/viewportwatch.svg) ![npm license](https://img.shields.io/npm/l/viewportwatch.svg)

The inner height of a mobile browser window might change while performing scroll operations. The address bar causes this odd behavior because the browser displays or hides the address bar as it pleases him. If one or more styles depends on the height of the window, the page starts to appear 'jumpy,' and the user experience goes down the drain.

This library watches the viewport for changes in its dimensions. For mobile devices, it associates the viewport dimensions with the corresponding screen sizes and derives minimum and maximum values. These can be used e.g. to calculate the height of elements and avoid 'jumpy' behavior while scrolling.

## Installation

Install the `viewportwatch` module via

```sh
npm install viewportwatch --save
```

or

```sh
yarn add viewportwatch
```

## Usage

### Retrieve the current dimensions

The `dimensions()` method allows you to retrieve the `current`, `maximum` and `minimum` dimensions.

```js
import vw from 'viewportwatch';

vw.dimensions()
->  { current: { width, height },
      maximum: { width, height },
      minimum: { width, height }
    }
```

On mobile devices, the values for `current`, `maximum` and `minimum` will differ. On desktop devices, they are equal by definition.

### React to changes in viewport dimensions

The library emits a `resize` event on changes of the viewport dimensions. You can install and remove event handler via the methods `on`, `off` and `once`.

```js
import vw from 'viewportwatch';

function onResize(dimensions) {
  ->  dimensions ==
      { current: { width, height },
        maximum: { width, height },
        minimum: { width, height }
      }
}

vw.on('resize', onResize);   // enable event handler
vw.off('resize', onResize);  // disable event handler
vw.once('resize', onResize); // enable event handler for the first event only
```
