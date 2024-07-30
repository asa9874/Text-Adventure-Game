//대화
//id:아이디
//name:이름
//voice: 목소리 이름
//choice:선택지 열기여부 true false임
//bgm : bgm 이름
//background : background "url('./img/ryoiki.png')" 형식
//character : {img:케릭터 이미지,position:위치} postion:'hidden' -> 숨기기
//typingSpeed : defalt 60
//animation : [{'target':타겟,'name':애니메이션이름,"duration":길이}] 길이 defalt는 각자다름

export const SCRIPT=[
    {
        "Scripttext":"옛날 옛적 인간과 마족이 살고있었다.",
        "typingSpeed":200,
        'background':"url('./backgroundimg/clothshop.png')",
        
    },
    {
        "id":0,
        "name":"애옹이",
        "Scripttext":"첫번째 테스트 문장인거시다",
        "voice":'000',
        "bgm":"peaceful",
        'character1':{"img":'./character/emotionless.png',"position":30},
        'character2':{"img":'./character/emotionless.png',"position":60},
        
    },
    {
        "id":1,
        "Scripttext":"선택지중 하나를 골라보는거다",
        "voice":'001',
        "choice":1,
        'character1':{"position":10},
        'background':"url('./backgroundimg/street.png')",
    },
    
    {
        "id":2,
        1:{
            "name":"애옹이",
            "Scripttext":"화살을 날리는걸 고른거다",
            "voice":'002-1',
        },
        2:{
            "name":"애옹이",
            "Scripttext":"달을 보며 기도한것이다.",
            "voice":'002-2',
        },
        3:{
            "name":"애옹이",
            "Scripttext":"받아들인것이다.",
            "voice":'002-3',
        },
    },
    {
        "id":3,
        "Scripttext":"상황전환 테스트인것이다.",
        'character1':{'position':'hidden'},
        "bgm":"surprise",
        "voice":'003',
        'background':"url('./backgroundimg/classroom.png')"
    },
]





