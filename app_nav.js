// Use this sample to create your own voice commands
intent('What does this app do?','What can I do here?',
       reply('This is a film searching application'));


const API_KEY= '924171499ba90abe211d9784a4e4be50';
let savedResults=[];

//Movie by title

intent('Give me movies named $(title* (.*))',(p)=>{
    let MOVIE_URL=`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
    
    if(p.title.value){
        MOVIE_URL=`${MOVIE_URL}&query=${p.title.value.toLowerCase()}`;
    }

    api.request(MOVIE_URL, (error,response,body)=>{
        const {results}= JSON.parse(body);
        
        if(!results.length){
            p.play('Sorry, please try searching for another movie');
            return;
        }
        
        savedResults=results;
       
        p.play({command:'newTitles',results});
       p.play(`Here are the movies named ${p.title.value}`);

        
    })
    
      p.play('Would you like me to read the titles?');
      p.then(confirmation);
    
    
    
    
})
//TV Show Search
intent('Give me (tv shows || shows) named $(title* (.*))',(p)=>{
    let MOVIE_URL=`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}`
    
    if(p.title.value){
        MOVIE_URL=`${MOVIE_URL}&query=${p.title.value.toLowerCase()}`;
    }

    api.request(MOVIE_URL, (error,response,body)=>{
        const {results}= JSON.parse(body);
        
         if(!results.length){
            p.play('Sorry, please try searching for another TV show');
            return;
        }
        
        savedResults=results;
       
        p.play({command:'newTitles',results});
       p.play(`Here are the tv shows named ${p.title.value}`);

        
    })
      
          
      p.play('Would you like me to read the tv show titles?');
      p.then(confirmation);
          
    
    
    
})
//Actors
intent('Give me movies with (actor || actress) $(title* (.*))',(p)=>{
    let MOVIE_URL=`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}`;
    
    if(p.title.value){
        MOVIE_URL=`${MOVIE_URL}&query=${p.title.value.toLowerCase()}`;
    }

    api.request(MOVIE_URL, (error,response,body)=>{
        const {results}= JSON.parse(body);
        
         if(!results.length){
            p.play('Sorry, please try searching for another Actor');
            return;
        }
        
        savedResults=results;
       
        p.play({command:'newTitles',results});
        p.play(`Here are movies that ${p.title.value} is known for`);

        
    })
    
      p.play('Would you like me to read the names?');
      p.then(confirmation);
    
    
    
    
})

intent('Give me movies now playing',(p)=>{
  
     let MOVIE_URL=`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
    
    

    api.request(MOVIE_URL, (error,response,body)=>{
        const {results}= JSON.parse(body);
        
        if(!results.length){
            p.play('Sorry, please try searching for something else');
            return;
        }
        
        savedResults=results;
       
        p.play({command:'newTitles',results});
        p.play(`Here are movies now playing`);

        
    })
    
        p.play('Would you like me to read the titles?');
        p.then(confirmation);
    
    
    
    
});



const confirmation= context(()=>{
        intent('yes', async(p)=>{
            for(let i=0;i<savedResults.length;i++)
                {
                    p.play({command:'highlight',title:savedResults[i]});
                    if(savedResults[i].title !=null)
                      {  
                    p.play(`${savedResults[i].title}`);
                      }
                    else{
                        p.play(`${savedResults[i].name}`);
                    }
                }
        })
      
        intent('no',(p)=>{
            p.play('Sure, sounds good to me.')
        })
    
    
})

 
intent('go back',(p)=>
      {
    p.play('Ok going back');
    p.play({command:'newTitles',results:[]});
})


intent('Show me trailer for movie number $(number* (.*))', (p)=>{
    if(p.number.value){
        
        p.play({command:'open',number:p.number.value,results:savedResults})
        
        
    }
    
    
})

intent('Show me trailer for (tv show || show) number $(number* (.*))', (p)=>{
    if(p.number.value){
        
        p.play({command:'openShow',number:p.number.value,results:savedResults})
        
        
    }
    
    
})
    
      
    
    
    
    
