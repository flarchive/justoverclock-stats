<?php

namespace Justoverclock\Stats\Model;

use Flarum\Database\AbstractModel;
use Flarum\User\User;


class UserStat extends AbstractModel
{
    protected $table = 'user_stats';
    public $timestamps = true;

    protected $fillable = ['user_id', 'base_stat_id', 'value'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function baseStat()
    {
        return $this->belongsTo(BaseStat::class, 'base_stat_id');
    }

}
