$(function(){
    // header의 스크롤에 따른 숨김/보임 --------------------------------------------
    const $header = $('header');
    let scrollTimer;

    // 스크롤 위치가 0일때 (맨 위)
    if($(window).scrollTop() === 0) {
        $header.removeClass('bgColor');
    }

    $(window).on('scroll', function() {
        // 숨김/보임 로직
        clearTimeout(scrollTimer);
        $header.addClass('hidden');
        scrollTimer = setTimeout(function() {
            $header.removeClass('hidden');
        }, 200);

        if($(this).scrollTop() > 0) {
            // 스크롤 내렸을때 클래스 추가
            $header.addClass('bgColor');
        }
        else {
            // 맨 위에 있을 때 클래스 제거
            $header.removeClass('bgColor');
        }
    });

    // main 배경이미지 fadein으로 전환시키기 ----------------------------------------------
    const introSwiper = new Swiper('.intro-swiper', {
        loop: true,
        autoplay: {
            delay: 3000
        }, 
        effect: 'fade',
        speed: 2000
    });

    // 인트로 애니메이션 부분 -------------------------------------------------------------
    // 최초에 한번만 정의하면 됨
    gsap.registerPlugin(ScrollTrigger);

    // 무작위 값 생성 함수(min ~ max 사이 랜덤 숫자를 반환)
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    // SVG 안의 모든 요소 선택
    const svgElements = document.querySelectorAll("svg *");

    // SVG 초기 상태 세팅(jQuery로 SVG 안의 모든 요소를 반복)
    // 각 요소의 초기 상태를 무작위로 흩어지게 세팅
    svgElements.forEach((el)=> {
        gsap.set(el, {
            // x, y → -1500~1500 픽셀 범위에서 이동
            x: getRandom(-1500, 1500),
            y: getRandom(-1500, 1500),
            // rotation → -720~720도 회전
            rotation: getRandom(-90, 90),
            // scale: 0 → 크기 0 (보이지 않음)
            scale: 0,
            // opacity: 0 → 투명
            opacity: 0
        });
    });

    // 애니메이션 타임라인 생성(계속 반복)
    // const tl = gsap.timeline({
    //   repeat: -1, // 애니메이션 무한 반복
    //   repeatDelay: 1, // 반복시 0.65초 지연
    //   yoyo: true // 마지막 상태에서 다시 원래 상태로 돌아감
    // });

    // 타임라인 생성 (반복없이 한번만)
    const tl = gsap.timeline();

    // 목표 상태 설정(각 SVG 요소들을 순차적으로 원래 위치로 애니메이션)
    tl.to(svgElements, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 2.5,
        ease: 'power4.inOut', // ease → 애니메이션 완만하게 시작하고 끝나도록 설정
        // delay: 0,         // 타임라인 시작과 동시에 실행
        stagger: {
            each: 0.0005,  // 요소 간격
            // amount: 2,  // 전체 0.5초 안에 모든 조각 시작
            // from: 'start' // 시작 즉시 첫 번째 요소 실행
        }
    });

    // 2. 유지 (완성된 상태로 몇 초간 대기)
    tl.to(svgElements, {
        duration: 2 // 2초 동안 그대로 유지
    });

    // 퇴장 (다시 흩어지며 사라짐)
    tl.to(svgElements, {
        x: () => gsap.utils.random(-1000, 1000),
        y: () => gsap.utils.random(-1000, 1000),
        rotation: () => gsap.utils.random(-720, 720),
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
        stagger: { amount: 5, from: "end" } // start 혹은 end 가능
    });

    // the letters appear animation(나타나는 글자들) ------------------------------------------
    // (section1)main-txt 애니메이션 -----------------------------------------------------
    // .txt1, .txt2, .txt3영역의 자식요소 span을 각 변수에 저장
    // sp1[0]= "<span>C</span>, sp1[1]= "<span>r</span>..."
    let sp1 = $('.s1 .main-txt .txt1 span');
    let sp2 = $('.s1 .main-txt .txt2 span');
    let sp3 = $('.s1 .main-txt .txt3 span');

    // .txt1, .txt2, .txt3에 적용할 랜덤한 숫자를 발생시켜서 각 배열 생성
    // sp1의 길이만큼 ran1배열 생성, i는 ran1배열의 인덱스번호임
    // ran1[i]에 Math.random() - 0.25로 발생한 숫자를 정렬해서 저장
    let ran1 = Array.from({length:sp1.length}, (_, i) => i).sort(()=>Math.random() - 0.25);
    let ran2 = Array.from({length:sp2.length}, (_, i) => i).sort(()=>Math.random() - 0.25);
    let ran3 = Array.from({length:sp3.length}, (_, i) => i).sort(()=>Math.random() - 0.25);
    // console.log("sp1=", sp1);
    // console.log("sp2=", sp2);
    // console.log("sp3=", sp3);
    // console.log("ran1=", ran1);
    // console.log("ran2=", ran2);
    // console.log("ran3=", ran3);

    // ran1배열의 개수만큼 반복, 매개변수: index, i
    ran1.forEach((index, i)=> {
        // 일정시간 기다렸다가 {}안의 명령어 실행
        setTimeout(()=> {
            // index는 sp1배열의 인덱스 번호
            // i는 ran1배열의 값(원소)를 나타냄(Math.random()-0.25)
            $(sp1[index]).addClass('active');
            // 200ms(밀리세컨드) = 0.2초
        }, i*300);
    });
    ran2.forEach((index, i)=> {
        setTimeout(()=> {
            $(sp2[index]).addClass('active');
        }, i*300);
    });
    ran3.forEach((index, i)=> {
        setTimeout(()=> {
            $(sp3[index]).addClass('active');
        }, i*300);
    });
    // 0.2초 기다렸다가 .main-txt에 active 클래스 추가
    setTimeout(()=> {
        $('.main-txt').addClass('active');
    }, 300);

    // section1영역 소개글 마지막에 등장 -------------------------------
    setTimeout(()=> {
        $('.introduce').addClass('active');
    }, 11000);

    // section2영역 -------------------------------------------------------------------------
    // 흐르는 글자 애니메이션
    // 변수명에 $를 붙이면 변수에 저장된 요소의 속성을 사용할 수 있음
    let $box = $('.s2 .flow-txt-wrap');
    let $flow1 = $('.s2 .flow-txt-wrap .flow-txt1');
    let $flow2 = $('.s2 .flow-txt-wrap .flow-txt2');
    let $txt1 = $('.s2 .flow-txt-wrap .flow-txt1 span');
    let $txt2 = $('.s2 .flow-txt-wrap .flow-txt2 span');
    // 선언적함수
    function flowTxt() {
        // 오른쪽에서 왼쪽으로 흐름(css를 반대로 줘야함)
        // $flow변수 영역을 비워줌
        $flow1.empty();
        // span태그 안의 텍스트를 txtContent 변수에 저장
        let txtContent1 = $txt1.text();
        // span태그 안의 텍스트를 div영역에 쓰기
        let $txtElement1 = $('<div>').text(txtContent1);
        // flow글자영역에 txtElement를 자식 요소로 추가
        $flow1.append($txtElement1);
        // flow글자영역에 txtElement를 복사해서 자식요소로 추가
        $flow1.append($txtElement1.clone());
        // $flow변수에 저장된 글자의 길이/2한 값을 txtWidth변수에 저장
        let txtWidth1 = $flow1.width()/2;
        // 글자가 움직이는 실행시간, 1초에 30px씩 왼쪽으로 이동함
        let time1 = txtWidth1 / 30 * 1000;
        // 글자에 애니메이션 없음
        $flow1.css('animation', 'none');
        // 글자영역의 margin을 포함한 가로길이 설정
        $flow1.outerWidth();
        // 글자영역에 animation속성 지정
        $flow1.css({
            'animation': 'flowTxt1 ' + time1 + 'ms linear infinite forwards'
        });

        // 왼쪽에서 오른쪽으로 흐름(css를 반대로 줘야함)
         // $flow변수 영역을 비워줌
        $flow2.empty();
        // span태그 안의 텍스트를 txtContent 변수에 저장
        let txtContent2 = $txt2.text();
        // span태그 안의 텍스트를 div영역에 쓰기
        let $txtElement2 = $('<div>').text(txtContent2);
        // flow글자영역에 txtElement를 자식 요소로 추가
        $flow2.append($txtElement2);
        // flow글자영역에 txtElement를 복사해서 자식요소로 추가
        $flow2.append($txtElement2.clone());
        // $flow변수에 저장된 글자의 길이/2한 값을 txtWidth변수에 저장
        let txtWidth2 = $flow2.width()/2;
        // 글자가 움직이는 실행시간, 1초에 30px씩 왼쪽으로 이동함
        let time2 = txtWidth2 / 30 * 1000;
        // 글자에 애니메이션 없음
        $flow2.css('animation', 'none');
        // 글자영역의 margin을 포함한 가로길이 설정
        $flow2.outerWidth();
        // 글자영역에 animation속성 지정
        $flow2.css({
            'animation': 'flowTxt2 ' + time2 + 'ms linear infinite forwards'
        });
    }
    // 함수 호출
    flowTxt();

    // s2속 내용물들 나타나며 이동 애니메이션
    // s2영역의 타임라인 생성
    // 타임라인 정의 (자동 실행은 안 시킴)
    const s2tl = gsap.timeline({paused: true});

    // 1.타이틀
    s2tl.to('.s2 .aboutme-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    })
    // 2. 사진이미지
    .to('.s2 .my-photo-image', {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out'
    }, '-=0.3') // 약간 겹쳐서 자연스럽게
    // 3. 자기소개 (p들이 순차적으로)
    .to(['.s2 .my-determination', '.s2 .my-determination p'], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,   // 하나씩 순차 등장
        ease: 'power.out'
    }, '-=0.5')
    // 4. 학력, 스킬
    .to(['.s2 .education', '.s2 .skills'], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.5,
        ease: 'power.out'
    }, '-=0.2');

    // ScrollTrigger로 타임라인 제어
    ScrollTrigger.create({
            trigger: '.s2',
            start: 'top 70%',   // 화면의 70% 지점에서 시작
            end: 'bottom 30%',  // 필요시 조절 가능
            onEnter: ()=> s2tl.restart(),   // 내려올 때 항상 처음부터 실행
            onLeaveBack: ()=> s2tl.pause(0).progress(0),    // 위로 올라갈때 초기화
            // toggleActions: 'play none none none', // 한번만 재생
            // toggleActions: 'restart none none none', // 내릴때마다 다시 재생
            // scrub: 3, // 이걸 넣으면 스크롤움직일때만 애니메이션됨
            // markers: true // 디버깅용
        });

    // section3 영역 ------------------------------------------------------------------------
    // swiper 슬라이드 ------------------------------------------
    var projectSwiper = new Swiper(".project-swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: 'progressbar'
        },
    });

    // section4 영역 ------------------------------------------------------------------------
    // email 애니메이션(3초마다)
    // setTimeout(function emailOpen(){
    //     $('.letter-image').addClass('active');
    //     // 3초마다 active클래스 제거
    //     setTimeout(function emailClose(){
    //         $('.letter-image').removeClass('active');
    //         // 재귀함수(자기 자신을 다시 호출함)
    //         setTimeout(emailOpen, 3000);
    //     }, 3000);
    // }, 3000);
});