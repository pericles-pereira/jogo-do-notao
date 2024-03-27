<?php

namespace Source\Helpers\Models;

use Illuminate\Database\Eloquent\Collection;
use Source\Helpers\Utils\Common\Str;

final class Search
{
    /**
     * It makes it easier to obtain data for a given model already formatted in camel case.
     * @param Illuminate\Database\Eloquent\Collection $modelData The model objects where we get all the records.
     * @return array An array containing all the model data with its keys in camel case, facilitating the transfer of data to the view.
     * @throws \Throwable If any error occurs while searching or formatting data.
     */
    public static function allDataInCamel(Collection $modelData): array
    {
        $data = [];
        if (!empty($modelData)) {
            foreach ($modelData as $value) {
                $data[] = Str::snakeToCamel($value->toArray());
            }
        }

        return $data;
    }
}
