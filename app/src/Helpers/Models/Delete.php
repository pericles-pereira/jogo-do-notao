<?php

namespace Source\Helpers\Models;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

final class Delete
{
    /**
     * A simple, standardized way to delete multiple records from a model at once.
     * @param array|Arrayable $recordIds An array containing the ID of each record to be deleted.
     * @param Illuminate\Database\Eloquent\Collection $onModel The model objects where we will delete the records.
     * @throws \Throwable Throws an error if any ID is invalid or if an error occurs when deleting the record, in this case there will be a rollback and this will invalidate all data deletion.
     */
    public static function multipleRecords(array|Arrayable $recordIds, Collection $onModel): void
    {
        DB::transaction(function () use ($recordIds, $onModel) {
            foreach ($recordIds as $recordId) {
                $id = $recordId['id'];
                $record = $onModel->find($id);

                if (!$record) {
                    throw new \InvalidArgumentException('Invalid ID entered: ' . $id);
                }

                $record->delete();
            }
        });
    }
}
