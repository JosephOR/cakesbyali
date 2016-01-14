angular.module('cakes')
.controller('finishCtrl', finishCtrl);

function finishCtrl($rootScope, $scope, $location){
	$scope.cake = $rootScope.userCake;

	// alert('gh');

	// navigator.email.open({
	//     to:      'max@mustermann.de',
	//     cc:      'erika@mustermann.de',
	//     bcc:     ['john@doe.com', 'jane@doe.com'],
	//     subject: 'Greetings',
	//     body:    'How are you? Nice greetings from Leipzig'
	// });
} 