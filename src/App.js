import React from 'react';

import { Store } from './components/Store';
import { catalog } from './data/catalog';
import { promoCodes } from './data/promoCodes';

// INFO: stock is our data

export const App = () => {
    return (
        <Store catalog={catalog} promoCodes={promoCodes} />
    );
};
