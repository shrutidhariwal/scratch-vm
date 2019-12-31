const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const {Random} = require('random-js');
const random = new Random();
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


class Scratch3ChanceBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */

        this.runtime = runtime;

        // dice
        this.runtime.dice = [];

        this.addDiceObject('sound dice', 'sound');
        this.addDiceObject('costume dice', 'costume');
        this.setDefaults();

        // hack
        this.runtime.on('PROJECT_LOADED', () => {
            this.runtime.dice = [];
            this.addDiceObject('sound dice', 'sound');
            this.addDiceObject('costume dice', 'costume');
            const newDiceAdded = [];
            const blocksLoaded = [];
            if (this.runtime.targets) {
                for (let i = 0; i < this.runtime.targets.length; i++) {
                    blocksLoaded.push(this.runtime.targets[i].sprite.blocks._blocks);
                }
                for (let i = 0; i < blocksLoaded.length; i++) {
                    for (const keys in blocksLoaded[i]) {
                        if (blocksLoaded[i][keys].opcode === 'chance_menu_diceMenu') {
                            const newDice = blocksLoaded[i][keys].fields.diceMenu.value.toString();
                            if (!newDiceAdded.includes(newDice)) {
                                newDiceAdded.push(newDice);
                            }
                        }
                    }
                }
                for (let i = 0; i < newDiceAdded.length; i++) {
                    if (this.getDiceIndex(newDiceAdded[i]) === -1) {
                        this.addDiceObject(newDiceAdded[i], 'number');
                    }
                }
            }
        });

        this.runtime.on('NAME_DICE', diceNameAndType => {
            const diceName = diceNameAndType[0];
            const diceType = diceNameAndType[1];
            this.addDiceObject(diceName, diceType);
        });

        this.runtime.on('PROJECT_CHANGED', () => {
            this.runtime.requestToolboxExtensionsUpdate();
        });

        /* this.runtime.on('KEY_PRESSED', key => {
            this.runtime.keyPressed = key.split(' ')[0];
        }); */

    }

    /**
     * @return {object} This object's metadata.
     */
    getInfo () {

        // all blocks
        this.blocks = [];
        // For starter blocks
        this.getCurrentTargetValues();

        // setting chances of all sides proportionately
        this.setValue = function (currentDist, side, amount) {
            const sliders = JSON.parse(`[${currentDist}]`);
            let sumOfRest = 0;
            if (sliders[side] + amount < 0) {
                amount = -1.0 * sliders[side];
            }
            for (let i = 0; i < sliders.length; i++) {
                if (i !== side) {
                    sumOfRest += sliders[i];
                }
            }
            for (let i = 0; i < sliders.length; i++) {
                if (i !== side) {
                    if (sumOfRest === 0) {
                        sliders[i] -= (amount / (sliders.length - 1));
                    } else {
                        sliders[i] -= (amount * sliders[i] / sumOfRest);
                    }
                }
            }
            sliders[side] += amount;
            for (let i = 0; i < sliders.length; i++) {
                if (sliders[i] >= 100) {
                    sliders[i] = 100.0;
                } else if (sliders[i] <= 0) {
                    sliders[i] = 0.0;
                }
            }
            return sliders.toString();
        };

        this.addBlocks();
        return {

            id: 'chance', // Machine readable id of this extension.

            name: formatMessage({
                id: 'chance.categoryName',
                default: "Let's Chance",
                description: 'Name of the Chance extension.'
            }),
            blockIconURI: blockIconURI,
            menuIconURI: menuIconURI,
            blocks: this.blocks,
            menus: {
                starterDiceMenu: {
                    items: ['costume number', 'costume name', 'sound number', 'sound name']
                },

                costumeDiceMenu: {
                    items: 'getCostumeDiceMenu'
                },

                soundDiceMenu: {
                    items: 'getSoundDiceMenu'
                },

                diceMenu: {
                    items: 'getDiceMenu',
                    acceptReporters: true
                },

                sideMenu: {
                    items: 'getSideMenu',
                    acceptReporters: true
                },

                chancesMenu: {
                    items: 'getChancesMenu',
                    acceptReporters: true
                },

                diceOptionsMenu: {
                    items: 'getDiceOptionsMenu'
                },

                markovDiceMenu: {
                    items: 'getMarkovDiceMenu',
                    acceptReporters: true
                }
            }
        };
    }

    addBlocks () {
        this.blocks.push({
            opcode: 'startSoundProb',
            blockType: BlockType.COMMAND,
            text: 'roll [DICE] [DISTRIBUTION]',
            arguments: {
                DICE: {
                    type: ArgumentType.STRING,
                    defaultValue: 'sound dice',
                    menu: 'soundDiceMenu'
                },

                DISTRIBUTION: {
                    type: ArgumentType.SLIDER,
                    defaultValue: this.soundSlider
                }
            }
        },

        {
            opcode: 'setCostumeProb',
            blockType: BlockType.COMMAND,
            text: 'roll [DICE] [DISTRIBUTION]',
            arguments: {
                DICE: {
                    type: ArgumentType.STRING,
                    defaultValue: 'costume dice',
                    menu: 'costumeDiceMenu'
                },

                DISTRIBUTION: {
                    type: ArgumentType.SLIDER,
                    defaultValue: this.costumeSlider
                }
            }

        },


        /* {
                    opcode: 'costumeSoundVal',
                    blockType: BlockType.REPORTER,
                    text: 'rolled [STARTERDICE]',
                    arguments: {
                        STARTERDICE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 'sound number',
                            menu: 'starterDiceMenu'
                        }
                    }
    
                },*/
        '---', {

            opcode: 'makeDiceButton',
            blockType: BlockType.BUTTON,
            text: 'Make New Dice',
            func: 'MAKE_A_DICE'


        });

        if (this.runtime.dice.length > 2) {
            this.runtime.sliderString = this.getSliderString();
            this.runtime.markovSliderString = this.getMarkovSliderString();

            this.blocks.push({
                opcode: 'setDistribution',
                blockType: BlockType.COMMAND,
                text: 'set [DICE] to [DISTRIBUTION]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: this.runtime.dice[this.runtime.selectedDice].diceName,
                        menu: 'diceOptionsMenu'
                    },
                    DISTRIBUTION: {
                        type: ArgumentType.SLIDER,
                        defaultValue: this.runtime.sliderString
                    }
                }
            },
            {
                opcode: 'diceVal',
                blockType: BlockType.REPORTER,
                text: 'roll [DICE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: this.runtime.dice[this.runtime.selectedDice].diceName,
                        menu: 'diceMenu'
                    }
                }
            },

            /* {
                            opcode: 'lastDiceVal',
                            blockType: BlockType.REPORTER,
                            text: 'rolled [DICE]',
                            arguments: {
                                DICE: {
                                    type: ArgumentType.STRING,
                                    defaultValue: this.runtime.dice[this.runtime.selectedDice].diceName,
                                    menu: 'diceMenu'
                                }
                            }
                        },*/

            {
                opcode: 'ifDiceBool',
                blockType: BlockType.BOOLEAN,
                text: '[DICE] is [SIDE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: this.runtime.dice[this.runtime.selectedDice].diceName,
                        menu: 'diceMenu'
                    },
                    SIDE: {
                        type: ArgumentType.STRING,
                        defaultValue: this.selectedSide(this.runtime.selectedSideVal['ifDiceBool']),
                        menu: 'sideMenu'
                    }
                }
            },

            '---',

            {
                opcode: 'setChance',
                blockType: BlockType.COMMAND,
                text: 'set chance of [DICE][SIDE] to [CHANCE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: this.runtime.dice[this.runtime.selectedDice].diceName,
                        menu: 'diceMenu'
                    },
                    SIDE: {
                        type: ArgumentType.STRING,
                        defaultValue: this.selectedSide(this.runtime.selectedSideVal['setChance']),
                        menu: 'sideMenu'
                    },
                    CHANCE: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 10
                    }
                }
            },

            {
                opcode: 'changeChance',
                blockType: BlockType.COMMAND,
                text: 'change chance of [DICE][SIDE] by [CHANCE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: this.runtime.dice[this.runtime.selectedDice].diceName,
                        menu: 'diceMenu'
                    },
                    SIDE: {
                        type: ArgumentType.STRING,
                        defaultValue: this.selectedSide(this.runtime.selectedSideVal['changeChance']),
                        menu: 'sideMenu'
                    },
                    CHANCE: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 10
                    }
                }
            },

            {
                opcode: 'chanceOfReporter',
                blockType: BlockType.REPORTER,
                text: 'chance of [DICE][SIDE]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: this.runtime.dice[this.runtime.selectedDice].diceName,
                        menu: 'diceMenu'
                    },
                    SIDE: {
                        type: ArgumentType.STRING,
                        defaultValue: this.selectedSide(this.runtime.selectedSideVal['chanceOfReporter']),
                        menu: 'chancesMenu'
                    }
                }
            },

            {
                opcode: 'diceFromList',
                blockType: BlockType.COMMAND,
                text: 'set [DICE] from list [LISTARRAY]',
                arguments: {
                    DICE: {
                        type: ArgumentType.STRING,
                        defaultValue: this.runtime.dice[this.runtime.selectedDice].diceName,
                        menu: 'diceMenu'
                    },
                    LISTARRAY: {
                        type: ArgumentType.STRING,
                        defaultValue: 'A A A B C'
                    }
                }
            },
            '---',
            {
                opcode: 'showMarkovDice',
                blockType: BlockType.BUTTON,
                text: 'SEQUENCE DICE',
                func: 'SHOW_MARKOV_DICE'
            }
                /* ,
                
                                {
                                    opcode: 'getKeyPressed',
                                    blockType: BlockType.REPORTER,
                                    text: 'key pressed'
                                }*/
            );
            if (this.runtime.showMarkovDice){
                this.blocks.push(
                {
                    opcode: 'createStateDice',
                    blockType: BlockType.REPORTER,
                    text: 'get next roll of [MARKOVDICE]',
                    arguments: {
                        MARKOVDICE: {
                            type: ArgumentType.STRING,
                            defaultValue: this.runtime.dice[this.runtime.selectedDice].diceName,
                            menu: 'diceMenu'
                        }
                    }
                },
                {
                    opcode: 'setMarkovDistribution',
                    blockType: BlockType.COMMAND,
                    text: 'set [DICE] to [DISTRIBUTION]',
                    arguments: {
                        DICE: {
                            type: ArgumentType.STRING,
                            defaultValue: this.runtime.dice[this.runtime.selectedDice].diceName,
                            menu: 'diceOptionsMenu'
                        },
                        DISTRIBUTION: {
                            type: ArgumentType.MARKOV,
                            defaultValue: this.runtime.markovSliderString
                        }
                    }
                })
            }
        }
        /* if(this.runtime.markovDice){
            this.blocks.push(
                // Markov block
                '---',
                {
                    opcode: 'dataBlocks',
                    blockType: BlockType.BUTTON,
                    text: 'Markov Block'
                },

                {
                    opcode: 'createStateDice',
                    blockType: BlockType.REPORTER,
                    text: 'get next roll of [MARKOVDICE]',
                    arguments: {
                        MARKOVDICE: {
                            type: ArgumentType.STRING,
                            defaultValue: this.runtime.markovDice,
                            menu: 'markovDiceMenu'
                        }
                    }
                });
        }*/
    }

    setDefaults () {
        this.runtime.renamedice = 0;

        this.runtime.selectedSideVal = {};
        this.runtime.selectedSideVal['ifDiceBool'] = 0;
        this.runtime.selectedSideVal['setChance'] = 0;
        this.runtime.selectedSideVal['changeChance'] = 0;
        this.runtime.selectedSideVal['chanceOfReporter'] = 0;
        
        // markov
        this.runtime.showMarkovDice = false;

        // modal
        this.runtime.modalDice = null;
    }

    getCurrentTargetValues () {
        // starter blocks
        this.costumeSides = [];
        this.costumeChances = [];
        this.costumeData = [];
        const costumes = this.runtime.getEditingTarget().getCostumes();
        for (let i = 0; i < costumes.length; i++) {
            this.costumeSides.push(costumes[i].name);
            this.costumeChances.push(100.0 / costumes.length);
            this.costumeData.push(btoa(String.fromCharCode(...new Uint8Array(costumes[i].asset.data))))
        }
        this.costumeSlider = `${this.costumeChances.toString()}|${this.costumeSides.join('~')}|costume|${this.costumeData.join('~')}`;

        this.soundSides = [];
        this.soundChances = [];
        this.soundData = [];
        const sounds = this.runtime.getEditingTarget().getSounds();
        for (let i = 0; i < sounds.length; i++) {
            this.soundSides.push(sounds[i].name);
            this.soundChances.push(100.0 / sounds.length);
            this.soundData.push(btoa(String.fromCharCode(...new Uint8Array(sounds[i].asset.data))))
        }
        this.soundSlider = `${this.soundChances.toString()}|${this.soundSides.join('~')}|sound|${this.soundData.join('~')}`;

        // check for any dice updates
        if (this.runtime.dice.length > 2) {
            for (let i = 2; i < this.runtime.dice.length; i++) {
                if (this.runtime.dice[i].diceType === 'costume') {
                    this.runtime.dice[i].strings = this.costumeSides;
                    //this.runtime.dice[i].distribution = this.costumeChances.toString();
                }
                if (this.runtime.dice[i].diceType === 'sound') {
                    this.runtime.dice[i].strings = this.soundSides;
                    //this.runtime.dice[i].distribution = this.soundChances.toString();
                }
            }
        }

    }

    // Function to add dice with a given name
    addDiceObject (name, type) {
        this.runtime.dice.push({
            diceName: name,
            diceType: type,
            value: '',
            strings: [],
            distribution: '',
            markovDistribution: {}
        });
        const lastDice = this.runtime.dice.length - 1;
        const chances = [];
        if (type === 'text') {
            this.runtime.dice[lastDice].strings = ['gobo', 'nano', 'pico', 'tera', 'giga'];
            this.runtime.dice[lastDice].value = 'gobo';
        } else if (type === 'costume') {
            this.getCurrentTargetValues();
            this.runtime.dice[lastDice].strings = this.costumeSides;
            this.runtime.dice[lastDice].value = this.costumeSides[0];
        } else if (type === 'sound') {
            this.getCurrentTargetValues();
            this.runtime.dice[lastDice].strings = this.soundSides;
            this.runtime.dice[lastDice].value = this.soundSides[0];
        } else if (type === 'range') {
            this.runtime.dice[lastDice].strings = ['0to20', '21to40', '41to60', '61to80', '81to100'];
            this.runtime.dice[lastDice].value = '0';
        } else {
            this.runtime.dice[lastDice].strings = ['1', '2', '3', '4', '5', '6'];
            this.runtime.dice[lastDice].value = '1';
        }
        const numberOfSides = this.runtime.dice[lastDice].strings.length;
        for (let i = 0; i < numberOfSides; i++) {
            chances.push(100.0 / numberOfSides);
        }
        this.runtime.dice[lastDice].distribution = chances.toString();
        this.runtime.dice[lastDice].markovDistribution['~'] = chances.toString();
        for (let k = 0; k < numberOfSides; k++) {
            this.runtime.dice[lastDice].markovDistribution[this.runtime.dice[lastDice].strings[k]] = chances.toString();
        }
        this.runtime.selectedDice = this.getDiceIndex(this.runtime.dice[lastDice].diceName);
        this.runtime.diceToChange = this.runtime.dice[lastDice].diceName;
        //this.runtime.markovDice = this.runtime.diceToChange;
        this.runtime.requestToolboxExtensionsUpdate();
    }

    selectedSide (side) {
        const currentDiceIndex = this.runtime.selectedDice;
        if (side === 'all sides') {
            return 'all sides';
        }
        return this.runtime.dice[currentDiceIndex].strings[side];
    }

    // Set starter costume dice (hack)
    getCostumeDiceMenu () {
        const diceItems = [];
        diceItems.push('costume dice');
        return diceItems;
    }

    // Set starter sound dice (hack)
    getSoundDiceMenu () {
        const diceItems = [];
        diceItems.push('sound dice');
        return diceItems;
    }

    // Set dice menu dynamically
    getDiceMenu () {
        const diceItems = [];
        for (let i = this.runtime.dice.length - 1; i > 1; i--) {
            diceItems.push(this.runtime.dice[i].diceName);
        }
        return diceItems;
    }

    // Set dice block menu with rename/delete option
    getDiceOptionsMenu () {
        const diceOptionItems = [];
        for (let i = this.runtime.dice.length - 1; i > 1; i--) {
            diceOptionItems.push(this.runtime.dice[i].diceName);
        }
        this.runtime.diceToChange = this.runtime.dice[this.runtime.selectedDice].diceName;
        diceOptionItems.push(`Delete "${this.runtime.diceToChange}"`);
        return diceOptionItems;
    }

    getChancesMenu () {
        const chancesMenuItems = [];
        const sides = this.runtime.dice[this.runtime.selectedDice].strings;
        for (const element of sides) {
            chancesMenuItems.push(element);
        }
        chancesMenuItems.push('all sides');
        return chancesMenuItems;
    }

    // Set side menu based dynamically
    getSideMenu () {
        const currentDiceIndex = this.runtime.selectedDice;
        return this.runtime.dice[currentDiceIndex].strings;
    }

    // Set state menu based on markov dice
    getMarkovDiceMenu () {
        const markovDice = [];
        markovDice.push(this.runtime.markovDice);
        return markovDice;
    }

    // Get dice index
    getDiceIndex (diceName) {
        const index = this.runtime.dice.findIndex(item => item.diceName === diceName);
        return index;
    }

    // Get side index
    getSideIndex (diceIndex, sideName) {
        const index = this.runtime.dice[diceIndex].strings.findIndex(item => item === sideName);
        return index;
    }

    getSliderString() {
        const dice = this.runtime.dice[this.runtime.selectedDice];
        switch (dice.diceType) {
            case 'costume':
                return `${dice.distribution}|${dice.strings.join('~')}|${dice.diceType}|${this.costumeData.join('~')}`;
            case 'sound':
                return `${dice.distribution}|${dice.strings.join('~')}|${dice.diceType}|${this.soundData.join('~')}`;
            default:
                return `${dice.distribution}|${dice.strings.join('~')}|${dice.diceType}`;
        }
    }

    getMarkovSliderString () {
        const i = this.runtime.selectedDice;
        const distributions = Object.values(this.runtime.dice[i].markovDistribution);
        const views = Object.keys(this.runtime.dice[i].markovDistribution);
        const statesString = this.runtime.dice[i].strings.join('~');
        const markovSliderArray = [];
        for (let k = 0; k < views.length; k++) {
            markovSliderArray.push([distributions[k], statesString, views[k]].join('|'));
        }
        return markovSliderArray.join('||');
    }

    /* Block Definitions */


    // Current dice roll reporter
    diceVal (args) {
        const i = this.getDiceIndex(args.DICE.toString());
        let rolledValue;
        if (i > -1) {
            rolledValue = this.pickRoll(i, false);
            this.runtime.selectedDice = i;
            this.runtime.requestToolboxExtensionsUpdate();
            return rolledValue;
        }
    }

    pickRoll (i, markov) {
        let distribution = null;
        if (markov) {
            distribution = this.runtime.dice[i].markovDistribution[this.runtime.dice[i].value];
        } else {
            distribution = this.runtime.dice[i].distribution;
        }

        const strings = this.runtime.dice[i].strings;
        const sliders = JSON.parse(`[${distribution}]`);
        const sliderSums = [sliders[0]];
        for (let k = 1; k < sliders.length; k++) {
            sliderSums.push(sliderSums[sliderSums.length - 1] + sliders[k]);
        }
        let newValue;
        const randomNumber = random.real(0, 100);
        for (let k = 0; k < sliders.length; k++) {
            if (randomNumber <= sliderSums[k]) {
                newValue = strings[k];
                break;
            }
        }
        this.runtime.dice[i].value = newValue;
        const regex = /(-|)\d{1,}to(-|)\d{1,}/g // check if of format 0to20 etc.
        if (newValue.match(regex)) {
            const n1 = parseInt(newValue.split('to')[0], 10);
            const n2 = parseInt(newValue.split('to')[1], 10);
            const low = n1 <= n2 ? n1 : n2;
            const high = n1 <= n2 ? n2 : n1;
            if (low === high) return low;
            return low + Math.floor(Math.random() * ((high + 1) - low));
        }
        return this.runtime.dice[i].value;
    }

    // correct for range type if implementing later
    /* lastDiceVal(args) {
        const i = this.getDiceIndex(args.DICE.toString());
        if (i > -1) {
            return this.runtime.dice[i].value;
        }
    }*/

    // To set the distribution of dice
    setDistribution (args) {
        const diceName = args.DICE.toString();
        const deleteDice = `Delete "${this.runtime.diceToChange}"`;
        const i = this.getDiceIndex(diceName);
        if (diceName === deleteDice) {
            this.runtime.dice.splice(this.getDiceIndex(this.runtime.diceToChange), 1);
            this.runtime.selectedDice = 2;
            this.runtime.requestToolboxExtensionsUpdate();
        } else if (i > -1) {
            const splitted = args.DISTRIBUTION.split('|');
            if (this.runtime.dice[i].strings.join('~') !== splitted[1]) {
                this.resetMarkovDistribution(args);
            }
            const distribution = splitted[0];
            this.runtime.dice[i].strings = splitted[1].split('~');
            this.runtime.dice[i].distribution = distribution;
            this.runtime.dice[i].markovDistribution['~'] = distribution;
            this.runtime.selectedDice = i;
            this.runtime.requestToolboxExtensionsUpdate();
        }
    }

    resetMarkovDistribution (args) {
        const i = this.getDiceIndex(args.DICE.toString());
        const splitted = args.DISTRIBUTION.split('|');
        const strings = splitted[1].split('~');
        const value = 100 / strings.length;
        let distribution = [];
        for (let k = 0; k < strings.length; k++) {
            distribution.push(value);
        }
        distribution = distribution.join();
        const newDist = {};
        newDist['~'] = splitted[0];
        for (let k = 0; k < strings.length; k++) {
            newDist[strings[k]] = distribution;
        }
        this.runtime.dice[i].markovDistribution = newDist;
    }

    setMarkovDistribution (args) {
        const diceName = args.DICE.toString();
        const deleteDice = `Delete "${this.runtime.diceToChange}"`;
        const i = this.getDiceIndex(diceName);
        if (diceName === deleteDice) {
            this.runtime.dice.splice(this.getDiceIndex(this.runtime.diceToChange), 1);
            this.runtime.selectedDice = 2;
            this.runtime.requestToolboxExtensionsUpdate();
        } else if (i > -1) {
            const marokvStrings = args.DISTRIBUTION.split('||');
            for (let k = 0; k < marokvStrings.length; k++) {
                const splitted = marokvStrings[k].split('|');
                this.runtime.dice[i].markovDistribution[splitted[2]] = splitted[0];
            }
            this.runtime.selectedDice = i;
            this.runtime.dice[i].distribution = this.runtime.dice[i].markovDistribution['~'];
            this.runtime.requestToolboxExtensionsUpdate();
        }
    }

    // Check if current dice roll value is a particular side
    ifDiceBool (args) {
        const i = this.getDiceIndex(args.DICE);
        const side = args.SIDE.toString();
        if (i > -1) {
            this.runtime.selectedDice = i;
            const sideIndex = this.getSideIndex(i, side);
            if (sideIndex > -1) {
                this.runtime.selectedSideVal['ifDiceBool'] = sideIndex;
            }
            this.runtime.requestToolboxExtensionsUpdate();
            return (this.runtime.dice[i].value === side);
        }
        return (args.DICE === side);


    }

    // Set chance of an event
    // update other event chances in the dice accordingly
    setChance (args) {
        const i = this.getDiceIndex(args.DICE.toString());
        const side = this.getSideIndex(i, args.SIDE.toString());
        if (i > -1 && side > -1) {
            const newChance = Cast.toNumber(args.CHANCE);
            const currentDist = this.runtime.dice[i].distribution;
            const sliders = JSON.parse(`[${currentDist}]`);
            let amount;
            if (newChance < 0) {
                amount = -1.0 * sliders[side];
            } else if (newChance > 100) {
                amount = 100.0;
            } else {
                amount = newChance - sliders[side];
            }
            const final = this.setValue(currentDist, side, amount);
            this.runtime.dice[i].distribution = final;
            this.runtime.selectedSideVal['setChance'] = side;
            this.runtime.selectedDice = i;
            this.runtime.requestToolboxExtensionsUpdate();
        }
    }

    // Chance chance of an event
    // update other event chances in the dice accordingly
    changeChance (args) {
        const i = this.getDiceIndex(args.DICE.toString());
        const side = this.getSideIndex(i, args.SIDE.toString());
        if (i > -1 && side > -1) {
            const amount = Cast.toNumber(args.CHANCE);
            const currentDist = this.runtime.dice[i].distribution;
            const sliders = JSON.parse(`[${currentDist}]`);
            const final = this.setValue(currentDist, side, amount);
            this.runtime.dice[i].distribution = final;
            this.runtime.selectedSideVal['changeChance'] = side;
            this.runtime.selectedDice = i;
            this.runtime.requestToolboxExtensionsUpdate();
        }
    }

    // Return current chance of a side in a dice
    chanceOfReporter (args) {
        const i = this.getDiceIndex(args.DICE.toString());
        const sideString = args.SIDE.toString();
        const side = this.getSideIndex(i, sideString);
        if (i > -1) {
            if ((side > -1 || sideString === 'all sides')) {
                const sliders = JSON.parse(`[${this.runtime.dice[i].distribution}]`);
                this.runtime.selectedDice = i;
                if (side > -1) {
                    this.runtime.selectedSideVal['chanceOfReporter'] = side;
                    return Math.round(sliders[side]);
                }
                const allChances = [];
                for (const element of sliders) {
                    this.runtime.selectedSideVal['chanceOfReporter'] = 'all sides';
                    allChances.push(Math.round(element));
                }
                return allChances.toString();

                this.runtime.requestToolboxExtensionsUpdate();
            }
        }
    }

    diceFromList (args) {
        const i = this.getDiceIndex(args.DICE.toString());
        if (i > -1) {
            if (args.LISTARRAY === '') {
                alert('No input provided.');
            } else {
                const listVal = args.LISTARRAY.toString();
                let markovSequence = '';
                if (listVal.includes(' ')) {
                    markovSequence = listVal.split(' ');
                } else {
                    markovSequence = listVal.split('').join(' ').split(' ');
                }

                this.runtime.dice[i].strings = markovSequence.filter((item, i, ar) => ar.indexOf(item) === i);

                const stateFreqDist = {};
                for (let i = 0; i < markovSequence.length; i++) {
                    const state = markovSequence[i];
                    stateFreqDist[state] = stateFreqDist[state] ? stateFreqDist[state] + 1 : 1;
                }

                const frequency = Object.values(stateFreqDist);
                const sum = frequency.reduce((acc, item) => acc + item, 0);
                this.runtime.dice[i].distribution = frequency.map(item => ((item / sum) * 100)).join();
                this.runtime.dice[i].strings = Object.keys(stateFreqDist);
                this.runtime.markovDistribution = this.runtime.dice[i].distribution;
                //this.runtime.markovStrings = '';
                this.runtime.originalDistribution = this.runtime.dice[i].distribution;
                const originalStrings = this.runtime.dice[i].strings;
                // this.runtime.markovDice = args.DICE.toString();
                // this.runtime.selectedState = this.pickRoll(i, false);
                this.runtime.selectedDice = i;

                const markovDistribution = {};
                for (let k = 0; k < this.runtime.dice[i].strings.length; k++) {
                    const state = this.runtime.dice[i].strings[k];
                    if (this.runtime.dice[i].strings.includes(state)) {
                        let newDist = {};
                        const arr = markovSequence;
                        const markovChain = {};
                        for (let x = 0; x < arr.length; x++) {
                            const word = arr[x];
                            if (!markovChain[word]) {
                                markovChain[word] = [];
                            }
                            if (arr[x + 1]) {
                                markovChain[word].push(arr[x + 1]);
                            }
                        }
                        newDist = makeDice(markovChain[state]);

                        function makeDice (markovArr) {
                            for (let i = 0; i < markovArr.length; i++) {
                                const num = markovArr[i];
                                newDist[num] = newDist[num] ? newDist[num] + 1 : 1;
                            }
                            return newDist;
                        }
                        if (Object.keys(newDist).length > 1) {
                            const frequency = Object.values(newDist);
                            const sum = frequency.reduce((acc, item) => acc + item, 0);
                            const d = frequency.map(item => ((item / sum) * 100));
                            const s = Object.keys(newDist);
                            const x = [];
                            const y = [];
                            for (let a = 0; a < originalStrings.length; a++) {
                                if (s.indexOf(originalStrings[a]) > -1) {
                                    x.push(d[s.indexOf(originalStrings[a])]);
                                    y.push(s[s.indexOf(originalStrings[a])]);
                                } else {
                                    x.push(0);
                                    y.push(originalStrings[a]);
                                }
                            }
                            this.runtime.markovDistribution = x.join();

                        }
                        // if only one side
                        else if (Object.keys(newDist).length === 1) {
                            this.runtime.markovDistribution = this.runtime.originalDistribution;
                            const currentDist = this.runtime.markovDistribution;
                            const side = this.getSideIndex(i, Object.keys(newDist).toString());
                            const sliders = currentDist.split(',');
                            const amount = 80.0 - sliders[side];
                            this.runtime.markovDistribution = this.setValue(currentDist, side, amount);
                        }
                        // if no side
                        else {
                            this.runtime.markovDistribution = this.runtime.originalDistribution;
                        }
                        this.runtime.selectedDice = i;
                        markovDistribution[state] = this.runtime.markovDistribution;
                    }
                }
                markovDistribution['~'] = this.runtime.originalDistribution;
                this.runtime.dice[this.runtime.selectedDice].markovDistribution = markovDistribution;
                this.runtime.dice[this.runtime.selectedDice].value = originalStrings[0];
                this.runtime.dice[i].distribution = this.runtime.markovDistribution;
                this.runtime.dice[i].strings = originalStrings;

                this.runtime.requestToolboxExtensionsUpdate();
            }
        }
    }


    // markov learning

    createStateDice (args) {
        const i = this.getDiceIndex(args.MARKOVDICE.toString());
        if (i > -1) {
            const state = this.runtime.dice[i].value;
            if (this.runtime.dice[i].strings.includes(state)) {
                this.runtime.selectedDice = i;
                this.runtime.markovDistribution = this.runtime.dice[i].markovDistribution[state]
                const rolledState = this.pickRoll(i, true);
                this.runtime.dice[i].value = rolledState;
                this.runtime.requestToolboxExtensionsUpdate();
                return state;
            }
        }
    }


    // starter blocks

    // costume

    getChance (distribution, strings) {
        const sliders = JSON.parse(`[${distribution[0]}]`);
        let newValue;
        const sliderSums = [sliders[0]];
        for (let i = 1; i < sliders.length; i++) {
            sliderSums.push(sliderSums[sliderSums.length - 1] + sliders[i]);
        }
        const randomNumber = random.real(0, 100);
        for (let i = 0; i < sliders.length; i++) {
            if (randomNumber <= sliderSums[i]) {
                newValue = strings[i];
                break;
            }
        }
        return newValue;
    }

    setCostumeProb (args, util) {
        const distribution = args.DISTRIBUTION.split('|');
        const strings = distribution[1].split('~');
        const newValue = this.getChance(distribution, strings);
        this.costumeName = newValue;
        this._setCostume(util.target, newValue);
    }

    _setCostume (target, requestedCostume, optZeroIndex) {
        if (typeof requestedCostume === 'number') {
            // Numbers should be treated as costume indices, always
            target.setCostume(optZeroIndex ? requestedCostume : requestedCostume - 1);
        } else {
            // Strings should be treated as costume names, where possible
            const costumeIndex = target.getCostumeIndexByName(requestedCostume.toString());

            if (costumeIndex !== -1) {
                target.setCostume(costumeIndex);
            } else if (!(isNaN(requestedCostume) || Cast.isWhiteSpace(requestedCostume))) {
                target.setCostume(optZeroIndex ? Number(requestedCostume) : Number(requestedCostume) - 1);
            }
        }
        return [];
    }

    // sound

    startSoundProb (args, util) {
        const distribution = args.DISTRIBUTION.split('|');
        const strings = distribution[1].split('~');
        const newValue = this.getChance(distribution, strings);
        this.soundName = newValue;
        this._playSound(args, util, newValue);
    }

    _playSound (args, util, newValue) {
        const {target} = util;
        const {sprite} = target;
        const index = this.getSoundIndexByName(newValue.toString(), util);
        if (index > -1 && index < sprite.sounds.length) {
            const {soundId} = sprite.sounds[index];
            return sprite.soundBank.playSound(target, soundId);
        }
    }

    getSoundIndexByName (soundName, util) {
        const sounds = util.target.sprite.sounds;
        for (let i = 0; i < sounds.length; i++) {
            if (sounds[i].name === soundName) {
                this.soundNumber = i + 1;
                return i;
            }
        }
        // if there is no sound by that name, return -1
        return -1;
    }

    /* costumeSoundVal(args, util) {
        switch (args.STARTERDICE) {
            case 'sound number':
                return this.soundNumber
                break;
            case 'sound name':
                return this.soundName;
                break;
            case 'costume number':
                return (util.target.currentCostume + 1);
                break;
            case 'costume name':
                return this.costumeName;
                break;
        }
    }*/

    /* // key pressed
    getKeyPressed() {
        return this.runtime.keyPressed;
    }*/

}

module.exports = Scratch3ChanceBlocks;
