var SchemaObject = require('schema-object');

var EventContainer = new SchemaObject(
    {
        event : SchemaObject,
        handlers : { type: Array, arrayType: Object}
    }, {
        methods: {
            send: function()
            {
                this.handlers.forEach( function(handler) { handler( this.event ); });
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
            }
        }
    }
)

var registry = new Array();


function event(event)
{
    var container = new EventContainer();

    if (event === 'undefined')
        return container;

    var found = false;
    
    registry.forEach( function(element) { 
        if (element.event == event)
            found = true;
            container = element; 
        } );
    
    if (!found)
    {
        container = new EventContainer({ event: event })
        registry.push();
    }

    return container;
}

module.exports = event;