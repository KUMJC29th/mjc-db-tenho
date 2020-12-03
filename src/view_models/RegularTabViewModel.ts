/* Copyright © 2020 matcher-ice
* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
* This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import { GridViewModel } from './grids/GridViewModel';
import { MatchResult } from '@/models/MatchResult';
import { SingleColumnDefinition } from './grids/ColumnDefinition';
import { toShortDate, toSignedInteger } from '@/util/ValueFormatter';
import { dateNumToDate } from '@/util/DateExtensions';

export type RegularTabViewModel = {
    readonly gridViewModel: GridViewModel<Date | number>
}

const numberCellWidth = 90;

export function toRegularTabViewModel(players: readonly string[], matchResults: readonly MatchResult[]): RegularTabViewModel
{
    const gridViewModel: GridViewModel<Date | number> = {
        columnDefs: [
            {
                field: "date",
                headerName: "日付",
                pinned: "left",
                valueFormatter: toShortDate,
                width: 100
            } as SingleColumnDefinition<Date>,
            {
                cellClass: "cell-index",
                field: "gameIndex",
                headerName: "#",
                pinned: "left",
                width: 60
            } as SingleColumnDefinition<number>,
            ...players.map((player, i) =>
                ({
                    cellClass: "cell-number",
                    field: `p${i}`,
                    headerName: player,
                    valueFormatter: toSignedInteger,
                    width: numberCellWidth
                } as SingleColumnDefinition<number>)
            )
        ],
        rowData: matchResults.map(result =>
            {
                const ret = {
                    date: dateNumToDate(result.d),
                    gameIndex: result.g,
                    ...result.i.reduce((obj, income, index) =>
                        {
                            obj[`p${index}`] = income
                            return obj
                        },
                        {} as Record<string, number | null>
                    )
                }
                return ret;
            }
        )
    }

    return {
        gridViewModel
    };
}