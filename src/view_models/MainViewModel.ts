/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import { RegularTabViewModel, toRegularTabViewModel } from './RegularTabViewModel';
import { StatsTabViewModel, toStatsTabViewModel } from './StatsTabViewModel';
import { CompetitionTabViewModel, toCompetitionTabViewModel } from './CompetitionTabViewModel';
import { AboutTabViewModel, toAboutTabViewModel } from './AboutTabViewModel';
import { MainModel } from '@/models/MainModel';

export type MainViewModel = {
    readonly regular: RegularTabViewModel,
    readonly stats: StatsTabViewModel,
    readonly competition: CompetitionTabViewModel,
    readonly about: AboutTabViewModel
}

export function toMainViewModel(mainModel: MainModel): MainViewModel
{
    return {
        regular: toRegularTabViewModel(mainModel.matchResults),
        stats: toStatsTabViewModel(mainModel.playerStats),
        competition: toCompetitionTabViewModel(mainModel.competition),
        about: toAboutTabViewModel(mainModel.revisions)
    };
}