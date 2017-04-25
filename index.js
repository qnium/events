var SchemaObject = require('schema-object');

var EventContainer = new SchemaObject(
    {
        event : SchemaObject,
        handlers : { type: Array, arrayType: Object}
    }, {
        methods: {
            send: function(ev)
            {
                //ev = new (this.event)(ev);
				this.handlers.forEach( function(handler) { handler( ev ); });
            },
            
            /*
                Creates event prototype to be then used for handling and sending events;
            */
            create: function(EventPrototype)
            {
                return new SchemaObject(EventPrototype);
            },

            handle: function(handler)
            {
                this.handlers.push(handler);
                let self = this;
                let handlerRemover = function() {
                    for(let i = 0; i < self.handlers.length; i++) {
                        if(self.handlers[i] === handler) {
                            delete self.handlers[i];
                        }
                    }
                }
                return handlerRemover;
            }
        }
    }
)

var registry = new Array();

function event(event)
{
    var container = new EventContainer();

    if (event === undefined)
        return container;

    var found = false;
    
    registry.forEach( function(element) {
        if (element.event == event) {
            found = true;
            container = element; 
        }
    });
    
	if (!found)
    {
		container = new EventContainer({ event: event })
        registry.push(container);
    }

    return container;
}

module.exports = event;