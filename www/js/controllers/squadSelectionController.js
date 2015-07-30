controllers.controller(AFL.PAGES.SQUAD_SELECTION.controller, ['$scope', '$ionicModal', '$state', AFL.PAGES.SQUAD_SELECTION.factory, function($scope, $ionicModal, $state, SquadSelectionFactory) {

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
