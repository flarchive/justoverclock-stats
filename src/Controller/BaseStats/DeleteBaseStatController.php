<?php

namespace Justoverclock\Stats\Controller\BaseStats;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\PermissionDeniedException;
use Illuminate\Support\Arr;
use Justoverclock\Stats\Model\BaseStat;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Exception\InvalidParameterException;

class DeleteBaseStatController extends AbstractDeleteController
{

    /**
     * @throws PermissionDeniedException
     */
    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();
        $statId = Arr::get($request->getQueryParams(), 'statId');

        if (!$statId) {
            throw new InvalidParameterException();
        }

        return BaseStat::query()->findOrFail($statId)->delete();
    }
}
