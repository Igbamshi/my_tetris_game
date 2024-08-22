document.addEventListener('DOMContentLoaded', () => {
    const grid= document.querySelector('.grid')
    let squares= Array.from(document.querySelectorAll('.grid div'))
    let displayScore= document.querySelector('#score')
    let buttonStart = document.querySelector('#start-button')
    const width=10;
    let nextRandom = 0;
    let timerid
    let score = 0
    const colors =[
        'black',
        'red',
        'purple',
        'green',
        'blue'
    ]


    const lTerrimino = [
        [1,width+1,width*2+1,2],
        [width,width+1,width+1,width*2+2],
        [1,width+1,width*2+1,2],
        [width,width*2,width*2+1,width*2+2],
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]
    
    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]
    
    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ]
    
    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]

    const theTetriminoes = [lTerrimino,zTetromino,tTetromino,oTetromino,iTetromino]

    let currentPst=4
    let currentrtn=0
    let random= Math.floor(Math.random()*theTetriminoes.length)
    let current= theTetriminoes[random][currentrtn]

    function drawyer(){
        current.forEach(index =>{
            squares[currentPst + index].classList.add('tetrimino')
            squares[currentPst + index].style.backgroundColor = colors[random]
        })
    }
  
    function undrwyer(){
        current.forEach(index =>{
            squares[currentPst + index].classList.remove('tetrimino')
            squares[currentPst + index].style.backgroundColor =''
        })
    }
    
    // timerid= setInterval(downMove, 1000)

    function control(e) {
        if (e.keyCode === 37) { // Left arrow key
            moveLeft();
        } else if (e.keyCode === 38) { // Up arrow key
            rotate();
        } else if (e.keyCode === 39) { // Right arrow key
            moveright();
        } else if (e.keyCode === 40) { // Down arrow key
            downMove();
        }
    }
    document.addEventListener('keyup', control);

    function downMove(){
        undrwyer()
        currentPst += width
        drawyer()
        frizz()
    }

    function frizz(){
        if(current.some(index => squares[currentPst + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPst + index].classList.add('taken'))
            random=nextRandom
            nextRandom= Math.floor(Math.random() * theTetriminoes.length)
            current = theTetriminoes[random][currentrtn]
            currentPst= 4
            drawyer()
            showShape()
            scoreAdd()
            gameOver()
        }
    }

    function moveLeft(){
        undrwyer()
        const isAtLeftEdg = current.some(index => (currentPst + index) % width === 0)
    
        if(!isAtLeftEdg) currentPst -=1
    
        if(current.some(index => squares[currentPst + index].classList.contains('taken'))){
            currentPst +=1
        }
    
        drawyer()
    }
    
    function moveright(){
        undrwyer()
        const isAtRghtEdg =current.some(index =>(currentPst + index) % width === width -1)
    
        if(!isAtRghtEdg) currentPst +=1
    
        if(current.some(index => squares[currentPst + index].classList.contains('taken'))){
            currentPst -=1
        }
    
        drawyer()
    }

    function rotate(){
        undrwyer();
        currentrtn++;
        if(currentrtn === current.length){
            currentrtn =0
        }
        current = theTetriminoes[random][currentrtn]
        drawyer()
    }


    const nextDisplay = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4;
    let displayIndex = 0;
    

    const IncomingShape =[
        [1,displayWidth+1, displayWidth*2+1, 2],
        [0,displayWidth, displayWidth+1, displayWidth*2+1],
        [1, displayWidth, displayWidth+1, displayWidth+2],
        [0, 1, displayWidth, displayWidth+1],
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
    ]


    function showShape(){
        nextDisplay.forEach(squares =>{
            squares.classList.remove('tetrimino')
            squares.style.backgroundColor = ''
        })
        IncomingShape[nextRandom].forEach(index => {
            nextDisplay[displayIndex + index].classList.add('tetrimino')
            nextDisplay[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }



    buttonStart.addEventListener('click',() => {
        if(timerid){
            clearInterval(timerid)
            timerid=null
        }else{
            drawyer()
            timerid= setInterval(downMove, 1000)
            nextRandom = Math.floor(Math.random()*theTetriminoes.length)
            IncomingShape()
        }
    })


    function scoreAdd(){
        for(let i=0; i< 199; i += width){
            const row =[i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))){
                score +=10
                displayScore.innerHTML=score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetrimino')
                    squares[index].style.backgroundColor = ''
                })
                const removedSquares = squares.splice(i, width)
               squares= removedSquares.concat(squares)
               squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    function gameOver(){
        if(current.some(index => squares[currentPst + index].classList.contains('taken'))){
            displayScore.innerHTML ='Game Over'
            clearInterval(timerid)
        }
    }
})

