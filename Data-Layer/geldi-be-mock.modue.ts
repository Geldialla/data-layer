import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { GeldiHttpClient } from './geldi-be-mock.service';
import { dbConfig } from './db.config';

export interface LocalDbConfig {
  table: string;
  columns: Array<string>;
}

function dbConfigFunction() {
  const dbConfigLocal: DBConfig = {
    name: 'GeldiBeDB',
    version: 1,
    objectStoresMeta: [],
  };
  dbConfig.forEach((element) => {
    dbConfigLocal.objectStoresMeta.push({
      store: element.table,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        ...element.columns.map((x: string) => {
          return {
            name: x,
            keypath: x,
            options: { unique: false },
          };
        }),
      ],
    });
  });

  return dbConfigLocal;
}

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxIndexedDBModule.forRoot(dbConfigFunction())],
  exports: [NgxIndexedDBModule],
})
export class GeldiHttpClientModule {
  static forRoot(): ModuleWithProviders<GeldiHttpClientModule> {
    return {
      ngModule: GeldiHttpClientModule,
      providers: [GeldiHttpClient],
    };
  }
}