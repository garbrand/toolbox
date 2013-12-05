// Replacing case / switch

var cases = {
	case1: function() { alert('hey'); },
	default: function() { alert('default'); }
};

// creating some more cases  for testing
cases.larry = cases.saeed = cases.case1;

var result = cases[ varName ] ? cases[ varName ]() : cases._default();