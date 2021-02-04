---
typora-copy-images-to: ./
---

# Editor 기능 설명서

## 상단 메뉴바

### 파일

#### 새 E-BOOK 생성

새로운 E-BOOK 생성하여 작업할 수 있습니다

1. ##### 파일 탭 > 새 E-BOOK 생성 클릭

![image-20210201133438583](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201133438583-1612427898565.png)



2. ##### 새로 만들 E-BOOK 에 대한 정보를 입력합니다

   1. E-BOOK Title : 새 E-BOOK의 제목을 의미하며, 작성한 Title로 폴더가 생각됩니다.
   2. 위치 선택 :  새 E-BOOK을 생성할 위치를 설정합니다. 설정된 위치에 기본 ePUB 디렉토리가 생성됩니다.
   3. E-BOOK Image : 새 E-BOOK 의 표지 이미지를 의미합니다. E-BOOK image를 선택하지 않고 기본 이미지로 저장 버튼을  클릭 시, 옆에 안내문구가 나오며 미리 제작된 기본 이미지로 E-BOOK이 생성됩니다. 

![image-20210201132651358](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201132651358.png)

![image-20210201134212670](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201134212670.png)

> E-BOOK Title : __Editor User Guide__
>
> 위치 선택 : __바탕화면 __
>
> E-Book Image :  __기본 이미지로 저장__



3. ##### save 버튼 클릭 시, 새 E-BOOK 이 생성됩니다. 

![image-20210201134507507](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201134507507.png)



> __생성 성공시 화면__
>
> ![image-20210201134622740](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201134622740.png)
>
> 







#### E-BOOK 불러오기

기존에 작성한  E-BOOK과 구매한 E-BOOK를 불러와서 편집이 가능합니다. 

1. __E-BOOK 불러오기 클릭__

![image-20210201135142066](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201135142066.png)



2. __E-PUB 폴더 선택 <저작권 추후 수정요망>__

![image-20210201135359040](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201135359040.png)



>  불러오기 성공 화면
>
> ![image-20210201135424075](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201135424075.png)





#### 저장하기

저장하기 버튼 클릭 시, 작성한 EBOOK을 기존의 디렉토리에 저장합니다. 

![image-20210201135926269](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201135926269.png)





#### E-BOOK 미리보기

작성 중인 페이지를 미리보기로 확인이 가능합니다. 

![image-20210201140727165](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201140727165.png)\



>  __미리보기 화면__
>
> ![image-20210201140630585](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201140630585.png)





#### E_PUB으로 내보내기

작성한 E-BOOK 파일은 다른 E-BOOK 리더기에서 읽을 수 있도록 E-PUB 파일로 내보내기를 지원합니다.

 

1. __ePUB으로 내보내기 클릭__

![image-20210201140936343](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201140936343.png)



2. __내보낼 ePUB 파일의 이름을 작성합니다__

![image-20210201141036440](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201141036440.png)



3. __ePUB 파일 위치 선택__

![image-20210201141731145](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201141731145.png)



> __저장 성공 화면 __
>
> 확인 버튼 시, 저장했던 폴더 창이 뜹니다
>
> ![image-20210201163546911](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201163546911.png)



#### 챕터 추가하기

E-BOOK에서 챕터를 추가하는 기능입니다. 챕터 추가할 경우, 1번부터 순차적으로 증가하며 챕터가 추가됩니다. 

![image-20210201163808637](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201163808637.png)



![image-20210201163654826](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201163654826.png)



> __추가 완료 화면__
>
> ![image-20210201164100921](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201164100921.png)



디렉토리 > EPUB > text 에서 추가된 챕터 확인이 가능합니다.

![image-20210201164141619](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201164141619.png)











### 편집

#### 취소하기 redo / 되돌리기 undo

태그 추가 포함하여 되돌리기 및 취소하기를 지원합니다. 

#### 잘라내기 / 복사/ 붙여넣기

프로그램 외에서 복사한 항목의 붙여넣기를 지원합니다. 

![image-20210201164544850](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201164544850.png)

#### 찾기

xhtml 내용 중에서 찾고자하는 단어를 입력하면 위치를 확인할 수 있다. 

![image-20210201203015505](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201203015505.png)



#### 바꾸기

찾은 단어를 원하는 단어로 변경이 가능합니다. 

- All  체크 시, 찾은 모든 단어를 변경합니다
- Aa 체크 시, 대소문자 구별 없이 변경합니다. 

![image-20210201203135760](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201203135760.png)





### 도구상자

#### 드래그 후 클릭

##### h1/ h2/ h3/ h4/ h5 

제목을 의미하며, h1이 가장 큰 제목이며, h4가 가장 작은 제목이다. 

효과를 넣은 문자를 드래그하고 버튼을 누르면 효과가 적용된다. 

![image-20210201203505387](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201203505387.png)

>  __st에 대해 h6태그를 적용한 결과__
>
> ![image-20210201205017588](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201205017588.png)



##### Italic : 기울림 효과

```<em>```태그

##### P : enter 효과

##### Line : 가로선 추가

##### Blockquote : 

##### Cite : 

##### Bold : 글자 진하게 효과

##### Underline : 글자 아래 줄 효과

##### Mediumline : 글자 중앙 줄 효과

##### Subscript :

##### Superscript : 

![image-20210201212507836](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201212507836.png)



#### 클릭 후 기입

##### UnorderedList : 글머리기호

버튼 클릭 후 생성되는 <li> 태그 내에 내용을 입력합니다.

![image-20210201212630469](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201212630469.png)

>  __결과__
>
> ![image-20210201212736010](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201212736010.png)



##### OrderedList : 숫자 번호 기호

버튼 클릭 후 생성되는 <li> 태그 내에 내용을 입력합니다. 

![image-20210201212933851](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201212933851.png)



> __결과__
>
> ![image-20210201212953038](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201212953038.png)



#### IMAGES

1. __IMAGES 버튼 클릭__

![image-20210201213108185](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201213108185.png)

2. __원하는 사진 선택 __

   ![image-20210201213405367](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201213405367.png)

3. __파일에 경로로 이미자파일 삽입__

   ![image-20210201213711764](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201213711764.png)



#### LINK

1. 하이퍼링크를 삽입할 단어 드래그

2. LINK 버튼 클릭

   ![image-20210201213904646](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201213904646.png)

3. __링크 삽입__

   ![image-20210201213943183](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201213943183.png)



#### TABLE

1. __테이블 버튼 클릭 __

   ![image-20210201214124688](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201214124688.png)

2. __만들 표의 행과 열을 입력__

   ![image-20210201214219916](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201214219916.png)

3. __표생성 완료__

   ![image-20210201214243645](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201214243645.png)

   > __결과__
   >
   > ![image-20210201214317881](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201214317881.png)





## 디렉토리 / 목차

버튼 클릭 시, 목차와 디렉토리로 내용이 변경되어 보여진다.

버튼 안의 내용은 현재 내용을 의미한다. 

​	![image-20210201215405424](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201215405424.png)



​		![image-20210201215255111](C:\Users\user\Documents\GIT\s04p13a103\epub_editor\src\assets\manual\assets\image-20210201215255111.png)

