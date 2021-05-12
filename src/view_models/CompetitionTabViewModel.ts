/* Copyright © 2020 matcher-ice
* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
* This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import { GridViewModel } from './grids/GridViewModel';
import { Competition, CompetitionResult } from '@/models/Competition';
import { SingleColumnDefinition } from './grids/ColumnDefinition';

export type CompetitionTabViewModel = {
    readonly winLossGridViewModel: GridViewModel<string | CompetitionResult>,
    readonly incomeGridViewModel: GridViewModel<string | CompetitionResult>,
    readonly feedingGridViewModel: GridViewModel<string | CompetitionResult>
}

function displayCompetitionResultWinLoss(params: { value: CompetitionResult | null }): string
{
    return params.value == null ? ""
        : `${params.value.win}-${params.value.loss}\n(${(params.value.win / (params.value.win + params.value.loss) * 100).toFixed(2)}%)`;
}

function displayCompetitionResultIncome(params: { value: CompetitionResult | null }): string
{
    return params.value == null ? ""
        : params.value.income > 0 ? `+${params.value.income.toFixed(0)}` : params.value.income.toFixed(0);
}

function displayCompetitionResultFeeding(params: { value: CompetitionResult | null }): string
{
    return params.value?.sumFeeding?.toLocaleString() ?? "";
}


export function toCompetitionTabViewModel(players: readonly string[], competition: Competition): CompetitionTabViewModel
{
    // 'rowData'は3つのvmで参照を使い回す。readonlyなのでおそらく問題ないはず。
    const rowData = competition.map((row, rowIndex) =>
        ({
            player: players[rowIndex],
            ...row.reduce((obj, cell, columnIndex) =>
                {
                    obj[`p${columnIndex}`] = cell;
                    return obj;
                },
                {} as Record<string, CompetitionResult | null>
            )
        })
    );

    const winLossGridViewModel: GridViewModel<string | CompetitionResult> = {
        columnDefs: [
            {
                field: "player",
                headerName: " ",
                cellClass: "competition-row-header",
                pinned: "left",
                width: 80
            },
            ...players.map((player, index) =>
                ({
                    field: `p${index}`,
                    headerName: player,
                    cellClass: "competition-win-loss-cell",
                    valueFormatter: displayCompetitionResultWinLoss,
                    width: 80,
                }) as SingleColumnDefinition<CompetitionResult>
            )
        ],
        rowData,
        rowHeight: 60
    };
    const incomeGridViewModel: GridViewModel<string | CompetitionResult> = {
        columnDefs: [
            {
                field: "player",
                headerName: " ",
                cellClass: "competition-row-header",
                pinned: "left",
                width: 80
            },
            ...players.map((player, index) =>
                ({
                    field: `p${index}`,
                    headerName: player,
                    cellClass: "cell-number",
                    valueFormatter: displayCompetitionResultIncome,
                    width: 80,
                })
            )
        ],
        rowData
    };
    const feedingGridViewModel: GridViewModel<string | CompetitionResult> = {
        columnDefs: [
            {
                field: "player",
                headerName: " ",
                cellClass: "competition-row-header",
                pinned: "left",
                width: 90
            },
            ...players.map((player, index) =>
                ({
                    field: `p${index}`,
                    headerName: player,
                    cellClass: "cell-number",
                    valueFormatter: displayCompetitionResultFeeding,
                    width: 90,
                })
            )
        ],
        rowData
    };

    return {
        winLossGridViewModel,
        incomeGridViewModel,
        feedingGridViewModel
    };
}