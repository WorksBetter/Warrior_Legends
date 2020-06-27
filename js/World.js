const TILE_W = 50;
const TILE_H = 50;
const ROOM_COLS = 16;
const ROOM_ROWS = 12;

var trackCounter = 0;

var  roomGrid  =   [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,         1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  5,  0,  1,  1,  1,  1,         1,  0,  4,  0,  4,  0,  1,  0,  2,  0,  1,  0,  1,  4,  4,  1,         1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  5,  1,  5,  1,  1,         1,  1,  1,  5,  1,  1,  1,  0,  4,  0,  1,  0,  0,  0,  1,  1,         1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  4,  0,  1,  1,         1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  1,         1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  4,  0,  1,  1,         1,  0,  1,  0,  1,  0,  1,  0,  0,  0,  1,  0,  0,  0,  1,  1,         1,  0,  5,  0,  5,  0,  5,  0,  3,  0,  1,  1,  1,  1,  1,  1,         1,  0,  1,  0,  1,  0,  1,  0,  0,  0,  1,  1,  1,  1,  1,  1,         1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1];



const  TILE_GROUND  =  0;  
const  TILE_WALL  =  1;  
const  TILE_PLAYER  =  2;
const  TILE_GOAL  =  3;  
const  TILE_KEY  =  4;  
const  TILE_DOOR  =  5;


 
function  tileTypeHasTransparency(checkTileType)  {    
    return  (checkTileType  ==  TILE_GOAL  || checkTileType  ==  TILE_KEY  ||  checkTileType  ==  TILE_DOOR);  
}

function  drawRoom()  {    
    var  tileIndex  =  0;    
    var  tileLeftEdgeX  =  0;    
    var  tileTopEdgeY  =  0;        
    for (var  eachRow = 0;  eachRow < ROOM_ROWS;  eachRow++)  {  //	deal  with  one  row  at  a  time          
        tileLeftEdgeX  =  0;  //	resetting  horizontal  draw  position  for  tiles  to  left  edge            
        for (var  eachCol = 0;  eachCol < ROOM_COLS;  eachCol++)  {  //	left  to  right  in  each  row              
            var  tileTypeHere  =  roomGrid[tileIndex];  //	getting  the  track  code  here        

            if ( tileTypeHasTransparency(tileTypeHere) )  {    
                canvasContext.drawImage(tilePics[TILE_GROUND],  tileLeftEdgeX,  tileTopEdgeY);  
            }

            canvasContext.drawImage(tilePics[tileTypeHere],  tileLeftEdgeX,  tileTopEdgeY);                
            tileIndex++;  //	increment  which  index  we 're	 going  to  next  check  in  the  track        
            tileLeftEdgeX  +=  TILE_W;  // jump  horizontal  draw  to  next  tile  over  by  tile  width              
        }  //	end  of  for  eachCol            
        tileTopEdgeY  +=  TILE_H;  //	jump  horizontal  draw  down  by  one  tile  height          
    }  //	end  of  for  eachRow  
}  //	end  of  drawTracks()

function checkForAndremoveTrackAtPixelCoord(pixelX, pixelY) {
    var tileCol = pixelX / TILE_W;
    var tileRow = pixelY / TILE_H;

    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    if (tileRow < 0 || tileRow >= ROOM_ROWS ||
        tileCol < 0 || tileCol >= ROOM_COLS) {
        return;
    }
    var trackIndex = roomTileToIndex(tileCol, tileRow);
    if (roomGrid[trackIndex] == 1) {
        roomGrid[trackIndex] = 0;
        trackCounter--;
        return true;
    } else {
        return false;
    }
}

function roomTileToIndex(tileCol, tileRow) {
    return (tileCol + ROOM_COLS * tileRow);
}

function  getTileIndexAtPixelCoord(pixelX, pixelY)  {  
    var  tileCol  =  pixelX  /  TILE_W;  
    var  tileRow  =  pixelY  /  TILE_H;     //	we 'll	 use  Math.floor  to  round  down  to  the  nearest  whole  number   
    tileCol  =  Math.floor( tileCol );  
    tileRow  =  Math.floor( tileRow );

    //	first  check  whether  the  car  is  within  any  part  of  the  track  wall   
    if (tileCol  <  0  ||  tileCol  >=  ROOM_COLS  ||      tileRow  <  0  ||  tileRow  >=  ROOM_ROWS)  {     
        document.getElementById("debugText").innerHTML  =  "out	 of  bounds: " + pixelX + ", " + pixelY;     
        return  undefined;
    }    
    var  tileIndex  =  roomTileToIndex(tileCol,  tileRow);  
    return  tileIndex;
}

function isWallAtTileCoord(trackTileCol, trackTileRow) {
    var trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
    return (roomGrid[trackIndex] == WORLD_WALL);
}