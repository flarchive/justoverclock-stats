<?php

namespace Justoverclock\Stats\Listener;

use Flarum\User\Event\Registered;
use Illuminate\Contracts\Events\Dispatcher;
use Justoverclock\Stats\Model\BaseStat;
use Justoverclock\Stats\Model\UserStat;

class AddStatsToNewUsers
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Registered::class, [$this, 'onSignup']);
    }

    public function onSignup(Registered $event)
    {
        $user = $event->user;

        $baseStats = BaseStat::all();

        foreach ($baseStats as $stat) {
            $userStat = new UserStat();
            $userStat->user_id = $user->id;
            $userStat->base_stat_id = $stat->id;
            $userStat->value = 0;
            $userStat->save();
        }
    }
}
