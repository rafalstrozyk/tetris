export function playPauseButton(isPlay) {
    isPlay? document.getElementById('start-button').innerHTML = '<svg><use xlink:href="#icon-controller-play"></use></svg>': document.getElementById('start-button').innerHTML = '<svg><use xlink:href="#icon-controller-paus"></use></svg>';
} 

export function goLeftButton() {
    setTimeout(() => {
        document.getElementById('arrow-left').style.transform = 'none';
        document.getElementById('arrow-left').style.marginRight = "-10px";
    }, 100)
    
    document.getElementById('arrow-left').style.transform = 'scale(1.3)';
    document.getElementById('arrow-left').style.marginRight = "5px";

}
export function goRightButton() {
    setTimeout(() => {
        document.getElementById('arrow-right').style.transform = 'none';
        document.getElementById('arrow-right').style.marginLeft = "-10px";
    }, 100)
    
    document.getElementById('arrow-right').style.transform = 'scale(1.3)';
    document.getElementById('arrow-right').style.marginLeft = "5px";

}
export function goDownButton() {
    setTimeout(() => {
        document.getElementById('arrow-down').style.transform = 'none';
        document.getElementById('arrow-down').style.marginTop = "5px";
        
    }, 100)
    document.getElementById('arrow-down').style.marginTop = "15px";
    document.getElementById('arrow-down').style.transform = 'scale(1.3)';


}
export function goUpButton() {
    setTimeout(() => {
        document.getElementById('arrow-up').style.transform = 'none';
        document.getElementById('arrow-up').style.marginBottom = "5px";
    }, 100)
    document.getElementById('arrow-up').style.marginBottom = "15px";
    document.getElementById('arrow-up').style.transform = 'scale(1.3)';

}