# Containerless Custom Element Plugin for Aurelia Apps 

If you are converting an App written in Durandal into Aurelia then this plugin could be of use. Knockout provided a virtual binding that allowed containerless binding around elements that Aurelia does not support. In all honestly this functionality should not be needed and code that is written in a way that Aurelia does not support should likely be refactored. Regardless, this is not always feasible so I created this custom `<void></void>` element to serve as a replacement for `<!-- ko --><!-- /ko -->`

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. To build the code, you can now run:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.

## Using the Custom Element
This element is a one-to-one replacement for `<!-- ko --><!-- /ko -->`.

### The Basics

`if` Binding:

Knockout Virtual Binding:

```html
<ul class="list">
  <!-- ko if: showFruit -->
  <li class="fruit"></li>
  <li>Apple</li>
  <li>Banana</li>
  <li>Kiwi</li>
  <!-- /ko -->
  <li class="Meat"></li>
  <li>Pork</li>
  <li>Beef</li>
  <li>Chicken</li>
</ul>
```

Custom Aurelia Void Element:

```html
<ul class="list">
  <void if.bind="showFruit">
  <li class="fruit"></li>
  <li>Apple</li>
  <li>Banana</li>
  <li>Kiwi</li>
  </void>
  <li class="Meat"></li>
  <li>Pork</li>
  <li>Beef</li>
  <li>Chicken</li>
</ul>
```


`for-each` Binding: (Bad example but it works)

Knockout Virtual Binding:

```html
<nav class="navbar">
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="#" data-bind="click: onHomeClick">Home</a>
    </li>
    <!-- ko foreach: { data: actions, as: 'action' } -->
      <li class="nav-item">
        <a class="nav-link" href="#" data-bind="click: action.onClick, text: action.label"></a>
      </li>
      <li class="spacer"></li>
    <!-- /ko -->
    </ul>
</nav>
```

Custom Aurelia Void Element:

```html
<nav class="navbar">
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="#" click.delegate="onHomeClick">Home</a>
    </li>
    <void repeat.for="action of actions">
      <li class="nav-item">
        <a class="nav-link" href="#" click.delegate="action.onClick" text.band="action.label"></a>
      </li>
      <li class="spacer"></li>
    </void>
    </ul>
</nav>
```
