

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
 
 
  function buildLearnerCard(learner,mentors){
  const card = document.createElement("div");
  card.classList.add("card")
 
  
  const nameID = document.createElement("h3");
  nameID.textContent = `${learner.fullName}, ID ${learner.id}`

  const cardEmail = document.createElement("div");
  cardEmail.textContent = learner.email;
  const mentorsH4 = document.createElement("h4");
  mentorsH4.classList.add("closed")
  mentorsH4.textContent = "Mentors"
  const listMentors = document.createElement("ul")
  
  const info = document.querySelector(".info")
 

  const arrayID = learner.mentors
  const arrayObj = mentors.data
  const matchingIDs = arrayID.filter(id => arrayObj.some(mentor => mentor.id === id))
  matchingIDs.forEach(id => {
    const mentor = arrayObj.find(mentor => mentor.id === id);
      const list = document.createElement('li');
      list.textContent = `${mentor.firstName} ${mentor.lastName}`;
      listMentors.appendChild(list)
    
  });
  
  
  
 
  card.appendChild(nameID);
  card.appendChild(cardEmail);
  card.appendChild(mentorsH4);
  card.appendChild(listMentors);
  // listMentors.appendChild(mentorsNames);
  info.textContent = "No learner is selected"
 

  const cards = document.querySelectorAll('.card');
 // Click event listener for each card using forEach
 card.addEventListener("click",function(){

  cards.forEach( card => {
    card.classList.remove("selected")
   });
    card.classList.toggle("selected")
    info.textContent =`The selected learner is ${learner.fullName}`;
    if(card.classList.contains("selected") === false){
      info.textContent = "No learner is selected"
    }
  });


  mentorsH4.addEventListener("click",function(){
    this.classList.toggle("open")
    this.classList.toggle("closed")

  })
  
  document.addEventListener("click",evt => {
    if(evt.target === document.querySelector("section")){
    const cards = document.querySelectorAll(".card")
    info.textContent = "No learner is selected"
    cards.forEach(card => {
      card.classList.remove("selected")
    })}
   
  })
  
  
  
  return card
  }
     

    
    const learnersData = axios.get("http://localhost:3003/api/learners")
    const mentorsData = axios.get("http://localhost:3003/api/mentors")
   
    return Promise.all([learnersData,mentorsData])

    .then(res=>{
      const learner = res[0]
      const mentors = res[1]
      
      
      learner.data.forEach(learner => {
              const learnerCard = buildLearnerCard(learner,mentors)
             document.querySelector(".cards").appendChild(learnerCard)
             
            })

         
            
            
            
    })
    .catch(error=>{
      console.log(error)
    })
   
  




  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
