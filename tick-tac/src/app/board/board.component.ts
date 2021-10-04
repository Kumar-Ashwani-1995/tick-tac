import { Component, DoCheck, OnInit } from '@angular/core';
import {MatSnackBar,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
  import {ThemePalette} from '@angular/material/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  value:string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit,DoCheck {
  count: number=0;
  winner: string ="NIL";
  winner_bool: boolean=false;
  errorMsg: string ="";
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  scoreDashboard: boolean=false;
  boardDashboard: boolean=true;
  player1:string="Raven";
  player2:string="Machine";
  draw_bool: boolean=false;
  color: ThemePalette = 'primary';
  compDisable: boolean = false;


  game="Tic-Tak";
  stopper=5;
  gameValue=true;
  player1Win=0;
  player2Win=0;
  computer=false;
  
  constructor(private _snackBar: MatSnackBar) { }
  ngDoCheck(): void {
    if(this.count<1){
      this.gameValue=true;
    }
    console.log(this.gameValue,this.winner_bool )
    if(!this.gameValue && !this.winner_bool && !this.computer){
       this.compDisable=true;
      this.computerTurn();
      setTimeout(() => {
        this.compDisable=false
      }, 1500);
    }
  }


  ngOnInit(): void {
  }


  tiles: Tile[] = [
    {text: '0',value:"", cols: 1, rows: 2, color: '#DDBDF1'},
    {text: '1',value:"", cols: 1, rows: 2, color: 'lightgreen'},
    {text: '2',value:"", cols: 1, rows: 2, color: '#DDBDF1'},
    {text: '3',value:"", cols: 1, rows: 2, color: 'lightgreen'},
    {text: '4',value:"", cols: 1, rows: 2, color: '#DDBDF1'},
    {text: '5',value:"", cols: 1, rows: 2, color: 'lightgreen'},
    {text: '6',value:"", cols: 1, rows: 2, color: '#DDBDF1'},
    {text: '7',value:"", cols: 1, rows: 2, color: 'lightgreen'},
    {text: '8',value:"", cols: 1, rows: 2, color: '#DDBDF1'}
  ];
  backup: Tile[] = [
    {text: '0',value:"", cols: 1, rows: 2, color: '#DDBDF1'},
    {text: '1',value:"", cols: 1, rows: 2, color: 'lightgreen'},
    {text: '2',value:"", cols: 1, rows: 2, color: '#DDBDF1'},
    {text: '3',value:"", cols: 1, rows: 2, color: 'lightgreen'},
    {text: '4',value:"", cols: 1, rows: 2, color: '#DDBDF1'},
    {text: '5',value:"", cols: 1, rows: 2, color: 'lightgreen'},
    {text: '6',value:"", cols: 1, rows: 2, color: '#DDBDF1'},
    {text: '7',value:"", cols: 1, rows: 2, color: 'lightgreen'},
    {text: '8',value:"", cols: 1, rows: 2, color: '#DDBDF1'}
  ];

  reset(){
    setTimeout(() => {
      console.log("reset");
     this.tiles=JSON.parse(JSON.stringify(this.backup));
     this.winner_bool=false;
     this.winner="NIL";
     this.count=0;
     this.draw_bool=false;
     this.gameValue=true;
     
    }, 5000);

  }
  scoreBoard(){
    this.scoreDashboard=true;
    this.boardDashboard=false;
  }
 homeBoard(){
    this.scoreDashboard=false;
    this.boardDashboard=true;
  }
  resetNow(){
    console.log("reset now")
    
     this.tiles=JSON.parse(JSON.stringify(this.backup)); 
     this.winner_bool=false;
     this.winner="NIL";
     this.count=0;
     this.draw_bool=false;
     this.gameValue=true;
  }
   resetScoreBoard(){
      this.player1Win=0;
      this.player2Win=0;
      this.tiles=JSON.parse(JSON.stringify(this.backup)); 
      this.winner="NIL";
      this.count=0;
      this.draw_bool=false;
      this.gameValue=true;
      this.winner_bool=false;
   }

  checkWinner():string{
    
      if(this.tiles[0]["value"]==="X" && this.tiles[1]["value"]==="X" && this.tiles[2]["value"]==="X"){
        return this.player1
      }
      else if(this.tiles[0]["value"]==="O" && this.tiles[1]["value"]==="O" && this.tiles[2]["value"]==="O"){
        return this.player2
      }
      else if(this.tiles[3]["value"]==="X" && this.tiles[4]["value"]==="X" && this.tiles[5]["value"]==="X"){
        return this.player1
      }
      else if(this.tiles[3]["value"]==="O" && this.tiles[4]["value"]==="O" && this.tiles[5]["value"]==="O"){
        return this.player2
      }
      else if(this.tiles[6]["value"]==="X" && this.tiles[7]["value"]==="X" && this.tiles[8]["value"]==="X"){
        return this.player1
      }
      else if(this.tiles[6]["value"]==="O" && this.tiles[7]["value"]==="O" && this.tiles[8]["value"]==="O"){
        return this.player2
      }
      else if(this.tiles[0]["value"]==="X" && this.tiles[3]["value"]==="X" && this.tiles[6]["value"]==="X"){
        return this.player1
      }
      else if(this.tiles[0]["value"]==="O" && this.tiles[3]["value"]==="O" && this.tiles[6]["value"]==="O"){
        return this.player2
      }
      else if(this.tiles[1]["value"]==="X" && this.tiles[4]["value"]==="X" && this.tiles[7]["value"]==="X"){
        return this.player1
      }
      else if(this.tiles[1]["value"]==="O" && this.tiles[4]["value"]==="O" && this.tiles[7]["value"]==="O"){
        return this.player2
      }
      else if(this.tiles[2]["value"]==="X" && this.tiles[5]["value"]==="X" && this.tiles[8]["value"]==="X"){
        return this.player1
      }
      else if(this.tiles[2]["value"]==="O" && this.tiles[5]["value"]==="O" && this.tiles[8]["value"]==="O"){
        return this.player2
      }
      else if(this.tiles[0]["value"]==="X" && this.tiles[4]["value"]==="X" && this.tiles[8]["value"]==="X"){
        return this.player1
      }
      else if(this.tiles[0]["value"]==="O" && this.tiles[4]["value"]==="O" && this.tiles[8]["value"]==="O"){
        return this.player2
      }
      else if(this.tiles[2]["value"]==="X" && this.tiles[4]["value"]==="X" && this.tiles[6]["value"]==="X"){
        return this.player1
      }
      else if(this.tiles[2]["value"]==="O" && this.tiles[4]["value"]==="O" && this.tiles[6]["value"]==="O"){
        return this.player2
      }
      return "NIL"
  }
  gameButton(text: any){
      
      // console.log(this.count);
      for(let i=0;i<this.tiles.length;i++){
        if(this.tiles[i]["text"]===text && this.tiles[i]["value"]===""){
          //console.log(this.tiles[i]["text"])
            if(this.gameValue){
              this.tiles[i]["value"]="X";
              this.count++;
              this.gameValue=!this.gameValue;
            }
            else{
              this.tiles[i]["value"]="O";
              this.count++;
              this.gameValue=!this.gameValue;
            }
          
            this.winner=this.checkWinner();
            if(this.winner===this.player1){
              this.player1Win++;
            }
            else if(this.winner===this.player2){
              this.player2Win++;
            }
          
          if(this.winner!=="NIL"){
            this.winner_bool=true;
            this.reset();
          }
          
        }
        else if(this.tiles[i]["text"]===text && this.tiles[i]["value"]!==""){
          this.errorMsg="Already selected!!!";
          this.openSnackBar(this.errorMsg)
        }
        
      }
      if(this.count==9 && this.winner==="NIL"){
          this.draw_bool=true;
          this.reset();
        }

  }
  openSnackBar(message: string) {
    this._snackBar.open(message, "close",{
    horizontalPosition: 'center',
    verticalPosition: 'bottom'});
  }

    computerTurn() {
      
      setTimeout(() => {
        
        for(let i=0;i<this.tiles.length;i++){
          if(this.count<1){
            break;
          }
          if(this.tiles[0]["value"]==="X" && this.tiles[1]["value"]==="X" && this.tiles[2]["value"]===""){
            this.gameButton(this.tiles[2]["text"]);
            break;
          }
          else if(this.tiles[0]["value"]==="X" && this.tiles[1]["value"]==="" && this.tiles[2]["value"]==="X"){
            this.gameButton(this.tiles[1]["text"]);
            break;
          }
          else if(this.tiles[0]["value"]==="O" && this.tiles[1]["value"]==="O" && this.tiles[2]["value"]===""){
            this.gameButton(this.tiles[2]["text"]);
            break;
          }
          else if(this.tiles[0]["value"]==="O" && this.tiles[1]["value"]==="" && this.tiles[2]["value"]==="O"){
            this.gameButton(this.tiles[1]["text"]);
            break;
          }
          else if(this.tiles[0]["value"]==="" && this.tiles[1]["value"]==="O" && this.tiles[2]["value"]==="O"){
            this.gameButton(this.tiles[0]["text"]);
            break;
          }
          else if(this.tiles[3]["value"]==="X" && this.tiles[4]["value"]==="X" && this.tiles[5]["value"]===""){
            this.gameButton(this.tiles[5]["text"]);
            break;
          }
          else if(this.tiles[3]["value"]==="O" && this.tiles[4]["value"]==="O" && this.tiles[5]["value"]===""){
            this.gameButton(this.tiles[5]["text"]);
            break;
          }
          else if(this.tiles[3]["value"]==="O" && this.tiles[4]["value"]==="" && this.tiles[5]["value"]==="O"){
            this.gameButton(this.tiles[4]["text"]);
            break;
          }
          else if(this.tiles[3]["value"]==="" && this.tiles[4]["value"]==="O" && this.tiles[5]["value"]==="O"){
            this.gameButton(this.tiles[3]["text"]);
            break;
          }
          else if(this.tiles[3]["value"]==="X" && this.tiles[4]["value"]==="" && this.tiles[5]["value"]==="X"){
            this.gameButton(this.tiles[4]["text"]);
            break;
          }
          else if(this.tiles[6]["value"]==="X" && this.tiles[7]["value"]==="X" && this.tiles[8]["value"]===""){
            this.gameButton(this.tiles[8]["text"])
              break;
          }
           else if(this.tiles[6]["value"]==="X" && this.tiles[7]["value"]==="" && this.tiles[8]["value"]==="X"){
            this.gameButton(this.tiles[7]["text"])
              break;
          }
          else if(this.tiles[0]["value"]==="X" && this.tiles[3]["value"]==="X" && this.tiles[6]["value"]===""){
            this.gameButton(this.tiles[6]["text"])
              break;
          }
          else if(this.tiles[0]["value"]==="X" && this.tiles[3]["value"]==="" && this.tiles[6]["value"]==="X"){
            this.gameButton(this.tiles[3]["text"])
              break;
          }
          else if(this.tiles[1]["value"]==="X" && this.tiles[4]["value"]==="X" && this.tiles[7]["value"]==="7"){
            this.gameButton(this.tiles[7]["text"])
              break;
          }
          else if(this.tiles[1]["value"]==="" && this.tiles[4]["value"]==="O" && this.tiles[7]["value"]==="O"){
            this.gameButton(this.tiles[1]["text"])
              break;
          }
          else if(this.tiles[2]["value"]==="X" && this.tiles[5]["value"]==="X" && this.tiles[8]["value"]===""){
            this.gameButton(this.tiles[8]["text"])
              break;
          }
          else if(this.tiles[2]["value"]==="O" && this.tiles[5]["value"]==="O" && this.tiles[8]["value"]===""){
            this.gameButton(this.tiles[8]["text"])
              break;
          }
          else if(this.tiles[0]["value"]==="X" && this.tiles[4]["value"]==="X" && this.tiles[8]["value"]===""){
            this.gameButton(this.tiles[8]["text"])
              break;
          }
          else if(this.tiles[2]["value"]==="X" && this.tiles[4]["value"]==="X" && this.tiles[6]["value"]===""){
            this.gameButton(this.tiles[6]["text"])
              break;
          }
          else if(this.tiles[2]["value"]==="O" && this.tiles[4]["value"]==="O" && this.tiles[6]["value"]===""){
            this.gameButton(this.tiles[6]["text"])
              break;
          }
          else if(this.tiles[2]["value"]==="" && this.tiles[4]["value"]==="O" && this.tiles[6]["value"]==="O"){
            this.gameButton(this.tiles[2]["text"])
              break;
          }
          else if(this.tiles[0]["value"]===""){
              this.gameButton(this.tiles[0]["text"])
              break;
            }
          else if(this.tiles[4]["value"]===""){
              this.gameButton(this.tiles[4]["text"])
              break;
            }
          else if(this.tiles[7]["value"]==="" && this.tiles[8]["value"]==="X"){
            this.gameButton(this.tiles[7]["text"])
            break;
          }
          else if(this.tiles[6]["value"]===""){
              this.gameButton(this.tiles[6]["text"])
              break;
            }
          else if(this.tiles[8]["value"]===""){
              this.gameButton(this.tiles[8]["text"])
              break;
            }
          else if(this.tiles[i]["value"]===""){
              this.gameButton(this.tiles[i]["text"])
              break;
            }}

          }, 1500);
          
    
  }

}
