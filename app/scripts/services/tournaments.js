'use strict';

app.factory('Tournament', 
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'tournaments');
    var tournaments = $firebase(ref);
 
    var Tournament = {
      all: tournaments,
      create : function(tournament){
        
        tournaments[tournament.slug] = tournament;
        
        return tournaments.$save(tournament.slug)

      },
      find : function(tournamentId){
        return tournaments.$child(tournamentId);
      },
      delete : function(tournamentId){
        return tournaments.$remove(tournamentId);
      },
      new : function(){
        return {
          start_date: Date.now(),
          no_days: 2,
          signup_before: Date.now(),
          name: {
            'en' : '',
            'zh-hk' : '',
            'zh-cn' : ''
          },
          venue: {
            'en' : '',
            'zh-hk' : '',
            'zh-cn' : ''
          },
          rules_url : '',
          scored: false,
          prize_money: {},
          tee_off: {
            start_time: Date.now(),
            grid_width: 4,
            slots: {},
          },
          divisions: {
            open : true,
            ladies: true,
            senior: false,
            trainee: false,
           },
          author: '',
          slug: '',
          updated_at: Date.now(),
          created_at: Date.now(),
        }
      }
    };

    return Tournament;
})
