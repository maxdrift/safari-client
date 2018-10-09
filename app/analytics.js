import ua from 'universal-analytics';
import uuid from 'uuid/v4';
import Store from 'electron-store';

const store = new Store({ name: 'settings' });

// Retrieve the userid value, and if it's not there, assign it a new uuid.
let userId = store.get('userid');
if (userId !== undefined) {
  console.log(`Known user ${userId}`);
} else {
  userId = uuid();
  console.log(`New user ${userId}`);
  console.log('Storing user ID setting...');
  // save the userid, so it persists for the next app session.
  store.set('userid', userId);
}

// const Nucleus = require('electron-nucleus')('5bbc7b9c86d9ff0017368b02', {
//   userId
// });

// Nucleus.onUpdate = lastVersion => {
//   alert(`New version available: ${lastVersion}`);
// };

const ga = ua('UA-127104688-1', userId);

export default ga;
