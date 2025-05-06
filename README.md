# POPI 관리자 페이지

## 소개

- 해당 프로젝트는 팝업 스토어 관리자를 위한 웹 애플리케이션으로, 팝업 스토어 생성, 대쉬 보드, 상품 관리 등의 기능을 제공합니다.
- 프로젝트는 React와 TypeScript를 기반으로 구축되었습니다.

---

## 기술 스택

#### 핵심 기술

<img src="https://img.shields.io/badge/React 18-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">

#### 개발 환경

<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">

#### UI 컴포넌트 및 디자인

<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white"> <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=Framer&logoColor=white">

#### 상태 관리 및 API 통신

<img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">

#### 페이지 라우팅

<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white">

#### 테스트 도구

<img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=Vitest&logoColor=white"> <img src="https://img.shields.io/badge/Testing Library-E33332?style=for-the-badge&logo=TestingLibrary&logoColor=white">

#### 개발 생산성 및 품질 관리

<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=black"> <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=Storybook&logoColor=white"> <img src="https://img.shields.io/badge/Mock Service Worker-FF6A33?style=for-the-badge&logo=MockServiceWorker&logoColor=white">

#### 프로젝트 관리 도구

<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white"> <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"> <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white">

---

## 프로젝트 구조

```
FE-Manager
 ┣ .storybook             # Storybook 설정
 ┣ public                 # 정적 파일
 ┣ src
 ┃ ┣ apis                 # HTTP API 정의
 ┃ ┣ assets               # 이미지, 폰트 등 자산
 ┃ ┣ components           # 재사용 가능한 컴포넌트
 ┃ ┣ constants            # 상수 데이터 정의
 ┃ ┣ hooks                # 커스텀 훅
 ┃ ┣ mocks                # MSW Handler 관리
 ┃ ┣ pages                # 페이지 컴포넌트
 ┃ ┣ router               # 라우팅 정보 관리
 ┃ ┣ stores               # Zustand 상태 저장소
 ┃ ┣ types                # TypeScript 타입 정의
 ┃ ┣ utils                # 유틸리티 함수
 ┃ ┣ App.tsx              # 루트 컴포넌트
 ┃ ┗ main.tsx             # 앱 엔트리 포인트
 ┣ vitest.config.ts       # Vitest 설정
 ┣ vitest.storybook.config.ts # Storybook 테스트 설정
 ┗ vite.config.ts         # Vite 설정
```

## Ground Rule

- 이미지, 커스텀 훅 (use...), 프로젝트 설정 파일, README를 제외한 모든 파일은 카멜 케이스를 사용하여 정의합니다.
- 디렉토리는 파스칼 케이스를 사용해서 정의합니다.
