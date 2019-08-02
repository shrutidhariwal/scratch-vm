const randomInt = require('random-int');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const random = require('math-random');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGwtb3BhY2l0eTowO30KCS5zdDF7ZmlsbDojRkZGRkZGO3N0cm9rZTojMDcwNzA3O3N0cm9rZS13aWR0aDo1O3N0cm9rZS1taXRlcmxpbWl0OjEwO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTAsMGg1MTJ2NTEySDBWMHoiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwwKSI+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTM4LjgsMzUuM2wtMTEwLjEsNzlsOTUuOCwyOS4xbDExMS4zLTg3LjFMMTM4LjgsMzUuM0wxMzguOCwzNS4zeiBNMjUxLjgsNjYuNGwtMTE4LDkwbDUxLjEsMTMxLjFsOC41LTcuNQoJCWw0LjItMTUuN2MtNS45LTMuOC05LjctMTIuMy05LjEtMjAuNGMwLjYtNy45LDUuMS0xMy41LDExLTEzLjdjMS4yLDAsMi40LDAuMSwzLjYsMC41YzEuMSwwLjQsMi4xLDAuOSwzLjEsMS41bDcuOS0yOS41CgkJYzAuMS0wLjQsMC4yLTAuNywwLjQtMWMwLDAsMC0wLjEsMC4xLTAuMWMwLjEtMC4yLDAuMi0wLjUsMC4zLTAuN2MwLTAuMSwwLjEtMC4xLDAuMS0wLjJjMC4xLTAuMiwwLjItMC40LDAuNC0wLjYKCQljMC4yLTAuMiwwLjMtMC41LDAuNS0wLjdjMCwwLDAsMCwwLjEtMC4xYzAuMi0wLjIsMC40LTAuNCwwLjUtMC42YzAuMi0wLjIsMC40LTAuNCwwLjYtMC42bDAsMGMwLjEtMC4xLDAuMy0wLjIsMC41LTAuMwoJCWMwLjEtMC4xLDAuMi0wLjEsMC4zLTAuMmMwLjItMC4xLDAuMy0wLjIsMC41LTAuM2MwLjEtMC4xLDAuMi0wLjEsMC4zLTAuMmMwLjEtMC4xLDAuMy0wLjEsMC40LTAuMmMwLjEtMC4xLDAuMy0wLjEsMC40LTAuMgoJCWMwLjEtMC4xLDAuMy0wLjEsMC40LTAuMmMwLjEtMC4xLDAuMy0wLjEsMC40LTAuMWMwLjEsMCwwLjMtMC4xLDAuNC0wLjFjMC4yLDAsMC4zLTAuMSwwLjUtMC4xczAuMy0wLjEsMC41LTAuMQoJCWMwLjEsMCwwLjIsMCwwLjQtMC4xbDAsMGwwLDBsMzMuNi0yLjljMS42LTUuOCw1LjUtOS42LDEwLjMtOS44YzEuMiwwLDIuNCwwLjEsMy42LDAuNWMzLjMsMS4xLDYuMywzLjcsOC41LDcuM2wxMy0xLjFMMjUxLjgsNjYuNAoJCUwyNTEuOCw2Ni40eiBNMTM3LjIsNzRjOC43LDAuMiwxNC4xLDMuOCwxMi44LDguN2MtMS41LDUuNy0xMS4zLDExLjEtMjEuOSwxMnMtMTguMS0yLjktMTYuNi04LjZsMCwwYzEuNS01LjcsMTEuMy0xMS4xLDIxLjktMTIKCQlsMCwwQzEzNC44LDc0LDEzNiw3NCwxMzcuMiw3NEwxMzcuMiw3NHogTTIzNy41LDk3LjVMMjM3LjUsOTcuNWMxLjIsMCwyLjQsMC4xLDMuNiwwLjVjNy40LDIuNCwxMi44LDEyLjIsMTIuMSwyMS45CgkJcy03LjIsMTUuNi0xNC42LDEzLjJsMCwwYy03LjQtMi40LTEyLjgtMTIuMi0xMi4xLTIxLjlsMCwwQzIyNywxMDMuNCwyMzEuNSw5Ny44LDIzNy41LDk3LjVMMjM3LjUsOTcuNXogTTI0LjIsMTMxLjdsNDcsMTE0LjEKCQlsOTQuMiw0MC40bC00Ni0xMjUuNkwyNC4yLDEzMS43TDI0LjIsMTMxLjd6IE0xNzIuMSwxNDkuMWMxLjIsMCwyLjQsMC4xLDMuNiwwLjVjNy40LDIuNCwxMi44LDEyLjIsMTIuMSwyMS45cy03LjIsMTUuNi0xNC42LDEzLjIKCQlsMCwwYy03LjQtMi40LTEyLjgtMTIuMi0xMi4xLTIxLjlDMTYxLjcsMTU1LDE2Ni4yLDE0OS40LDE3Mi4xLDE0OS4xTDE3Mi4xLDE0OS4xeiBNOTcsMTYyLjJjNS4xLTAuMywxMi41LDYuMiwxNywxNS4xCgkJYzQuOCw5LjUsNC42LDE4LjItMC40LDE5LjVsMCwwYy01LjEsMS4zLTEzLjEtNS40LTE3LjktMTQuOXMtNC42LTE4LjIsMC40LTE5LjVDOTYuMywxNjIuMiw5Ni43LDE2Mi4yLDk3LDE2Mi4yTDk3LDE2Mi4yegoJCSBNMzYwLjQsMjAyLjRMMjQ4LjMsMjEyTDM2MiwyOTEuOWwxMTMuNi0xN0wzNjAuNCwyMDIuNEwzNjAuNCwyMDIuNHogTTcwLjgsMjEyYzUuMS0wLjMsMTIuNSw2LjIsMTcsMTUuMQoJCWM0LjgsOS41LDQuNiwxOC4yLTAuNCwxOS41Yy01LjEsMS4zLTEzLjEtNS40LTE3LjktMTQuOXMtNC42LTE4LjIsMC40LTE5LjVDNzAuMiwyMTIuMSw3MC41LDIxMiw3MC44LDIxMkw3MC44LDIxMnogTTIyOC4yLDIxOS44CgkJTDE4Ni43LDM3NGwxMTUuNiw5OS41TDM0OS40LDMwNUwyMjguMiwyMTkuOEwyMjguMiwyMTkuOHogTTM1NS4yLDIzMWM2LjMsMC4xLDEzLjcsMS45LDE5LjcsNC44YzEwLjEsNC44LDEzLjUsMTEuMiw3LjYsMTQuMmwwLDAKCQljLTUuOSwzLjEtMTguOCwxLjYtMjguOS0zLjJsMCwwYy0xMC4xLTQuOC0xMy41LTExLjItNy42LTE0LjJDMzQ4LjEsMjMxLjUsMzUxLjMsMjMwLjksMzU1LjIsMjMxTDM1NS4yLDIzMXogTTQ4Ny44LDI5MS4zCgkJbC0xMjAuOSwxOGwtNDYuOCwxNjcuM2wxMTYuMy0zMS44TDQ4Ny44LDI5MS4zeiBNMzA2LDMwMi4xYzEuNCwwLDIuOCwwLjMsNC4yLDAuOWM4LjYsMy44LDE0LjMsMTgsMTIuOSwzMS43bDAsMAoJCWMtMS40LDEzLjctOS42LDIxLjctMTguMSwxNy45Yy04LjYtMy44LTE0LjMtMTgtMTIuOS0zMS43bDAsMEMyOTMuMywzMDkuOCwyOTksMzAyLjEsMzA2LDMwMi4xeiBNNDYwLjEsMzEzLjcKCQljMy4zLTAuMSw2LDEuNCw3LjcsNC4xYzQuMiw2LjgsMS40LDE5LjUtNi4yLDI4LjRzLTE3LjEsMTAuNy0yMS4zLDMuOWMtNC4yLTYuOC0xLjQtMTkuNSw2LjItMjguNAoJCUM0NTAuNiwzMTYuOCw0NTUuNiwzMTMuOSw0NjAuMSwzMTMuN0w0NjAuMSwzMTMuN3ogTTM5MS40LDMyNC40YzMuMy0wLjEsNiwxLjQsNy43LDQuMWM0LjIsNi44LDEuNCwxOS41LTYuMiwyOC40CgkJcy0xNy4xLDEwLjctMjEuMywzLjljLTQuMi02LjgtMS40LTE5LjUsNi4yLTI4LjRDMzgxLjksMzI3LjUsMzg3LDMyNC41LDM5MS40LDMyNC40TDM5MS40LDMyNC40eiBNMjE3LjQsMzM3LjcKCQljMS40LDAsMi44LDAuMyw0LjIsMC45YzguNiwzLjgsMTQuMywxOCwxMi45LDMxLjdsMCwwYy0xLjQsMTMuNy05LjYsMjEuNy0xOC4xLDE3LjlsMCwwYy04LjYtMy44LTE0LjMtMTgtMTIuOS0zMS43bDAsMAoJCUMyMDQuNywzNDUuNCwyMTAuMywzMzcuNywyMTcuNCwzMzcuN0wyMTcuNCwzMzcuN3ogTTQyOS42LDM5OC42YzMuMy0wLjEsNiwxLjQsNy43LDQuMWM0LjIsNi44LDEuNCwxOS41LTYuMiwyOC40CgkJcy0xNy4xLDEwLjctMjEuMywzLjljLTQuMi02LjgtMS40LTE5LjUsNi4yLTI4LjRDNDIwLjIsNDAxLjcsNDI1LjIsMzk4LjcsNDI5LjYsMzk4LjZMNDI5LjYsMzk4LjZ6IE0zNTkuMyw0MTguMQoJCWMzLjMtMC4xLDYsMS40LDcuNyw0LjFjNC4yLDYuOCwxLjQsMTkuNS02LjIsMjguNHMtMTcuMSwxMC43LTIxLjMsMy45bDAsMGMtNC4yLTYuOC0xLjQtMTkuNSw2LjItMjguNAoJCUMzNDkuOSw0MjEuMSwzNTQuOSw0MTguMiwzNTkuMyw0MTguMUwzNTkuMyw0MTguMXoiLz4KPC9nPgo8L3N2Zz4K';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSJ0cmFuc3BhcmVudCIgZmlsbC1vcGFjaXR5PSIwIj48L3BhdGg+PGcgY2xhc3M9IiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwwKSIgc3R5bGU9InRvdWNoLWFjdGlvbjogbm9uZTsiPjxwYXRoIGQ9Ik0xMzguNzk4IDM1LjM0MkwyOC43MyAxMTQuMjY4bDk1Ljc3NyAyOS4wOTUgMTExLjMwNS04Ny4wOS05Ny4wMTQtMjAuOTN6bTExMi45ODYgMzEuMDgybC0xMTguMDQ3IDg5Ljk2IDUxLjA3IDEzMS4xMDIgOC41MzQtNy40NTUgNC4yMy0xNS43MDhhMTguMzM4IDEzLjEwMiA3Ni44NjMgMCAxLTkuMDgtMjAuNDUgMTguMzM4IDEzLjEwMiA3Ni44NjMgMCAxIDEwLjk5Ny0xMy43MjcgMTguMzM4IDEzLjEwMiA3Ni44NjMgMCAxIDMuNjIuNTMgMTguMzM4IDEzLjEwMiA3Ni44NjMgMCAxIDMuMTEzIDEuNTQ0bDcuOTQtMjkuNDhhOSA5IDAgMCAxIC4zNTMtMS4wNCA5IDkgMCAwIDEgLjA1OC0uMTI4IDkgOSAwIDAgMSAuMzItLjY4NSA5IDkgMCAwIDEgLjA5LS4xNTMgOSA5IDAgMCAxIC4zNy0uNjI1IDkgOSAwIDAgMSAuNTM0LS43MjMgOSA5IDAgMCAxIC4wNjYtLjA3NCA5IDkgMCAwIDEgLjU0LS41OTQgOSA5IDAgMCAxIC42NS0uNTkzIDkgOSAwIDAgMSAuMDA0LS4wMDIgOSA5IDAgMCAxIC40Ni0uMzQyIDkgOSAwIDAgMSAuMjY2LS4xOTcgOSA5IDAgMCAxIC41MDItLjMgOSA5IDAgMCAxIC4yNy0uMTU3IDkgOSAwIDAgMSAuNDQtLjIwOCA5IDkgMCAwIDEgLjM4LS4xNzggOSA5IDAgMCAxIC40MzctLjE1MiA5IDkgMCAwIDEgLjQxLS4xNDMgOSA5IDAgMCAxIC40MDQtLjEgOSA5IDAgMCAxIC40Ny0uMTE0IDkgOSAwIDAgMSAuNTEtLjA3IDkgOSAwIDAgMSAuMzctLjA1IDkgOSAwIDAgMSAuMDEgMCA5IDkgMCAwIDEgLjAxLS4wMDNsMzMuNjI0LTIuODczYTE4LjMzOCAxMy4xMDIgNzYuODYzIDAgMSAxMC4zMjYtOS43NzcgMTguMzM4IDEzLjEwMiA3Ni44NjMgMCAxIDMuNjIyLjUzIDE4LjMzOCAxMy4xMDIgNzYuODYzIDAgMSA4LjUyNyA3LjMyN2wxMy4wNDMtMS4xMTMtMzkuNDQyLTEyMy43ODN6TTEzNy4yNSA3NC4wM2E5LjggMTkuNzcgNzcuOTE2IDAgMSAxMi43OTggOC43MzQgOS44IDE5Ljc3IDc3LjkxNiAwIDEtMjEuOTM4IDExLjk5OCA5LjggMTkuNzcgNzcuOTE2IDAgMS0xNi41Ny04LjYwMiA5LjggMTkuNzcgNzcuOTE2IDAgMSAyMS45MzgtMTIgOS44IDE5Ljc3IDc3LjkxNiAwIDEgMy43Ny0uMTN6bTEwMC4yMjggMjMuNTE3YTE4LjMzOCAxMy4xMDIgNzYuODYzIDAgMSAuMDAyIDAgMTguMzM4IDEzLjEwMiA3Ni44NjMgMCAxIDMuNjIuNTMgMTguMzM4IDEzLjEwMiA3Ni44NjMgMCAxIDEyLjExMiAyMS45NCAxOC4zMzggMTMuMTAyIDc2Ljg2MyAwIDEtMTQuNjE3IDEzLjE5NiAxOC4zMzggMTMuMTAyIDc2Ljg2MyAwIDEtMTIuMTE0LTIxLjk0IDE4LjMzOCAxMy4xMDIgNzYuODYzIDAgMSAxMC45OTgtMTMuNzI2ek0yNC4yMiAxMzEuNzFsNDYuOTkyIDExNC4xMjQgOTQuMjM2IDQwLjM4LTQ1Ljk4OC0xMjUuNTctOTUuMjQtMjguOTM1em0xNDcuODg2IDE3LjQzYTE4LjMzOCAxMy4xMDIgNzYuODYzIDAgMSAzLjYyMi41MjggMTguMzM4IDEzLjEwMiA3Ni44NjMgMCAxIDEyLjExIDIxLjk0IDE4LjMzOCAxMy4xMDIgNzYuODYzIDAgMS0xNC42MTYgMTMuMTk3IDE4LjMzOCAxMy4xMDIgNzYuODYzIDAgMS0xMi4xMTItMjEuOTQgMTguMzM4IDEzLjEwMiA3Ni44NjMgMCAxIDEwLjk5Ni0xMy43MjZ6bS03NS4xMjMgMTMuMDE2YTE5LjQ1NCA5LjEzNCA1OS4yNTQgMCAxIDE2Ljk1NSAxNS4wNzggMTkuNDU0IDkuMTM0IDU5LjI1NCAwIDEtLjQyNSAxOS40ODVBMTkuNDU0IDkuMTM0IDU5LjI1NCAwIDEgOTUuNiAxODEuNzhhMTkuNDU0IDkuMTM0IDU5LjI1NCAwIDEgLjQyNC0xOS40OCAxOS40NTQgOS4xMzQgNTkuMjU0IDAgMSAuOTYtLjE0NHptMjYzLjM5MyA0MC4yMWwtMTEyLjEwMiA5LjU3NyAxMTMuNzYyIDc5LjkyNiAxMTMuNTk4LTE2Ljk1Ni0xMTUuMjU4LTcyLjU1ek03MC44MiAyMTIuMDIyQTE5LjQ1NCA5LjEzNCA1OS4yNTQgMCAxIDg3Ljc3NyAyMjcuMWExOS40NTQgOS4xMzQgNTkuMjU0IDAgMS0uNDI1IDE5LjQ4NCAxOS40NTQgOS4xMzQgNTkuMjU0IDAgMS0xNy45MTMtMTQuOTM4IDE5LjQ1NCA5LjEzNCA1OS4yNTQgMCAxIC40MjUtMTkuNDgyIDE5LjQ1NCA5LjEzNCA1OS4yNTQgMCAxIC45Ni0uMTR6bTE1Ny4zNzggNy44MTNMMTg2LjY2IDM3NC4wMjNsMTE1LjYxNiA5OS40NTQgNDcuMTQ3LTE2OC40Ny0xMjEuMjI1LTg1LjE3em0xMjYuOTg3IDExLjE2OGEyMS43NiA4Ljg5OCAxNS4yNjcgMCAxIDE5LjY5MyA0Ljc4MyAyMS43NiA4Ljg5OCAxNS4yNjcgMCAxIDcuNjA3IDE0LjI0NCAyMS43NiA4Ljg5OCAxNS4yNjcgMCAxLTI4Ljg4Ni0zLjE4MiAyMS43NiA4Ljg5OCAxNS4yNjcgMCAxLTcuNjEtMTQuMjQ0IDIxLjc2IDguODk4IDE1LjI2NyAwIDEgOS4xOTUtMS42ek00ODcuNzggMjkxLjNMMzY2LjkgMzA5LjM0M2wtNDYuODIzIDE2Ny4zMTYgMTE2LjI5Ny0zMS43N0w0ODcuNzggMjkxLjN6bS0xODEuODA4IDEwLjhhMjUuODM0IDE1LjU3MyA4NC4yNzcgMCAxIDQuMjM4Ljk0MyAyNS44MzQgMTUuNTczIDg0LjI3NyAwIDEgMTIuODczIDMxLjcyIDI1LjgzNCAxNS41NzMgODQuMjc3IDAgMS0xOC4xMDUgMTcuODkzIDI1LjgzNCAxNS41NzMgODQuMjc3IDAgMS0xMi44NzQtMzEuNzIgMjUuODM0IDE1LjU3MyA4NC4yNzcgMCAxIDEzLjg2OC0xOC44MzZ6bTE1NC4wODYgMTEuNjM2YTEzLjIzNyAyMS45NiAyOC42MiAwIDEgNy42NzMgNC4xMyAxMy4yMzcgMjEuOTYgMjguNjIgMCAxLTYuMTc2IDI4LjQzNSAxMy4yMzcgMjEuOTYgMjguNjIgMCAxLTIxLjI4NyAzLjg3OCAxMy4yMzcgMjEuOTYgMjguNjIgMCAxIDYuMTc1LTI4LjQzNCAxMy4yMzcgMjEuOTYgMjguNjIgMCAxIDEzLjYxNi04LjAwOHpNMzkxLjM2MiAzMjQuNGExMy4yMzcgMjEuOTYgMjguNjIgMCAxIDcuNjcyIDQuMTMgMTMuMjM3IDIxLjk2IDI4LjYyIDAgMS02LjE3NiAyOC40MzUgMTMuMjM3IDIxLjk2IDI4LjYyIDAgMS0yMS4yODcgMy44NzcgMTMuMjM3IDIxLjk2IDI4LjYyIDAgMSA2LjE3Ny0yOC40MzQgMTMuMjM3IDIxLjk2IDI4LjYyIDAgMSAxMy42MTUtOC4wMDh6bS0xNzMuOTk2IDEzLjMwNWEyNS44MzQgMTUuNTczIDg0LjI3NyAwIDEgNC4yNC45NDUgMjUuODM0IDE1LjU3MyA4NC4yNzcgMCAxIDEyLjg3MiAzMS43MiAyNS44MzQgMTUuNTczIDg0LjI3NyAwIDEtMTguMTA2IDE3Ljg5NCAyNS44MzQgMTUuNTczIDg0LjI3NyAwIDEtMTIuODczLTMxLjcyIDI1LjgzNCAxNS41NzMgODQuMjc3IDAgMSAxMy44NjYtMTguODR6bTIxMi4yNzggNjAuODdhMTMuMjM3IDIxLjk2IDI4LjYyIDAgMSA3LjY3IDQuMTMgMTMuMjM3IDIxLjk2IDI4LjYyIDAgMS02LjE3NCAyOC40MzQgMTMuMjM3IDIxLjk2IDI4LjYyIDAgMS0yMS4yODcgMy44NzYgMTMuMjM3IDIxLjk2IDI4LjYyIDAgMSA2LjE3NS0yOC40MzQgMTMuMjM3IDIxLjk2IDI4LjYyIDAgMSAxMy42MTYtOC4wMDh6bS03MC4zMzIgMTkuNDg4YTEzLjIzNyAyMS45NiAyOC42MiAwIDEgNy42NyA0LjEzMiAxMy4yMzcgMjEuOTYgMjguNjIgMCAxLTYuMTc0IDI4LjQzNCAxMy4yMzcgMjEuOTYgMjguNjIgMCAxLTIxLjI4NyAzLjg3NCAxMy4yMzcgMjEuOTYgMjguNjIgMCAxIDYuMTc2LTI4LjQzNCAxMy4yMzcgMjEuOTYgMjguNjIgMCAxIDEzLjYxNi04LjAwN3oiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PC9wYXRoPjwvZz48L3N2Zz4=';

