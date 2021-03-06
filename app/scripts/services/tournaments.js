'use strict';

app.factory('Tournament',
  function ($firebase, FIREBASE_URL, Utils) {
    var ref = new Firebase(FIREBASE_URL + 'tournaments');

    var tournaments = $firebase(ref);

    var Tournament = {
      all: tournaments,
      create : function(tournament){

        tournaments[tournament.created_at] = tournament;

        return tournaments.$save(tournament.created_at)

      },
      addParticipant : function (tournament, division, participant){
        Utils.nestedObject( tournaments[tournament.created_at], ['results', division, participant.username], participant);

        return tournaments.$save(tournament.created_at);
      },
      removeParticipant : function (tournament, division, participant){
        return tournaments.$child(tournament.created_at)
          .$child('results')
          .$child(division)
          .$remove(participant.username);
      },
      setScored : function(tournament){
        return tournaments.$child(tournament.created_at)
                  .$child('scored')
                  .$set(true);
      },
      updatePlayerStatus : function (participant, status, tournament, division){
        return tournaments
          .$child(tournament.created_at)
          .$child('results')
          .$child(division)
          .$child(participant.username)
          .$child('status')
          .$set(status);
      },
      updateResults : function (tournament) {
         return tournaments
          .$child(tournament.created_at)
          .$child('results')
          .$update(tournament.results)
      },
      setPrizePot : function (tournament) {
         return tournaments
          .$child(tournament.created_at)
          .$child('prize_money')
          .$update(tournament.prize_money)
      },
      findBySlug : function(slug){

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
          // tee_off: {
          //   start_time: Date.now(),
          //   grid_width: 4,
          //   slots: {},
          // },
          tee_off: '',
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
