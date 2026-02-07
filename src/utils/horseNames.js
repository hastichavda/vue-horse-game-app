const HORSE_NAMES = [
  'Ada Lovelace',
  'Grace Hopper',
  'Margaret Hamilton',
  'Joan Clarke',
  'Katherine Johnson',
  'Dorothy Vaughan',
  'Mary Jackson',
  'Annie Easley',
  'Frances Allen',
  'Barbara Liskov',
  'Radia Perlman',
  'Shafi Goldwasser',
  'Cynthia Dwork',
  'Jeannette Wing',
  'Fei-Fei Li',
  'Yann LeCun',
  'Geoffrey Hinton',
  'Andrew Ng',
  'Demis Hassabis',
  'Elon Musk',
]

export function getHorseName(index) {
  return HORSE_NAMES[index % HORSE_NAMES.length]
}

