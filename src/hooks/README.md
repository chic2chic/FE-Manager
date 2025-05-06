## 💡 hooks 디렉토리입니다

---

커스텀 훅들을 관리하는 디렉토리입니다.

### 주요 내용

- `@/hooks/api/` : React Query를 관리합니다. 서버 상태 관리를 목적으로 합니다.
- 여러개의 쿼리가 있다면, 모듈화해서 export 시킵니다.
- 구현 예시는 다음과 같습니다.

```ts
export const usePopUpCreateApi = () => {
  const getPresignedUrlMutation = useMutation({
    mutationFn: getPresignedUrl,
    onSuccess: response => {
      return response.data;
    },
    onError: error => {
      throw new Error(`PresignedUrl 발급 에러 : ${ErrorMessage(error)}`);
    },
  });

  const uploadImgToS3Mutation = useMutation({
    mutationFn: uploadImageToS3,
    onSuccess: responseStatus => {
      return responseStatus === 200;
    },
    onError: error => {
      throw new Error(`이미지 S3 업로드 에러 : ${ErrorMessage(error)}`);
    },
  });

  const popUpCreateMutation = useMutation({
    mutationFn: postPopUpCreate,
    onSuccess: response => response.data,
    onError: error => {
      throw new Error(`팝업 생성 에러 : ${ErrorMessage(error)}`);
    },
  });

  return {
    getPresignedUrlMutation,
    uploadImgToS3Mutation,
    popUpCreateMutation,
  };
};
```

- `@/hooks/` : 최대한 기능 중심으로 구현된 커스텀 훅들을 관리합니다.

### Naming Conventions

- 파일명은 `use`로 시작하도록 구현합니다. 이때, 파일명과 함수명을 동일하게 구현합니다.
- `@/hooks/api`안에 구현된 React Query들은 마지막 suffix로 `Api` 를 추가합니다.
