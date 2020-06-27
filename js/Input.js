const  KEY_UP_ARROW  =  38;
const  KEY_LEFT_ARROW  =  37;
const  KEY_RIGHT_ARROW  =  39;
const  KEY_DOWN_ARROW  =  40;

const  KEY_LETTER_W  =  87;
const  KEY_LETTER_A  =  65;
const  KEY_LETTER_S  =  83;
const  KEY_LETTER_D  =  68;

function initInput() {
    document.addEventListener("keydown",  keyPressed);
    document.addEventListener("keyup",  keyReleased)
}

function  keyPressed(evt)  {  
    setKeyHoldState(evt.keyCode, p1, true);
    evt.preventDefault();
}    

function  keyReleased(evt)  {    
    setKeyHoldState(evt.keyCode, p1, false);
}

function  setKeyHoldState(thisKey, thisPlayer, setTo)  {      
    if (thisKey  ==  thisPlayer.controlKeyForNorth)  {      
        thisPlayer.keyHeld_North  =  setTo;    
    }  
    else if (thisKey  ==  thisPlayer.controlKeyForEast)  {      
        thisPlayer.keyHeld_East  =  setTo;    
    } 
    else if (thisKey  ==  thisPlayer.controlKeyForSouth)  {      
        thisPlayer.keyHeld_South  = setTo;    
    }  
    else if (thisKey  ==  thisPlayer.controlKeyForWest)  {      
        thisPlayer.keyHeld_West  =  setTo;    
    }     
}
