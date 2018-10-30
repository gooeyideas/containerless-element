import {processContent, TargetInstruction, customElement, containerless, ViewSlot, Container, inject, noView} from 'aurelia-framework';

@customElement('void')
@processContent(compileContentInstruction)
@containerless
@noView
@inject(ViewSlot, Container, TargetInstruction)
export class containerlessElement {

  constructor(ViewSlot, Container, TargetInstruction) {
    this.viewSlot = ViewSlot;
    this.container = Container;
    this.contentFactory = TargetInstruction.elementInstruction.contentFactory;
  }

  created(parent, view) {
    this.parent = parent;
    this.view = view;
  }

  bind(bindingContext, overrideContext){
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    this.render();
    if (this.view && this.isActive && this.isBound) {
      this.view.bind(this.bindingContext, this.overrideContext)
    }
  }

  unbind(bindingContext, overrideContext){
    if (this.view) {
      this.view.unbind();
    }
  }

  attached() {    
    this.viewSlot.attached();
  }

  render() {
    this.view = this.contentFactory.create(this.container);    
    this.viewSlot.removeAll();
    this.viewSlot.add(this.view);
  }
}

function compileContentInstruction(compiler, resources, node, instruction) {
  let fragment = document.createDocumentFragment();
  //TODO: consider adding a div to wrap the user content so it's easier to hide/show

  while (node.firstChild) {
    fragment.appendChild(node.firstChild); //copy the content of your element into a fragment
  }

  instruction.contentFactory = compiler.compile(fragment, resources); //compile the fragment
}
 