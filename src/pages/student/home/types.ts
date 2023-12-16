type LessonDays = '一' | '二' | '三' | '四' | '五' | '六' | '日'

type LessonItemKey =
  | 'firstLesson'
  | 'secondLesson'
  | 'thirdLesson'
  | 'fourthLesson'
  | 'fifthLesson'

interface LessonsItemValue {
  name: string
  position: string
}

type DayLessonsItem = {
  day: LessonDays
} & {
  [key in LessonItemKey]?: LessonsItemValue
}

type AllLessons = DayLessonsItem[]
