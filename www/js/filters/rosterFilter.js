filters.filter(AFL.filters.ROSTER_FILTER, ['$utils', '$log', function($utils, $log) {
    return function(players, scope) {
        //$log.debug(AFL.filters.ROSTER_FILTER + ": start");
        var returnArray = [];
        console.log(scope.filterObject.teamId);

        players.forEach(function(player, index, array) {

            if ($utils.isPlayerInSelectedTeam(player, scope.filterObject.teamId) && $utils.isPlayerOfSelectedType(player, scope.filterObject.playerTypeId) && $utils.isImpactPlayer(player, scope.filterObject.impactPlayer.checked)) {
                returnArray.push(player);
            }
        });

        var fillerHeight = (11 - (returnArray.length % 11)) * 30;
       	scope.fillerHeight = fillerHeight + 'px';

        //$log.debug(AFL.filters.ROSTER_FILTER + ": end");
        return returnArray;
    }
}])
