import '../reset.css'
import '../style.css'
import '../animation.css'
import $ from 'jquery'
import { SCRIPT } from './Script'
import { PlayBgm,PlayVoice,playEffectSound } from './playsound'
import { isChoiceScript,ChoiceList } from './choice'
import { ChangeCharactor } from './charactor'
import { Animation } from './animation'

export const $GameStartBox=$('.GameStartBox');
export const $OpeningSkipBox=$('.OpeningSkipBox')
export const $gamebox=$('.gamebox')
export const $gamebackgroundimg=$('.gamebackgroundimg')
export const $backgroundimg=$('.backgroundimg')
export const $conversation=$('.conversation')
export const $character=$('.character')
export const $character1=$('.character1')
export const $character2=$('.character2')
export const $character3=$('.character3')
export const $namebox=$('.namebox')
export const $choicebox=$('.choicebox')
export const $choice1=$('.choice1')
export const $choice2=$('.choice2')
export const $choice3=$('.choice3')

//현재 대화순서
export let NowConversation=-1;
export let nowScript;

export let choicecheck;      //선택지 골랐는지 확인
export let nowchoice=0;      //어떤 선택지?
export let currentBgm;       //현재 Bgm 넣는 변수
export let currentVoice;     //현재 목소리 넣는 변수

//타이핑관련
export let Conversationtext  // 현재 나온 타이핑
export let currentCharIndex  // 현재 타이핑 위치
export let typingSpeed = 60; // 타이핑 속도 (밀리초)


//초기세팅
$backgroundimg.css('background-image', 'url("./backgroundimg/space.png")');
$gamebox.hide()
$character.hide();
$choicebox.hide();





//타이핑효과
export function typeCharacter() {
  if (currentCharIndex < Conversationtext.length) {
    //목소리 없으면 타이핑소리로 대체
    if(!nowScript.voice){
      playEffectSound('type',0.3)
    }
    $conversation.text($conversation.text() + Conversationtext.charAt(currentCharIndex));
    currentCharIndex++;
    setTimeout(typeCharacter, typingSpeed);
  } 
  else {
    $conversation.text(Conversationtext); // 타이핑이 끝나면 전체 텍스트 표시
    $('.textbox').css('pointer-events', 'auto');
    if((nowScript.choice) && choicecheck){
      ShowChoicebox(nowScript.choice)
      choicecheck=false
    }
  }
}

//텍스트 출력 초기화시키는곳
export function PrintText(name,text){
  $conversation.text('');
  currentCharIndex=0;
  $namebox.text(name)
  Conversationtext=text
  $('.textbox').css('pointer-events', 'none');
  typeCharacter();
}


//선택지 열기
export function ShowChoicebox(choicenumber){
    $choicebox.show();
    $choice1.text(ChoiceList[choicenumber][1])
    $choice2.text(ChoiceList[choicenumber][2])
    $choice3.text(ChoiceList[choicenumber][3])
}


//선택지 고름
$('.choice').on('click', function() {
  playEffectSound('choice',0.3)
    nowScript.voice=null
    PrintText("댕댕이",$(this).text());
    $choicebox.hide();

  if ($(this).is($choice1)) {nowchoice = 1;} 
  else if ($(this).is($choice2)) {nowchoice = 2;} 
  else if ($(this).is($choice3)) {nowchoice = 3;} 
});





//바꾸기,체크 함수
export function ChangeElements(){
  currentVoice=PlayVoice(currentVoice,nowScript.voice,1)
  currentBgm=PlayBgm(currentBgm,nowScript.bgm)

  ChangeCharactor($character1,nowScript.character1)
  ChangeCharactor($character2,nowScript.character2)
  ChangeCharactor($character3,nowScript.character3)


  if(nowScript.background) {
    $gamebackgroundimg.css('background-image',nowScript.background)
  }
  if(nowScript.name){
    $namebox.text(nowScript.name)
  }

  if(nowScript.animation){
    Animation(nowScript.animation)
  }
  if(nowScript.goscript){
    NowConversation=nowScript.goscript
  }

  if(nowScript.typingSpeed){
    typingSpeed=nowScript.typingSpeed
  }
  else{
    typingSpeed=60
  }

  if($namebox.text()===""){
    $namebox.hide()
  }
  else{
    $namebox.show()
  }
  
}


//다음대화로 이동하기
export function NextConversation(){
  NowConversation+=1;
  choicecheck=true
  nowScript=SCRIPT[NowConversation]
  
  if(isChoiceScript(nowScript)){
    nowScript=SCRIPT[NowConversation][nowchoice]
  }
  PrintText(nowScript.name,nowScript.Scripttext)
  //바꾸기
  ChangeElements()
}



//텍스트 란 클릭
$('.textbox').on('click', function() {
  NextConversation()
});



//게임시작
$GameStartBox.on('click', function() {
  NextConversation();
  $GameStartBox.hide();
  $gamebox.show()
  $OpeningSkipBox.hide()
});

//오프닝스킵
$OpeningSkipBox.on('click', function() {
  NowConversation=5
  NextConversation();
  $GameStartBox.hide();
  $gamebox.show()
  $OpeningSkipBox.hide()
});