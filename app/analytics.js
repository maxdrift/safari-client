import { app } from 'electron';
import ua from 'universal-analytics';
import uuid from 'uuid/v4';
import { JSONStorage } from 'node-localstorage';

const nodeStorage = new JSONStorage(app.getPath('userData'));

// Retrieve the userid value, and if it's not there, assign it a new uuid.
const userId = nodeStorage.getItem('userid') || uuid();

try {
  console.log('Storing user ID setting...');
  // (re)save the userid, so it persists for the next app session.
  nodeStorage.setItem('userid', userId);
} catch (e) {
  console.log(e);
}

const usr = ua('UA-127104688-1', userId);

export const trackEvent = (category, action, label, value) => {
  usr
    .event({
      ec: category,
      ea: action,
      el: label,
      ev: value
    })
    .send();
};

export const trackScreenview = (screenName, appName, appVersion, appId) => {
  usr.screenview(screenName, appName, appVersion, appId).send();
};
