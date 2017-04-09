var should = require('should');
var event = require('../index.js')

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