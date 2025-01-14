<?php

namespace Justoverclock\Stats\Serializer;


use AllowDynamicProperties;
use Carbon\Carbon;
use Flarum\Api\Serializer\AbstractSerializer;
use Justoverclock\Stats\Model\UserStat;
use Psr\Http\Message\ServerRequestInterface;


#[AllowDynamicProperties] class UserStatSerializer extends AbstractSerializer
{
    protected $type = 'user_stats';

    protected function getDefaultAttributes($model): array
    {
        return [
            'id'            => (int) $model->id,
            'userId'        => (int) $model->user_id,
            'baseStatId'    => (int) $model->base_stat_id,
            'value'         => (float) $model->value,
            'createdAt'     => Carbon::parse($model->created_at)->toIso8601String(),
            'updatedAt'     => Carbon::parse($model->updated_at)->toIso8601String(),
        ];
    }

    public function setRequest(ServerRequestInterface $request)
    {
        $this->request = $request;
    }

    public function getRelationship($model, $name)
    {
        if ($name === 'baseStat') {
            return $this->hasOne($model, BaseStatSerializer::class, 'baseStat');
        }

        return parent::getRelationship($model, $name);
    }
}
