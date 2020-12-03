import Component from "./Component";

/**
 * Application controller
 *
 * Registers, initialises and keeps track of the Components and their requirements
 */
export default class Container {
  constructor(config) {
    this.components = new Map();
    Object.entries(config.components).forEach((config, index) => {
      let component = new Component(config, index);
      this.components.set(component.name, component);
    });
  }

  init(componentName, context) {
    //console.log('Initialising "' + componentName + '"...');
    //console.log(context);

    if(this.components.has(componentName) === false) {
      console.log('Component "' + componentName + '" not found.');
      return false;
    }

    const component = this.components.get(componentName);

    if(component.requires instanceof Array) {
      component.requires.forEach(requirement => {
        if(this.components.has(requirement)) {
          this.components.get(requirement).init(context);
        }
        else {
          console.log('Component "' + requirement + '" not found.');
        }
      });
    }

    return this.components.get(componentName).init(context);
  }

  initAll(context) {
    this.components.forEach(component => {
      this.init(component.name, context);
    });
  }

  destroyAll() {
    //console.log('Destructing...');
    this.components.forEach(component => {
      component.instances.forEach(instance => {
        if(typeof instance.destruct === "function") {
          //console.log('Instance of "' + component.name + '" has destruct method. Calling...');
          instance.destruct();
        }
      });
      component.instances = [];
    });
  }
}
