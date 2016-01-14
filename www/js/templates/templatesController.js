angular.module('cakes')
.controller('templatesCtrl', templatesCtrl);

function templatesCtrl($scope, $location){
	console.log('templates')

	$scope.templates = {
		tier1:{
			'Name' : '1 tier cake',
			'Description' : 'A single tier cake with a topping of your choice',
			'src' : 'img/galleryTemplates/1tier.jpg',
			'numLayers' : 1
		},
		tier2:{
			'Name' : '2 tier cake',
			'Description' : 'A two tier cake with one fillings and a topping. Each tier and filling can be different',
			'src' : 'img/galleryTemplates/2tier.jpg',
			'numLayers' : 2
		},
		tier3:{
			'Name' : '3 tier cake',
			'Description' : 'A three tier cake with two fillings and a topping. Each tier and filling can be different',
			'src' : 'img/galleryTemplates/3tier.jpg',
			'numLayers' : 3
		},
		kids:{
			'Name' : 'Kids cake',
			'Description' : 'A single tier cake with a topping of your choice',
			'src' : 'img/galleryTemplates/kids.jpg',
			'numLayers' : 'custom'
		}
	};

	$scope.gotoBuild = function (id) {
 		$location.path('/build/'+id)
 	}	



}//templates