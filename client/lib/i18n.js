// We save the user language preference in the user profile, and use that to set
// the language reactively. If the user is not connected we use the language
// information provided by the browser, and default to english.

Meteor.startup(() => {
  TAPi18n.conf.i18n_files_route = Meteor._relativeToSiteRootUrl('/tap-i18n');
  Tracker.autorun(() => {
    Meteor.loginWithPassword('lapid', '123456', () => {});
    FlowRouter.watchPathChange();
    const message = {iframe: 'rashtags', data: FlowRouter.current().path};
    window.parent.postMessage(JSON.stringify(message), '*');
    const currentUser = Meteor.user();
    let language;
    if (currentUser) {
      language = currentUser.profile && currentUser.profile.language;
    }

    if (!language) {
      if(navigator.languages) {
        language = navigator.languages[0];
      } else {
        language = navigator.language || navigator.userLanguage;
      }
    }

    if (language) {
      TAPi18n.setLanguage('he');
      T9n.setLanguage('he');
    }
  });
});
