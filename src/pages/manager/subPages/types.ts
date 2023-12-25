interface RoommateItem {
  name: string
  studentId: string
}

interface DormitoryDetailType {
  id: string
  surplus: string
  roommateList: RoommateItem[]
}
