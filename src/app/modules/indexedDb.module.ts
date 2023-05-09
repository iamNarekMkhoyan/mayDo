import { NgModule } from '@angular/core';

import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'mayDo',
  version: 1,
  objectStoresMeta: [
    {
      store: 'notes',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'id', keypath: 'id', options: { unique: true } }],
    },
  ],
};

@NgModule({
  imports: [NgxIndexedDBModule.forRoot(dbConfig)],
  exports: [NgxIndexedDBModule],
})
export class IndexedDBModule {}
