import ua from 'universal-analytics';
import uuid from 'uuid/v4';
import Store from 'electron-store';

const store = new Store({ name: 'settings' });

// Retrieve the userid value, and if it's not there, assign it a new uuid.
const userId = store.get('userid') || uuid();

try {
  console.log('Storing user ID setting...');
  // (re)save the userid, so it persists for the next app session.
  store.set('userid', userId);
} catch (e) {
  console.log(e);
}

const ga = ua('UA-127104688-1', userId);

export default ga;
