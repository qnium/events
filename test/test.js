var should = require('should');
var event = require('../index.js')

describe('Events', function() {
  describe('#event()', function() {
    var TestEvent;
    var TestEventNum;
    
    it('should create test event', function()
    {
      TestEvent = event().create({ testData: String });
      TestEventNum = event().create({ testNum: Number });
      var testEvent = new TestEvent({ testData: 'test'});
      var testEventNum = new TestEventNum({ testNum: 2});
      testEvent.testData.should.equal('test');
      testEventNum.testNum.should.equal(2);
    });

    it('should send event', function()
    {
      event(TestEvent).handle( function (event) { 
        event.testData.should.equal('test');
        event.testData.should.not.equal('test1');
  	  });
      
      event(TestEventNum).handle( function (event) { 
        event.testNum.should.equal(3);
        event.testNum.should.not.equal(4);
		  });
      
      event(TestEventNum).send({ testNum: 3});
      event(TestEvent).send({ testData: 'test'});
    });
  });
});