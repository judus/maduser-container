import extend from "./extend";

export default class Component {
    constructor(config) {

        this.name = config[0];

        this.config = extend({
            name: null,
            class: null,
            applies: null,
            requires: [],
            selector: null,
            options: {},
        }, config[1]);

        this.requires = this.config.requires;
        this.applies = this.config.applies;

        if(typeof this.config.applies === 'function') {
            this.applies = this.config.applies(this.config);
        }

        this.instances = [];

        this.context = document;
    }

    getName(config) {
        if(config.name !== null) {
            return config.name;
        }
        return config.class.name;
    }

    init(context) {
        if(this.applies !== false) {

            if(this.config.selector === null) {
                this.make(this.config.options);
            } else {

                if (context) this.context = context;

                this.context.querySelectorAll(this.config.selector).forEach(element => {
                    this.config.options.element = element;
                    this.make(this.config.options)
                });
            }

        }
    }

    make(options) {
      //console.log('Instantiating "' + this.name + '"...');
      this.instances.push(new this.config.class(options, this));
    }
}
