# MongoDB Data Model(JSON)



## Users

```json
"user" : {
	"email" : "test@test.com",
    "password" : "암호화된 패스워드",
    "nickname" : "test",
    "epubListId" : [
		"epub id",
		"epub id"
	]
}
```



## Epubs

```json
"epub" : {
	 "_id" : "고유 epub id",
	 "userId" : "참조된 사용자 id",
     "epubname" : "팀이란 무엇인가",
     "fileList" : [
          {
               "type" : "text",
               "fileName" : "a.xhtml",
                "dataLocation" : "/data/html",
                "epubLocation" : "/html"
          },
          {
                "type" : "image",
                "fileName" : "b.png",
                 "dataLocation" : "/data/image",
                 "epubLocation" : "/image"
          }
     ]
}

 "epubList" : [
        {
            "epubName" : "팀이란 무엇인가",
            "fileList" : [
                {
                    "type" : "text",
                    "fileName" : "a.xhtml",
                    "dataLocation" : "/data/html",
                    "epubLocation" : "/html"
                },
                {
                    "type" : "image",
                    "fileName" : "b.png",
                    "dataLocation" : "/data/image",
                    "epubLocation" : "/image"
                }
            ]
        },
        {
            "epubName" : "리눅스 프로그래밍",
            "fileList" : [
                {
                    "type" : "text",
                    "fileName" : "a.xhtml",
                    "dataLocation" : "/data/html",
                    "epubLocation" : "/html"
                },
                {
                    "type" : "sound",
                    "fileName" : "b.mp3",
                    "dataLocation" : "/data/sound",
                    "epubLocation" : "/sound"
                }
            ]
        }
    ]
```



## Files

```json
"file" : {
	 "type" : "text",
     "fileName" : "a.xhtml",
     "dataLocation" : "/data/html",
     "epubLocation" : "/html",
	 "epubId" : "소속된 epub id"
},
{
     "type" : "sound",
     "fileName" : "b.mp3",
     "dataLocation" : "/data/sound",
     "epubLocation" : "/sound",
	 "epubId" : "소속된 epub id"
}.
{
     "type" : "image",
     "fileName" : "b.png",
     "dataLocation" : "/data/image",
     "epubLocation" : "/image",
	 "epubId" : "소속된 epub id"
}
```