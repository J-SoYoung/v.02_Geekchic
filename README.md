# v.02_Geekchic
- Vite + React + TypeScript + firebase 프로젝트
- 제작 기간 : 2024.09.01 - 2024.10. 

## 프로젝트 목표 
v.01_Geekchic프로젝트에서 아쉬웠던 부분을 리팩터링 하는 내용으로 프로젝트 주제를 잡았습니다. 큰 내용은 아래와 같습니다. 

| 리팩터링 주제 | 상세 내용 |
| --- | --- |
| 개발 순서 | • 기본 데이터 형식 인지<br>• 전체적인 페이지 및 기능 요약<br>• 각 페이지 구현 시 세부 사항 미리 설계 후 진행 |
| 함수/변수 네이밍, 폴더구조, 타입설정 | • 함수, 변수명 통일성 있게 짓기<br>• 폴더별 컴포넌트 구조 나누기<br>• 중복타입 제거, string 타입 말고 구체화하기 |
| database 구조 및 데이터 관리 | • 유저 데이터 DB 새로 만들기 ( message, sales, orders, carts )<br>• 로드 하는 데이터 최신순 정렬하기<br>• react-query로 데이터 관리하기 |
| 컴포넌트  | • 기본 컴포넌트 만들기 ( 원자컴포넌트!!!! )<br>• 컴포넌트 더 분리하기<br>• 공통 컴포넌트 사용하기<br>• 유효성 검사하기 ( react-form ) |
| 최적화하기 | • 라이트 하우스를 이용하여 현재 프로젝트에서 로딩, 렌더링 최적화하기 <br>• React.memo, useMemo, lazy loading, suspense, code-split 활용해보기<br>|


## 블로그 포스팅 
![2-11-hi ka](https://github.com/user-attachments/assets/413f05fa-7397-4d76-9ef8-4a5f339ca860)

- [:memo: 나의 첫 리팩토링 도전기 - 폴더 구조부터 정리하자!](https://github.com/J-SoYoung/J-SoYoung.github.io/blob/main/_posts/2024-09-07-TIL.markdown)
- [:memo: 코드는 자란다: v2로 업로드 페이지 진화기](https://github.com/J-SoYoung/J-SoYoung.github.io/blob/main/_posts/2024-09-11-TIL.markdown)
- [:memo: 댓글을 제품에서 탈출시키다: Geekchic v2의 댓글 독립 선언!](https://github.com/J-SoYoung/J-SoYoung.github.io/blob/main/_posts/2024-09-16-TIL.markdown)
- [:memo: 쪽지 보내기 기능하나에 이렇게 많은 고민이?? Firebase와 React로 쪽지 기능 완성하기](https://github.com/J-SoYoung/J-SoYoung.github.io/blob/main/_posts/2024-09-17-TIL.markdown)