class ChanceExtension {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */

        this.runtime = runtime;
    }

    /**
     * @return {object} This object's metadata.
     */
    getInfo() {

        this.dice = [];
        this.sidesInternal = ["1", "2", "3", "4", "5", "6"];
        this.blocks = [];
        //initializing
        this.addDiceObject('dice1');
        this.addDiceObject('dice2');
        this.setValue = function(currentDist, side, chance) {
            if (chance >= 100) {
                chance = 100.0;
            } else if (chance <= 0) {
                chance = 0.0;
            }
            let sliders = currentDist;
            let difference;

            // If the current dice does not have that many sides as the user is requesting:
            if (sliders.length <= side) {

                difference = -chance / 1.0;
                // Add as many 0's to the slider as needed.
                for (let i = 0; i < (side - sliders.length + 2); i++) {
                    sliders.push(0.0);
                }
                // If the distribution array is already long enough:
            } else {
                difference = sliders[side] - chance;
            }
            // Start editing the distribution values.
            let sumOfRest = 0;
            for (let i = 0; i < sliders.length; i++) {
                if (i !== side) {
                    sumOfRest += sliders[i];
                }
            }
            for (let i = 0; i < sliders.length; i++) {
                if (i !== side) {
                    if (sumOfRest === 0) {
                        sliders[i] = sliders[i] + (difference / (sliders.length - 1));

                    } else {
                        sliders[i] = sliders[i] + (difference * sliders[i] / sumOfRest);
                        if (sliders[i] < 0) {
                            sliders[i] = 0;
                        }
                    }
                }
            }

            sliders[side] = chance;
            return sliders;
        };
        this.addBlocks();
        return {

            id: 'chance', // Machine readable id of this extension.

            name: formatMessage({
                id: 'chance.categoryName',
                default: 'Chance',
                description: 'Name of the Chance extension.'
            }),
            blockIconURI: blockIconURI,
            menuIconURI: menuIconURI,
            blocks: this.blocks,
            menus: {
                diceMenu: {
                    items: 'getDiceMenu',
                    acceptReporters: true
                },

                sideMenu: {
                    items: 'getSideMenu',
                    acceptReporters: true
                },
                diceOptions: {
                    items: ['create', 'rename', 'delete']
                }
            }
        };
    }

    addBlocks() {

        this.blocks.push(

            {
                opcode: 'diceVal',
                blockType: BlockType.REPORTER,
                text: '[DICE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'dice1',
                        menu: 'diceMenu'
                    }
                }
            },

            {
                opcode: 'setDistribution',
                blockType: BlockType.COMMAND,
                text: 'set [DICE] sides to [DISTRIBUTION]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'dice1',
                        menu: 'diceMenu'
                    },
                    DISTRIBUTION: {
                        type: ArgumentType.SLIDER,
                        defaultValue: '16.666666,16.666666,16.666666,16.666666,16.666666,16.666666|1~2~3~4~5~6'
                    }
                }

            },

            //update dice reporters based on distribution
            {
                opcode: 'rollDice',
                blockType: BlockType.COMMAND,
                text: 'roll [DICE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'dice1',
                        menu: 'diceMenu'
                    }

                }
            },

            //check if dice roll is some value
            {
                opcode: 'ifDiceBool',
                blockType: BlockType.BOOLEAN,
                text: '[DICE] is [SIDE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'dice1',
                        menu: 'diceMenu'
                    },
                    SIDE: {
                        type: ArgumentType.STRING,
                        defaultValue: ' ',
                        menu: 'sideMenu'
                    }
                }
            }, {
                opcode: 'chanceOfReporter',
                blockType: BlockType.REPORTER,
                text: 'chance of [DICE] [SIDE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'dice1',
                        menu: 'diceMenu'
                    },
                    SIDE: {
                        type: ArgumentType.STRING,
                        defaultValue: ' ',
                        menu: 'sideMenu'
                    }
                }

            },
            // Block to set the chance of a particular side of a dice.
            {
                opcode: 'setChance',
                blockType: BlockType.COMMAND,
                text: 'set chance of [DICE] [SIDE] to [CHANCE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'dice1',
                        menu: 'diceMenu'
                    },
                    SIDE: {
                        type: ArgumentType.STRING,
                        defaultValue: ' ',
                        menu: 'sideMenu'
                    },
                    CHANCE: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 10
                    }
                }
            }, {
                opcode: 'changeChance',
                blockType: BlockType.COMMAND,
                text: 'change chance of [DICE] [SIDE] by [CHANCE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'dice1',
                        menu: 'diceMenu'
                    },
                    SIDE: {
                        type: ArgumentType.STRING,
                        defaultValue: ' ',
                        menu: 'sideMenu'
                    },
                    CHANCE: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 10
                    }
                }

            }, 

            {
                opcode: 'numberOfSides',
                blockType: BlockType.REPORTER,
                text: 'number of sides [DICE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: 'dice1',
                        menu: 'diceMenu'
                    }
                }
            },
            // Block to create new dice and rename or delete existing dice
            {
                opcode: 'diceFunc',
                blockType: BlockType.COMMAND,
                text: '[DICE_OPTIONS] [DICE] [NAME]',
                arguments: {
                    DICE_OPTIONS: {
                        type: ArgumentType.STRING,
                        defaultValue: 'create',
                        menu: 'diceOptions'
                    },
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: ' ',
                        menu: 'diceMenu'
                    },
                    NAME: {
                        type: ArgumentType.STRING,
                        defaultValue: 'dice3',
                    }
                }
            });
    }

    // Function to add dice with a given name
    addDiceObject(name) {
        this.dice.push({
            diceName: name,
            value: '1',
            strings: '1~2~3~4~5~6',
            distribution: '16.666666,16.666666,16.666666,16.666666,16.666666,16.666666'
        });
    }



    // Set dice menu dynamically
    getDiceMenu() {
        const diceItems = [];
        for (let i = 0; i < this.dice.length; i++) {
            diceItems.push(this.dice[i].diceName);
        }
        return diceItems;
    }

    // Set side menu based dynamically
    getSideMenu() {
        let sidesShow = [];
        this.sidesInternal.forEach(function(element, i) {
            sidesShow.push("(" + (i + 1) + ") " + element);
        });
        return sidesShow;
    }

    checkIfExists(value) {
        let index = this.dice.findIndex(item => item.diceName === value);
        return index;
    }

    diceFunc(args) {
        const dice = args.DICE;
        const name = args.NAME;
        const selected = args.DICE_OPTIONS;
        switch (selected) {

            case 'create':
                if (this.checkIfExists(name) === -1) {
                    this.addDiceObject(name);
                } else
                    alert("Dice named \"" + name + "\" already exists.");
                break;

            case 'rename':
                if (this.checkIfExists(dice) > -1) {
                    if (this.checkIfExists(name) === -1)
                        this.dice[this.checkIfExists(dice)].diceName = name;
                    else
                        alert("Dice named \"" + name + "\" already exists.");
                } else
                    alert("Select dice from the dropdown menu to rename to \"" + name + "\".");
                break;

            case 'delete':
                if (this.dice.length > 1) {
                    if (this.checkIfExists(dice) > -1)
                        this.dice.splice(this.checkIfExists(dice), 1);
                    else
                        alert("Select dice from the dropdown menu to delete.");
                } else
                    alert("Cannot delete \"" + dice + "\".");
                break;

            default:
                break;
        }
    }

    diceVal(args) {
        const i = this.checkIfExists(args.DICE);
        return this.dice[i].value;
    }

    // Set the distribution of dice.
    setDistribution(args) {
        const i = this.checkIfExists(args.DICE);
        let distribution = args.DISTRIBUTION;
        const splitted = distribution.split('|');
        
        const strings = splitted[1].split('~');
        // If user asked this dice to become random.
        if (splitted[0] === 'random') {
            let sumOfArray = 0.0;
            const numSliders = distribution.length;
            let newValue;
            const newArray = [];
            for (let j = 0; j < numSliders; j++) {
                newValue = Math.random();
                newArray.push(newValue);
                sumOfArray += newValue;
            }
            for (let j = 0; j < numSliders; j++) {
                newArray[j] = (newArray[j] / sumOfArray) * 100.0;
            }
            this.sidesInternal = strings;
            this.dice[i].distribution = newArray;
            this.dice[i].strings = strings;
        } else {
            distribution = JSON.parse('[' + splitted[0] + ']');
            this.sidesInternal = strings;
            this.dice[i].distribution = distribution;
            this.dice[i].strings = strings;
        }
        
    }

    rollDice(args) {
        const i = this.checkIfExists(args.DICE);
        let strings = this.dice[i].strings;
        let sliders = this.dice[i].distribution;
        let newValue;
        const sliderSums = [sliders[0]];
        for (let i = 1; i < sliders.length; i++) {
            sliderSums.push(sliderSums[sliderSums.length - 1] + sliders[i]);
        }
        const randomNumber = random() * 100.0;
        for (let i = 0; i < sliders.length; i++) {
            if (randomNumber <= sliderSums[i]) {
                newValue = strings[i];
                break;
            }
        }
        this.dice[i].value = newValue;
    }

    setChance(args) {
        const i = this.checkIfExists(args.DICE);
        let side;
        if (args.SIDE.toString().includes('(')) {
            side = parseInt(args.SIDE.split(')')[0].split('(')[1]) - 1;
        } else
            side = args.SIDE - 1;
            //side = this.dice.findIndex(item => item.value === args.SIDE);
        const chance = Cast.toNumber(args.CHANCE);
        let currentDist = this.dice[i].distribution;
        const final = this.setValue(currentDist, side, chance);
        this.dice[i].distribution = final;
    }

    changeChance(args) {
        const i = this.checkIfExists(args.DICE);
        let side;
        if (args.SIDE.toString().includes('(')) {
            side = parseInt(args.SIDE.split(')')[0].split('(')[1]) - 1;
        } else
            side = args.SIDE - 1;
            //side = this.dice.findIndex(item => item.value === args.SIDE);
        let chance = Cast.toNumber(args.CHANCE);
        const sliders = this.dice[i].distribution;
        let currentValue;
        if (side < sliders.length) {
            currentValue = sliders[side];
        } else {
            currentValue = 0.0;
        }
        chance += currentValue;
        const final = this.setValue(currentDist, side, chance);
        this.dice[i].distribution = final;
    }

    chanceOfReporter(args) {
        const i = this.checkIfExists(args.DICE);
        let side;
        if (args.SIDE.toString().includes('(')) {
            side = parseInt(args.SIDE.split(')')[0].split('(')[1]) - 1;
        } else
            side = args.SIDE - 1;
            //side = this.dice.findIndex(item => item.value === args.SIDE);
        const sliders = this.dice[i].distribution;
        if (side < sliders.length) {
            return Math.round(sliders[side]);
        }
        return 0;
    }

    ifDiceBool(args) {
        const i = this.checkIfExists(args.DICE);
        let side;
        if (args.SIDE.toString().includes('(')) {
            side = args.SIDE.split(' ')[1];
        } else
            side = args.SIDE - 1;
            //side = this.sidesInternal[this.dice.findIndex(item => item.value === args.SIDE)];
        return (side === this.dice[i].value);
    }

    // return number of sides in a dice to allow for easy iteration
    numberOfSides(args) {
        const i = this.checkIfExists(args.DICE);
        return this.dice[i].strings.length;
    }
}
module.exports = ChanceExtension;
