<?php

namespace Justoverclock\Stats;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;

class AddUserAttributes
{
    public function __invoke(UserSerializer $serializer, User $user, array $attributes): array
    {
        $actor = $serializer->getActor();

        $attributes['canEditStats'] = $actor->can('editStat', $user);

        return $attributes;
    }
}
