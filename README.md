<img src = "https://capsule-render.vercel.app/api?type=waving&color=0:A097D4,100:DED9F4&fontColor=FFFFFF&fontAlignY=40&height=200&section=header&text=BloodMate" />

<h2>📝 프로젝트 소개</h2>
<div>
    <p>
        BloodMate(블러드메이트)는 혈당·혈압을 편하게 기록할 수 있는 건강 관리 서비스입니다.
    </p>
</div>

<h2>📅 개발 기간</h2>
<ul>
    <li><strong>2025.08.28 ~ 2025.11.02</strong></li>
</ul>


<h2>💻 개발 환경</h2>
<ul> <!-- valign="middle"  -->
    <!-- FrontEnd -->
    <li>
        <p>
            <span>FrontEnd : </span>
            <!-- React -->
            <img src = "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=white" valign = "middle" />&nbsp
            <!-- Flutter -->
            <img src = "https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" valign = "middle" />&nbsp
        </p>
    </li>
    <!-- BackEnd -->
    <li>
        <p>
            <span>BackEnd : </span>
            <!-- Spring Boot -->
            <img src = "https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" valign = "middle" />&nbsp
            <!-- JPA -->
            <img src="https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white" valign = "middle" />&nbsp
            <!-- JWT -->
            <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" valign = "middle" />&nbsp
        </p>
    </li>
    <!-- DataBase -->
    <li>
        <p>
            <span>DataBase & Cache : </span>
            <!-- MySQL -->
            <img src = "https://img.shields.io/badge/MySQL-0175C2?style=for-the-badge&logo=mysql&logoColor=white&bgColor=blue" valign = "middle" />&nbsp
            <!-- Redis -->
            <img src = "https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white" valign = "middle" />&nbsp
        </p>
    </li>
    <!-- IDE -->
    <li>
        <p>
            <span>IDE : </span>
            <!-- IntelliJ IDEA -->
            <img src = "https://img.shields.io/badge/IntelliJ_IDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white" valign = "middle" />&nbsp
            <!-- Android Studio -->
            <img src = "https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white" valign = "middle" />&nbsp
            <!-- Visual Studio Code -->
            <img src = "https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" valign = "middle" />&nbsp
        </p>
    </li>
    <li>
        <p>
            <span>기획서 & 일정 관리 : </span>
            <!-- Google Sheets -->
            <img src = "https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white" valign = "middle" />&nbsp
        </p>
    </li>
</ul>
<h2>📌 시스템 아키텍처</h2>
<div>
    <img src = "docs/images/bloodmate_system_architecture.png" />
</div>
<h2>📌 ERD</h2>
<div>
    <img src = "docs/images/bloodmate_ERD.png" />
</div>
<h2>📌 주요 기능</h2>
<div>
    <!-- 사용자 인증 -->
    <ul>
        <li><strong>사용자 인증</strong></li>
        <ul>
            <li>JWT 기반 로그인/로그아웃</li>
            <li>Redis를 활용한 토큰 관리 및 중복 로그인 방지</li>
        </ul>
    </ul>
    <!-- HBA1C/혈당/혈압 기록 관리 -->
    <ul>
        <li><strong>HBA1C/혈당/혈압 기록 관리</strong></li>
        <ul>
            <li>CRUD API 설계</li>
            <li>아침/점심/저녁/운동 전후등 측정 상황 분류</li>
        </ul>
    </ul>
    <!-- 대시보드 -->
    <ul>
        <li><strong>대시보드</strong></li>
        <ul>
            <li>측정 상황에 따라 최근 측정 값, 평균/최소/최대 값 조회 API</li>
            <li>최근 공지 게시물 출력</li>
        </ul>    
    </ul>
    <!-- 게시물 -->
    <ul>
        <li><strong>게시물</strong></li>
        <ul>
            <li>공지/자유/혈당/혈압 등 카테고리별 게시글 관리 API</li>
            <li>노령 사용자를 위한 버튼식 게시물 Read</li>
        </ul>
    </ul>
</div>

<img src = "https://capsule-render.vercel.app/api?type=waving&color=0:A097D4,100:DED9F4&height=200&section=footer">
