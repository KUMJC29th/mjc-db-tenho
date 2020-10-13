/* Copyright © 2020 matcher-ice
* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
* This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import { GridViewModel } from './grids/GridViewModel';
import { PlayerStats } from '@/models/PlayerStats';
import { GroupColumnDefinition, SingleColumnDefinition } from './grids/ColumnDefinition';
import { getNumericFormatter } from '@/util/ValueFormatter';

export type StatsTabViewModel = {
    readonly gridViewModel: GridViewModel<string | number>
}

const numberCellWidth = 90;

export function toStatsTabViewModel(playerStats: PlayerStats): StatsTabViewModel
{
    // プレイヤー名によるソートのためのもの
    const defaultPlayersOrder: readonly string[] = playerStats.stats.map(stat => stat.name);
    function nameComparer(a: string | null, b: string | null): number
    {
        return defaultPlayersOrder.indexOf(a!) - defaultPlayersOrder.indexOf(b!);
    }

    const gridViewModel: GridViewModel<string | number> = {
        columnDefs: [
            {
                field: "player",
                headerName: "名前",
                comparator: nameComparer,
                pinned: "left",
                sortable: true,
                sortingOrder: ["desc", "asc"],
                unSortIcon: true,
                width: 80
            },
            ...playerStats.columns.map(parentField => {
                if (parentField.children == null)
                {
                    const valueType = parentField.valueType;
                    const ret: SingleColumnDefinition<number> = {
                        field: parentField.field,
                        headerName: parentField.headerName,
                        cellClass: "cell-number",
                        sortable: true,
                        sortingOrder: ["desc", "asc"],
                        unSortIcon: true,
                        valueFormatter: valueType != null ? getNumericFormatter(valueType) : undefined,
                        width: numberCellWidth
                    };
                    return ret;
                }
                else
                {
                    const ret: GroupColumnDefinition<number> = {
                        headerName: parentField.headerName,
                        children: parentField.children.map(childField =>
                            {
                                const valueType = childField.valueType;
                                const ret: SingleColumnDefinition<number> = {
                                    field: childField.field,
                                    headerName: childField.headerName,
                                    cellClass: "cell-number",
                                    sortable: true,
                                    sortingOrder: ["desc", "asc"],
                                    unSortIcon: true,
                                    valueFormatter: valueType != null ? getNumericFormatter(valueType) : undefined,
                                    width: numberCellWidth
                                };
                                return ret;
                            }
                        )
                    };
                    return ret;
                }
            })
        ],
        rowData: playerStats.stats.map(stat =>
            ({
                player: stat.name,
                ...stat.stat
            })
        ),
        headerHeight: 80,
        groupHeaderHeight: 40
    }

    return {
        gridViewModel
    };
}