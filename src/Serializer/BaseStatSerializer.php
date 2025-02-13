<?php

namespace Justoverclock\Stats\Serializer;



use Carbon\Carbon;
use Flarum\Api\Serializer\AbstractSerializer;

class BaseStatSerializer extends AbstractSerializer
{
    protected $type = 'base_stats';
    protected function getDefaultAttributes($model)
    {
        return [
            'id'            => $model->id,
            'name'          => $model->name,
            'img'           => $model->img,
            'createdAt'     => Carbon::parse($model->created_at)->toIso8601String(),
            'updatedAt'     => Carbon::parse($model->updated_at)->toIso8601String(),
        ];
    }
}
