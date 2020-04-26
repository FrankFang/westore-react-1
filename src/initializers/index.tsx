import {importAll} from 'lib/importAll';

try {importAll(require.context('initializers', true, /^((?!index).)*$/));} catch (error) {console.log(error);}
