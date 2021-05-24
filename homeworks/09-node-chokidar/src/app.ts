import { EventEmitter } from 'events';
import { DirWatcher } from './dirwatcher';
import { Importer } from './importer';

const eventEmitter = new EventEmitter();
const dirWatcher = new DirWatcher(eventEmitter);
const importer = new Importer(eventEmitter);

importer.listen();
dirWatcher.watch('./data');
