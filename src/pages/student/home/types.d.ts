type LessonDays = '一' | '二' | '三' | '四' | '五' | '六' | '日'

type LessonItemKey =
  | 'firstLessons'
  | 'secondLessons'
  | 'thirdLessons'
  | 'fourthLessons'
  | 'fifthLessons'
  | 'sixthLessons'
  | 'seventhLessons'

interface LessonsItemValue {
  name: string
  position: string
}

interface DayLessonsItem {
  day: LessonDays
  [key in LessonItemKey]?: LessonsItemValue
}

type AllLessons = DayLessonsItem[]
