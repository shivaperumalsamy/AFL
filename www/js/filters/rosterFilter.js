filters.filter(AFL.filters.ROSTER_FILTER, ['$utils', '$log', function($utils, $log) {
    return function(players, scope) {
        console.log("%c%s", "background: red; color: white", "filter invoked");
        //$log.debug(AFL.filters.ROSTER_FILTER + ": start");
        var returnArray = [];

        players.forEach(function(player, index, array) {
            if ($utils.isPlayerInFilteredTeam(player, scope.filterObject.teamId) 
                && $utils.isPlayerOfFilteredType(player, scope.filterObject.playerTypeId) 
                && $utils.isImpactPlayer(player, scope.filterObject.impactPlayer.checked)) {
                    returnArray.push(player);
                }
        });
        //$log.debug(AFL.filters.ROSTER_FILTER + ": end");
        return returnArray;
    }
}])
