controllers.controller('SquadSelectionController', ['$scope', '$ionicModal', '$state', function($scope, $ionicModal, $state) {

    $ionicModal.fromTemplateUrl('../templates/modals/filter_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.showFilterModal = function() {
        $scope.modal.show();
    };
    $scope.hideFilterModal = function() {
        $scope.modal.hide();
    };

	$scope.saveFilter = function() {
		$scope.hideFilterModal();
	}

	$scope.saveSquad = function() {
		$state.go('profile');
	}

}]);
