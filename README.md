## LOGIN API 
| ENDPOINTS | METHOD | ACTION |
| :--------- | :--------- | :--------- |
| /api/auth/signin | POST | User login. Returns authentication token on successful login |
| /api/auth/signup | POST | User registration. Creates a new user account |
| /api/auth/change-password/:id | PUT | Change the password of the user identified by :id. Requires authentication |
| /api/auth/users/:id | GET | Get user details by :id |

## LEARNING CONTENT API 
| ENDPOINTS | METHOD | ACTION |
| :--------- | :--------- | :--------- |
| /api/contents | GET | Get all learning contents |
| /api/contents/store | POST | Store new learning content. Creates a new learning resource |
| /api/contents/:id | GET | Get learning content by :id. Retrieves details of a specific learning resource |
| /api/contents/update/:id | PATCH | Update learning content identified by :id. Modifies existing learning resource details |
| /api/contents/delete/:id | DELETE | Delete learning content identified by :id. Removes a learning resource |

## QUIZ API 
| ENDPOINTS | METHOD | ACTION |
| :--------- | :--------- | :--------- |
| /api/quizzes | GET | Get all quizzes |
| /api/quizzes/store | POST | Store a new quiz. Creates a new quiz resource |
| /api/quizzes/:id | GET | Get quiz details by :id. Retrieves details of a specific quiz |
| /api/quizzes/update/:id | PATCH | Update quiz identified by :id. Modifies existing quiz details |
| /api/quizzes/delete/:id | DELETE | Delete quiz identified by :id. Removes a quiz |

## ARTICLE API 
| ENDPOINTS | METHOD | ACTION |
| :--------- | :--------- | :--------- |
| /api/articles | GET | Get all articles |
| /api/articles/store | POST | Store a new article. Creates a new article resource |
| /api/articles/:id | GET | Get article details by :id. Retrieves details of a specific article |
| /api/articles/update/:id | PATCH | Update article identified by :id. Modifies existing article details |
| /api/articles/delete/:id | DELETE | Delete article identified by :id. Removes an article |

## SUNDANESE WORD API 
| ENDPOINTS | METHOD | ACTION |
| :--------- | :--------- | :--------- |
| /api/sundaneses | GET | Get all Sundanese words |
| /api/sundaneses/store | POST | Store a new Sundanese word. Creates a new Sundanese word resource |
| /api/sundaneses/:id | GET | Get Sundanese word details by :id. Retrieves details of a specific Sundanese word |
| /api/sundaneses/update/:id | PATCH | Update Sundanese word identified by :id. Modifies existing Sundanese word details |
| /api/sundaneses/delete/:id | DELETE | Delete Sundanese word identified by :id. Removes a Sundanese word |


## JAVANESE WORD API 
| ENDPOINTS | METHOD | ACTION |
| :--------- | :--------- | :--------- |
| /api/javaneses | GET | Get all Javanese words |
| /api/javaneses/store | GET | Store a new Javanese word. Creates a new Javanese word resourcD |
| /api/javaneses/:id | GET | Get Javanese word details by :id. Retrieves details of a specific Javanese word |
| /api/javaneses/update/:id | GET | Update Javanese word identified by :id. Modifies existing Javanese word details |
| /api/javaneses/delete/:id | GET | Delete Javanese word identified by :id. Removes a Javanese word |