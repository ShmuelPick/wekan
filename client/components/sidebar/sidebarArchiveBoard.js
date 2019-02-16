BlazeComponent.extendComponent({
  onRendered() {
  },

  events() {
    return [{
      'click .archiveBoard': function() {
        const currentBoard = Boards.findOne(Session.get('currentBoard'));
        currentBoard.archive();
        // XXX We should have some kind of notification on top of the page to
        // confirm that the board was successfully archived.
        FlowRouter.go('home');
      },
    submit: function() {
      const currentBoard = Boards.findOne(Session.get('currentBoard'));
      currentBoard.archive();
      // XXX We should have some kind of notification on top of the page to
      // confirm that the board was successfully archived.
      FlowRouter.go('home');
    }}];
  },
}).register('archiveBoardSidebar');
