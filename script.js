


    const score = {
        Wins: 0,
        Losses: 0,
        Draws: 0
    };


function playGame(playerMove) {

    const computerMove = pickComputerMove();

    // compare our move with the computer Move
    let result = '';

    if (playerMove == 'scissors') {
        if (computerMove === 'Rock') {
            result = 'You lose';
        } else if (computerMove === 'Paper') {
            result = 'You win';
        } else if (computerMove === 'Scissors') {
            result = 'Draw';
        }

     } else if (playerMove === 'paper') {
         if (computerMove === 'Rock') {
            result = 'You win';
        } else if (computerMove === 'Paper') {
            result = 'Draw';
        } else if (computerMove === 'Scissors') {
            result = 'You lose';
        }

        } else if (playerMove === 'rock') {
        if (computerMove === 'Rock') {
            result = 'Draw';
        } else if (computerMove === 'Paper') {
            result = 'You lose';
        } else if (computerMove === 'Scissors') {
            result = 'You win';
        }                               
     }


        if (result === 'You win') {
            score.Wins += 1;
        } else if (result === 'You lose') {
            score.Losses += 1;
        } else if (result === 'Draw') {
            score.Draws += 1;
        }
    
        


            //display the result in a pop up

        alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
Wins: ${score.Wins}, Losses: ${score.Losses}, Draws: ${score.Draws}`);

    }




    function pickComputerMove() {
        
        
    //generate a random number
    const randNumber = Math.random();

    let computerMove = '';

    //converted the move to computer move      

    if (randNumber >= 0 && randNumber < 1/3) { 
        computerMove = ('Rock');
    } else if (randNumber >= 1/3 && randNumber < 2/3){
        computerMove = ('Paper');
    } else if (randNumber >= 2/3 && randNumber < 1) {
        computerMove= ('Scissors');
    }

    return computerMove; 
}
