
// 1. function : 함수 선언 크워드
// 2. 컴포넌트명 : 아무이름이나 정의한다(첫글자 대문자로 필수!!)
// 3. (props) {} : 매개변수는 props를 필수로한다.(생략 가능)
// 4. {return jsx문법} : jsx문법 작성
// 5. export default 반환할컴포넌트명 : 여러 컴포넌트 중에서 import할 경우 반활할 컴포넌트를 정의

// [1] 기본 컴포넌트
function Component2(props) {
    return <div><Header/>메인페이지<Footer/></div>;
}
export default Component2;

// [2] 그외 컴포넌트
// [2-1] 헤더 컴포넌트
function Header(props) {
    return <div>헤더 메뉴</div>;
}
// [2-2] 풋터 컴포넌트
function Footer(props) {
    return <div>풋터 메뉴</div>
}