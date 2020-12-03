/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import { MainModel } from '@/models/MainModel';
import { MainViewModel, toMainViewModel } from '@/view_models/MainViewModel';
import axios from 'axios';

async function getMainModel(): Promise<MainModel | null>
{
    const url: (string | undefined) = process.env.VUE_APP_DB_URL;
    if (url == null) throw new Error("DB Url is not defined.");

    try
    {
        const response = await axios.get(url);
        return response.data;
    }
    catch (error)
    {
        return null;
    }
}

export async function getMainViewModel(): Promise<MainViewModel | null>
{
    const model = await getMainModel();
    return model !== null ? toMainViewModel(model) : null;
}