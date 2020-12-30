class Form{
    constructor(){
        this.button = createButton("Start");
        this.title = createElement('h2');
    }
     display(){
         
         this.title.html("Welcome to the game: Girl Warrior");
         this.title.position(200,0);

         this.button.position(370,350);
         this.button.mousePressed(()=>{
         this.button.hide();
         this.title.hide();
            gameState=1;
         })
     }
}