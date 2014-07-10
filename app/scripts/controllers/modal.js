var ModalInstanceCtrl = function ($scope, $modalInstance, players) {

  $scope.players = players;
  $scope.selected = {
    winner: $scope.players[0]
  };


  $scope.ok = function () {
    $modalInstance.close($scope.selected.winner);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
