var SchemaObject = require('schema-object');
var should = require('should')


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



describe('Events', function() {
  describe('#event()', function() {
    var TestEvent;
    
    it('should create test event', function() {
        TestEvent = event().create({ testData: String });
        var testEvent = new TestEvent({ testData: 'test'});
        testEvent.testData.should.equal('test');
    });

    it('should send event', function() {
        event(TestEvent).handle( function (event) { event.testData.should.equal('test'); event.testData.should.notEqual('test1');} );
        event(TestEvent).send({ testDsts: 'test'});
    });
  });
});