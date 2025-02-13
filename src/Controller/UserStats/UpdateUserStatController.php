<?php

namespace Justoverclock\Stats\Controller\UserStats;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\PermissionDeniedException;
use Illuminate\Support\Arr;
use Justoverclock\Stats\Model\UserStat;
use Justoverclock\Stats\Serializer\UserStatSerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateUserStatController extends AbstractShowController
{

    public $serializer = UserStatSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $data = $request->getParsedBody();
        $statId = Arr::get($request->getQueryParams(), 'id');
        $newValue = Arr::get($data, 'data.attributes.value');

        $userStat = UserStat::query()
            ->findOrFail($statId);

        if (!$actor->can('editStat')) {
            throw new PermissionDeniedException();
        }

        $userStat->value = $newValue;
        $userStat->save();

        return $userStat;
    }
}
