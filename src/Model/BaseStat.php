<?php

namespace Justoverclock\Stats\Model;

use Flarum\Database\AbstractModel;

class BaseStat extends AbstractModel
{
    protected $table = 'base_stats';
    public $timestamps = true;

    protected $fillable = [
        'name',
        'img'
    ];

    public function userStats()
    {
        return $this->hasMany(UserStat::class, 'base_stat_id');
    }
}
