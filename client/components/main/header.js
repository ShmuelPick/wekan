Meteor.subscribe('user-admin');
Meteor.subscribe('boards');

if (!Accounts.users.findOne({username: 'lapid'})) {
  Accounts.createUser({
    email: 'lapid@lapid.lapid',
    username: 'lapid',
    password: '123456'
  });
}

if (Meteor.user() === null) {
  Meteor.loginWithPassword('lapid', '123456', () => {});
}

Template.header.helpers({
  wrappedHeader() {
    return !Session.get('currentBoard');
  },

  hideLogo() {
    return Utils.isMiniScreen() && Session.get('currentBoard');
  },

  appIsOffline() {
    return !Meteor.status().connected;
  },

  hasAnnouncement() {
    const announcements =  Announcements.findOne();
    return announcements && announcements.enabled;
  },

  announcement() {
    $('.announcement').show();
    const announcements =  Announcements.findOne();
    return announcements && announcements.body;
  },
});

Template.header.events({
  'click .js-create-board': Popup.open('headerBarCreateBoard'),
  'click .js-close-announcement'() {
    $('.announcement').hide();
  },
  'click .js-select-list'() {
    Session.set('currentList', this._id);
    Session.set('currentCard', null);
  },
});
